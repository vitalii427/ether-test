const ethers = require("ethers");

const {
  getErc20CallDetails,
  getTransactionDetails,
  prepareErc20TranferInputData,
} = require("./lib/ether-test.js");

const InfuraProvider = new ethers.providers.InfuraProvider(
  "mainnet",
  "8000d36d38fa41179038d0f92642f1d6"
);

async function Script1() {
  await getTransactionDetails(
    InfuraProvider,
    "0x2ad2bb00718ab0ed8310dacff9c029ea5d41e038d96c9f52561a1e7948759e99"
  );

  try {
    await getErc20CallDetails(
      InfuraProvider,
      "0x2ad2bb00718ab0ed8310dacff9c029ea5d41e038d96c9f52561a1e7948759e99"
    );
  } catch (err) {
    console.error("Error: Probably not ERC20 contract");
    console.error(err);
  }

  await prepareErc20TranferInputData(
    InfuraProvider,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0x85b931A32a0725Be14285B66f1a22178c672d69B",
    "100"
  );
}

Script1();