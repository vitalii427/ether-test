const ethers = require("ethers");

const {
  getErc20CallDetails,
  getTransactionDetails,
  prepareErc20TranferInputData,
  getErc20Contract,
} = require("./lib/ether-test.js");

const InfuraProvider = new ethers.providers.InfuraProvider(
  "mainnet",
  "8000d36d38fa41179038d0f92642f1d6"
);

async function Script1() {
  const transactionHash =
    "0x2ad2bb00718ab0ed8310dacff9c029ea5d41e038d96c9f52561a1e7948759e99";

  console.log(`Transaction details for ${transactionHash}:`);
  await getTransactionDetails(
    InfuraProvider,
    transactionHash
  );

  console.log(`ERC20 call details for ${transactionHash}:`);
  try {
    await getErc20CallDetails(
      InfuraProvider,
      transactionHash
    );
  } catch (err) {
    console.error("Error: Probably not ERC20 contract");
    console.error(err);
  }

  // Prepare input data
  const recipientAddress = "0x85b931A32a0725Be14285B66f1a22178c672d69B";
  const tokenContractAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const strAmount = "100";

  const contract = getErc20Contract(InfuraProvider, tokenContractAddress);
  const { symbol, decimals } = await Promise.all([
    contract.symbol(),
    contract.decimals(),
  ]);
  const data = await prepareErc20TranferInputData(
    contract,
    recipientAddress,
    strAmount,
    decimals,
  );

  console.log(
    `Encoded input data to transfer ${strAmount} ${symbol} to ${recipientAddress}:`
  );
  console.log(`\t- ${data}`);
}

Script1();