// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//@author Kuramen
//@title Shinobi NFT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC721A.sol";

contract ShinobiERC721A is Ownable, ERC721A, ReentrancyGuard, PaymentSplitter {

    using Strings for uint;

    string public baseURI;

    uint private constant MAX_SUPPLY = 1000;
    uint private constant MAX_WHITELIST = 270;
    uint private constant MAX_PUBLIC = 700;
    uint private constant MAX_GIFT = 30;

    uint public privateSalePrice = 0.0025 ether;
    uint public publicSalePrice = 0.003 ether;

    bytes32 public merkleRoot;

    uint public privateSaleStartTime = 1650643200;
    uint public publicSaleStartTime = 1650902400;
    

    mapping(address => uint) public amountNFTsperWalletWhitelistSale;

    uint private teamLength;

    constructor(address[] memory _team, uint[] memory _teamShares, bytes32 _merkleRoot, string memory _baseURI) ERC721A("Shinobi", "SHINO")
    PaymentSplitter(_team, _teamShares) {
        merkleRoot = _merkleRoot;
        baseURI = _baseURI;
        teamLength = _team.length;
    }

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    function whitelistMint(address _account, uint _quantity, bytes32[] calldata _proof) external payable callerIsUser {
        uint price = privateSalePrice;
        require(price != 0, "Price is 0");
        require(currentTime() >= privateSaleStartTime, "Private Sale has not started yet");
        require(currentTime() < publicSaleStartTime, "Whitelist Sale is finished");
        require(isWhiteListed(msg.sender, _proof), "Not whitelisted");
        require(amountNFTsperWalletWhitelistSale[msg.sender] + _quantity <= 2, "Only 2 NFT on private Sale");
        require(totalSupply() + _quantity <= MAX_WHITELIST, "Max supply exceeded");
        require(msg.value >= price * _quantity, "Not enought funds");
        amountNFTsperWalletWhitelistSale[msg.sender] += _quantity;
        _safeMint(_account, _quantity);
    }

    function publicSaleMint(address _account, uint _quantity) external payable callerIsUser {
        uint price = publicSalePrice;
        require(price != 0, "Price is 0");
        require(currentTime() >= publicSaleStartTime, "Public sale has not started yet");
        require(totalSupply() + _quantity <= MAX_WHITELIST + MAX_PUBLIC, "Max supply exceeded");
        require(msg.value >= price * _quantity, "Not enought funds");
        _safeMint(_account, _quantity);
    }

    function gift(address _to, uint _quantity) external onlyOwner {
        require(totalSupply() + _quantity <= MAX_SUPPLY, "Reached max Supply");
        _safeMint(_to, _quantity);
    }

    function setPrivateSaleStartTime(uint _privateSaleStartTime) external onlyOwner {
        privateSaleStartTime = _privateSaleStartTime;
    }

    function setPublicSaleStartTime(uint _publicSaleStartTime) external onlyOwner {
        publicSaleStartTime = _publicSaleStartTime;
    }

    function setBaseUri(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function currentTime() internal view returns(uint) {
        return block.timestamp;
    }

    function tokenURI(uint _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");

        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    //Whitelist
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function isWhiteListed(address _account, bytes32[] calldata _proof) internal view returns(bool) {
        return _verify(leaf(_account), _proof);
    }

    function leaf(address _account) internal pure returns(bytes32) {
        return keccak256(abi.encodePacked(_account));
    }

    function _verify(bytes32 _leaf, bytes32[] memory _proof) internal view returns(bool) {
        return MerkleProof.verify(_proof, merkleRoot, _leaf);
    }

    //ReleaseALL
    function releaseAll() external {
        for(uint i = 0 ; i < teamLength ; i++) {
            release(payable(payee(i)));
        }
    }

    receive() override external payable {
        revert("Only if you mint");
    }
}