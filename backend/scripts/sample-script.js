
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const ResearchFunding = await hre.ethers.getContractFactory("ResearchFunding");
  const deployedResearchFunding = await ResearchFunding.deploy();

  await deployedResearchFunding.deployed();

  console.log("ResearchFunding deployed to:", deployedResearchFunding.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
