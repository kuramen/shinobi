// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
Error.stackTraceLimit = Infinity;
const hre = require("hardhat");
const web3Config = require("../src/configuration/Web3.json")
const ShinobiERC721 = require("../src/configuration/ShinobiERC721.json")


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const signer = await hre.ethers.getSigner();
  const contract = new hre.ethers.Contract(web3Config.contractAdress, ShinobiERC721.abi, signer)
  await contract.setPaused()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error.stack);
  process.exitCode = 1;
});