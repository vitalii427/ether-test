const ethers = require("ethers");
const { BigNumber, utils } = ethers;

const DEFAULT_ERC20_ABI = require("./erc20.json");

exports.getErc20CallDetails = async function getErc20CallDetails(
  provider,
  transactionHash
) {
  const { to, data } = await provider.getTransaction(transactionHash);
  const contract = new ethers.Contract(to, DEFAULT_ERC20_ABI, provider);
  const [tokenName, symbol, decimals] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
  ]);
  console.log(`Token Name: ${tokenName}`);
  console.log(`Token Symbol: ${symbol}`);
  console.log(`Token Decimals: ${decimals}`);

  const functionSignature = data.slice(0, 10);
  const functionFragment = contract.interface.getFunction(functionSignature);
  const { name: functionName } = functionFragment;
  const functionArgs = contract.interface.decodeFunctionData(
    functionFragment,
    data
  );

  console.log(`Call: ${functionName}(${functionArgs})`);

  switch (functionName) {
    case "transfer":
      const [recipientAddress, amount] = functionArgs;
      console.log(`\t- transfer() recipient address: ${recipientAddress}`);
      console.log(
        `\t- transfer() amount: ${utils.formatUnits(
          amount,
          decimals
        )} ${symbol}`
      );
      break;
  }
};

exports.getTransactionDetails = async function getTransactionDetails(
  provider,
  transactionHash
) {
  const { to, gasPrice, data, blockNumber } = await provider.getTransaction(
    transactionHash
  );
  const block = await provider.getBlock(blockNumber);
  const { miner } = block;

  console.log(`To Address: ${to}`);
  console.log(`Gas Price: ${utils.formatUnits(gasPrice, "ether")} ether`);
  console.log(`Block Number: ${blockNumber}`);
  console.log(`Block Miner: ${miner}`);
  console.log(`Raw Input Data: ${data}`);
};

exports.prepareErc20TranferInputData =
  async function prepareErc20TranferInputData(
    contract,
    recipientAddress,
    strAmount,
    decimals
  ) {
    const amount = utils.parseUnits(strAmount, decimals);
    const transferData = contract.interface.encodeFunctionData("transfer", [
      recipientAddress,
      amount,
    ]);
    return transferData;
  };

exports.getBlockData = async function getBlockData(provider, blockNumber) {
  const block = await provider.getBlock(blockNumber);
  const senders = {};
  const receivers = {};
  let maxGasPrice = BigNumber.from(0);

  const transactions = await Promise.all(
    block.transactions.map((transactionHash) =>
      provider.getTransaction(transactionHash)
    )
  );
  transactions.forEach((transactionData) => {
    const { to, from, gasPrice } = transactionData;
    senders[from] = 1 + senders[from] || 0;
    receivers[to] = 1 + receivers[to] || 0;
    if (maxGasPrice.lt(gasPrice)) maxGasPrice = gasPrice;
  });

  const maxSends = Math.max(...Object.values(senders));
  let maxRecvs = Math.max(...Object.values(receivers));
  const maxSender = Object.entries(senders).find(
    ([addr, count]) => count == maxSends
  )[0];
  const maxReceiver = Object.entries(receivers).find(
    ([addr, count]) => count == maxRecvs
  )[0];

  console.log(`Max Sender: ${maxSender} [${maxSends} sends]`);
  console.log(`Max Receiver: ${maxReceiver} [${maxRecvs} recvs]`);
  console.log(
    `Max Gas Price: ${utils.formatUnits(maxGasPrice, "ether")} ether`
  );
};

exports.getErc20Contract = function getErc20Contract(provider, tokenContractAddress) {
  return new ethers.Contract(tokenContractAddress, DEFAULT_ERC20_ABI, provider);
}