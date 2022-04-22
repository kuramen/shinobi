// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
Error.stackTraceLimit = Infinity;
const hre = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const { keccak256 } = require("@ethersproject/keccak256");
const fs = require('fs');

const whitelist = require("../src/configuration/Whitelist.json");
const team = require("../src/configuration/Team.json");

const baseUri = "ipfs://baseUri"
const notRevealedURI = "ipfs://notRevealedURI"


async function getMerkle(whitelist: Array<String>) {
  const leaves = whitelist.map(keccak256)
  const tree = new MerkleTree(leaves, keccak256, { sort: true })
  const root = tree.getHexRoot()
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
  const Shinobi = await hre.ethers.getContractFactory("ShinobiERC721");
  const teamAdresses = team.map((member: any) => member.address)
  const root = getMerkle(whitelist.concat(teamAdresses))
  const shinobi = await Shinobi.deploy(baseUri, notRevealedURI, root);

  await shinobi.deployed();

  console.log("Shinobi deployed to:", shinobi.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error.stack);
  process.exitCode = 1;
});