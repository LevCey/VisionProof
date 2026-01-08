import { ethers } from "hardhat";

async function main() {
  // MNEE contract address on Ethereum Mainnet
  const MNEE_ADDRESS = "0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFB6cF";
  
  const CreatorEscrow = await ethers.getContractFactory("CreatorEscrow");
  const escrow = await CreatorEscrow.deploy(MNEE_ADDRESS);
  
  await escrow.waitForDeployment();
  
  console.log("CreatorEscrow deployed to:", await escrow.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
