const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const deployerBalance = await deployer.getBalance();

  console.log(`Deploying contracts with accoutnt: ${deployer.address}`);
  console.log(`Account balance: ${deployerBalance.toString()}`);

  const gagContractFactory = await hre.ethers.getContractFactory("Gag");
  const gagContract = await gagContractFactory.deploy();
  await gagContract.deployed();

  console.log(`Gag Portal address: ${gagContract.address}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
