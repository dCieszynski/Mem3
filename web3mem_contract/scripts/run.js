const { BigNumber } = require("ethers");

const main = async () => {
  const gagContractFactory = await hre.ethers.getContractFactory("Gag");
  const gagContract = await gagContractFactory.deploy();
  await gagContract.deployed();

  console.log(`Contract address: ${gagContract.address}`);

  const sendImageTxn = await gagContract.sendImage(
    "https://img-9gag-fun.9cache.com/photo/avAvPeM_700bwp.webp"
  );
  await sendImageTxn.wait();

  let allImages = await gagContract.getAllImages();
  console.log(allImages);

  const likeImageTxn = await gagContract.like(0);
  await likeImageTxn.wait();

  const likeImageTxn2 = await gagContract.like(0);
  await likeImageTxn2.wait();

  allImages = await gagContract.getAllImages();

  console.log(allImages);
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
