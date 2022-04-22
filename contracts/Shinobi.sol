// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ShinobiERC721 is ERC721Enumerable, PaymentSplitter, Ownable, ReentrancyGuard {

    //To increment the id of the NFTs
    using Counters for Counters.Counter;

    //To concatenate the URL of an NFT
    using Strings for uint256;

    //To check the addresses in the whitelist
    bytes32 public merkleRoot;

    //Id of the next NFT to mint
    Counters.Counter private _nftIdCounter;

    //Number of NFTs in the collection
    uint public constant MAX_SUPPLY = 1000;
    //Maximum number of NFTs an address can mint
    uint public max_mint_allowed = 2;
    //Price of one NFT in private Sale
    uint public privateSalePrice = 325 ether;
    //Price of one NFT in sale
    uint public publicSalePrice = 425 ether;

    //URI of the NFTs when revealed
    string public baseURI;
    //URI of the NFTs when not revealed
    string public notRevealedURI;
    //The extension of the file containing the Metadatas of the NFTs
    string public baseExtension = ".json";

    //Are the NFTs revealed yet ?
    bool public revealed = false;

    //Is the contract paused ?
    bool public paused = false;

    //The different stages of selling the collection
    enum Steps {
        Before,
        PrivateSale,
        PublicSale,
        SoldOut,
        Reveal
    }

    Steps public sellingStep;
    
    //Owner of the smart contract
    address private _owner;

    //Keep a track of the number of tokens per address
    mapping(address => uint) nftsPerWallet;

    //Addresses of all the members of the team
    address[] private _team = [
        0x0e055E8db176E8d878982f7ee5fBb33D13F791E3,
        0x9317C997Cf9C949e9B8A5194Da9F2F73f067658c,
        0x58c5bF4883a128fDDa83e4B052f110c416D96415,
        0x401c0335d7302f3403f5A4711056E5224A250e66
    ];

    //Shares of all the members of the team
    uint[] private _teamShares = [
        10,
        30, 
        30,
        30
    ];

    //Constructor of the collection
    constructor(string memory _theBaseURI, string memory _notRevealedURI, bytes32 _merkleRoot) ERC721("Shinobi", "SHINO") PaymentSplitter(_team, _teamShares) {
        _nftIdCounter.increment();
        transferOwnership(msg.sender);
        sellingStep = Steps.Before;
        baseURI = _theBaseURI;
        notRevealedURI = _notRevealedURI;
        merkleRoot = _merkleRoot;
    }

    /**
    * @notice Edit the Merkle Root 
    *
    * @param _newMerkleRoot The new Merkle Root
    **/
    function changeMerkleRoot(bytes32 _newMerkleRoot) external onlyOwner {
        merkleRoot = _newMerkleRoot;
    }

    /** 
    * @notice Set pause to true or false
    *
    * @param _paused True or false if you want the contract to be paused or not
    **/
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    /** 
    * @notice Change the number of NFTs that an address can mint
    *
    * @param _maxMintAllowed The number of NFTs that an address can mint
    **/
    function changeMaxMintAllowed(uint _maxMintAllowed) external onlyOwner {
        max_mint_allowed = _maxMintAllowed;
    }

    /**
    * @notice Change the price of one NFT for the private sale
    *
    * @param _privateSalePrice The new price of one NFT for the private sale
    **/
    function setPrivateSalePrice(uint _privateSalePrice) external onlyOwner {
        privateSalePrice = _privateSalePrice;
    }

    /**
    * @notice Change the price of one NFT for the sale
    *
    * @param _publicSalePrice The new price of one NFT for the sale
    **/
    function setPublicSalePrice(uint _publicSalePrice) external onlyOwner {
        publicSalePrice = _publicSalePrice;
    }

    /**
    * @notice Change the base URI
    *
    * @param _newBaseURI The new base URI
    **/
    function setBaseUri(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    /**
    * @notice Change the not revealed URI
    *
    * @param _notRevealedURI The new not revealed URI
    **/
    function setNotRevealURI(string memory _notRevealedURI) external onlyOwner {
        notRevealedURI = _notRevealedURI;
    }

    /**
    * @notice Allows to set the revealed variable to true
    **/
    function reveal() external onlyOwner{
        revealed = true;
    }

    /**
    * @notice Return URI of the NFTs when revealed
    *
    * @return The URI of the NFTs when revealed
    **/
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /**
    * @notice Allows to change the base extension of the metadatas files
    *
    * @param _baseExtension the new extension of the metadatas files
    **/
    function setBaseExtension(string memory _baseExtension) external onlyOwner {
        baseExtension = _baseExtension;
    }

    /** 
    * @notice Allows to change the sellinStep to PrivateSale
    **/
    function setUpPrivateSale() external onlyOwner {
        sellingStep = Steps.PrivateSale;
    }

    /** 
    * @notice Allows to change the sellinStep to Sale
    **/
    function setUpPublicSale() external onlyOwner {
        require(sellingStep == Steps.PrivateSale, "First the private sale, then the sale.");
        sellingStep = Steps.PublicSale;
    }

    /**
    * @notice Allows to mint one NFT if whitelisted
    *
    * @param _account The account of the user minting the NFT
    * @param _proof The Merkle Proof
    **/
    function privateSaleMint(address _account, uint256 _ammount, bytes32[] calldata _proof) external payable nonReentrant {
        //Are we in PrivateSale ?
        require(sellingStep == Steps.PrivateSale, "Private sale has not started yet.");
        //Did this account already mint an NFT ?
        require(nftsPerWallet[_account] < max_mint_allowed, "You can only get 2 NFTs on the private sale");
        //Is this user on the whitelist ?
        require(isWhiteListed(_account, _proof), "Not on the whitelist");
        //The user can only mint max 2 NFTs
        require(_ammount <= max_mint_allowed, "You can't mint more than 2 tokens");
        //Get the price of one NFT during the Private sale
        uint price = privateSalePrice;
        //Did the user send enought Ethers ?
        require(msg.value >= price, "Not enought funds.");
        //Increment the number of NFTs this user minted
        nftsPerWallet[_account]++;
        //Mint the user NFT
        _safeMint(_account, _nftIdCounter.current());
        //Increment the Id of the next NFT to mint
        _nftIdCounter.increment();
    }

    /**
    * @notice Allows to mint NFTs
    *
    * @param _ammount The ammount of NFTs the user wants to mint
    **/
    function publicSaleMint(uint256 _ammount) external payable nonReentrant {
        //Get the number of NFT sold
        uint numberNftSold = totalSupply();
        //Get the price of one NFT in Sale
        uint price = publicSalePrice;
        //If everything has been bought
        require(sellingStep != Steps.SoldOut, "Sorry, no NFTs left.");
        //If Sale didn't start yet
        require(sellingStep == Steps.PublicSale, "Sorry, public sale has not started yet.");
        //Did the user then enought Ethers to buy ammount NFTs ?
        require(msg.value >= price * _ammount, "Not enought funds.");
        //If the user try to mint any non-existent token
        require(numberNftSold + _ammount <= MAX_SUPPLY, "Sale is almost done and we don't have enought NFTs left.");
        //Add the ammount of NFTs minted by the user to the total he minted
        nftsPerWallet[msg.sender] += _ammount;
        //If this account minted the last NFTs available
        if(numberNftSold + _ammount == MAX_SUPPLY) {
            sellingStep = Steps.SoldOut;   
        }
        //Minting all the account NFTs
        for(uint i = 1 ; i <= _ammount ; i++) {
            _safeMint(msg.sender, numberNftSold + i);
        }
    }

    /**
    * @notice Allows to gift one NFT to an address
    *
    * @param _account The account of the happy new owner of one NFT
    **/
    function gift(address _account) external onlyOwner {
        uint supply = totalSupply();
        require(supply + 1 <= MAX_SUPPLY, "Sold out");
        _safeMint(_account, supply + 1);
    }

    /**
    * @notice Return true or false if the account is whitelisted or not
    *
    * @param account The account of the user
    * @param proof The Merkle Proof
    *
    * @return true or false if the account is whitelisted or not
    **/
    function isWhiteListed(address account, bytes32[] calldata proof) internal view returns(bool) {
        return _verify(_leaf(account), proof);
    }

    /**
    * @notice Return the account hashed
    *
    * @param account The account to hash
    *
    * @return The account hashed
    **/
    function _leaf(address account) internal pure returns(bytes32) {
        return keccak256(abi.encodePacked(account));
    }

    /** 
    * @notice Returns true if a leaf can be proved to be a part of a Merkle tree defined by root
    *
    * @param leaf The leaf
    * @param proof The Merkle Proof
    *
    * @return True if a leaf can be provded to be a part of a Merkle tree defined by root
    **/
    function _verify(bytes32 leaf, bytes32[] memory proof) internal view returns(bool) {
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }

    /**
    * @notice Allows to get the complete URI of a specific NFT by his ID
    *
    * @param _nftId The id of the NFT
    *
    * @return The token URI of the NFT which has _nftId Id
    **/
    function tokenURI(uint _nftId) public view override(ERC721) returns (string memory) {
        require(_exists(_nftId), "This NFT doesn't exist.");
        if(revealed == false) {
            return notRevealedURI;
        }
        
        string memory currentBaseURI = _baseURI();
        return 
            bytes(currentBaseURI).length > 0 
            ? string(abi.encodePacked(currentBaseURI, _nftId.toString(), baseExtension))
            : "";
    }
}