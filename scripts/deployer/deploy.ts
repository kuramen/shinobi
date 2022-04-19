// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
Error.stackTraceLimit = Infinity;
const hre = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const whitelist = require("./whitelist.json");
const owner = "0x25a5367Ea3f8d45E9601a70ECcC020f20A6Ac3FE"
const team = ["0x25a5367Ea3f8d45E9601a70ECcC020f20A6Ac3FE"]
const teamShares = [100]
const baseUrl = "ipfs://TEST"

async function getMerkle(owner: any, whitelist: any) {
  const leaves = whitelist.map(keccak256);
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();
  const leaf = keccak256(owner);
  const proof = tree.getHexProof(leaf);
  console.log("root : " + root);
  console.log("proof : " + proof);
  return root
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Shinobi = await hre.ethers.getContractFactory("ShinobiERC721A");
  const root = getMerkle(owner, whitelist)
  const shinobi = await Shinobi.deploy(team, teamShares, root, baseUrl);

  await shinobi.deployed();

  console.log("Shinobi deployed to:", shinobi.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error.stack);
  process.exitCode = 1;
});