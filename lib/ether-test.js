const ethers = require('ethers');
const { BigNumber, utils } = ethers;

const InfuraProvider = new ethers.providers.InfuraProvider('mainnet', '8000d36d38fa41179038d0f92642f1d6');

const DEFAULT_ERC20_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

async function getErc20TransactionDetails(transactionHash) {
  const transaction = await InfuraProvider.getTransaction(transactionHash);
  const { to, gasPrice, data, blockNumber } = transaction;
  const block = await InfuraProvider.getBlock(blockNumber);
  const { miner } = block;

  console.log(`To Address: ${to}`);
  console.log(`Gas Price: ${utils.formatUnits(gasPrice, 'ether')} ether`);
  console.log(`Block Number: ${blockNumber}`);
  console.log(`Block Miner: ${miner}`);
  console.log(`Raw Input Data: ${data}`);

  try {
    const contract = new ethers.Contract(to, DEFAULT_ERC20_ABI, InfuraProvider);
    const [ tokenName, symbol, decimals ] = await Promise.all([contract.name(), contract.symbol(), contract.decimals()]);
    console.log(`Token Name: ${tokenName}`);
    console.log(`Token Symbol: ${symbol}`);
    console.log(`Token Decimals: ${decimals}`);

    const functionSignature = data.slice(0, 10);
    const fnFragment = contract.interface.getFunction(functionSignature);
    const { name, inputs } = fnFragment;
    const fnArgs = contract.interface.decodeFunctionData(fnFragment, data);

    console.log(`Call: ${name}(${fnArgs})`);

    switch (name) {
    case 'transfer':
      const [recipientAddress, amount] = fnArgs;
      console.log(`transfer() recipient address: ${recipientAddress}`);
      console.log(`transfer() amount: ${utils.formatUnits(amount, decimals)}`);
      break;
    }

  } catch (err) {
    console.error("Error: Probably not ERC20 contract");
    console.error(err);
  }
}

async function prepareErc20TranferInputData(tokenContractAddress, recipientAddress, strAmount) {
  const contract = new ethers.Contract(tokenContractAddress, DEFAULT_ERC20_ABI, InfuraProvider);
  const decimals = await contract.decimals();
  const amount = utils.parseUnits(strAmount, decimals)
  const transferData = contract.interface.encodeFunctionData('transfer', [recipientAddress, amount]);
  console.log('transferData', transferData);
}

async function getBlockData(blockNumber) {
  const block = await InfuraProvider.getBlock(blockNumber);
  const senders = {};
  const receivers = {};
  let maxGasPrice = BigNumber.from(0);

  const transactions = await Promise.all(block.transactions.map(transactionHash => InfuraProvider.getTransaction(transactionHash)));
  transactions.forEach(transactionData => {
    const {to, from, gasPrice} = transactionData;
    senders[from] = 1 + senders[from] || 0;
    receivers[to] = 1 + receivers[to] || 0;
    if (maxGasPrice.lt(gasPrice)) maxGasPrice = gasPrice;
  });

  const maxSends = Math.max(...Object.values(senders));
  let maxRecvs = Math.max(...Object.values(receivers));
  const maxSender = Object.entries(senders).find(([addr, count]) => count == maxSends)[0];
  const maxReceiver = Object.entries(receivers).find(([addr, count]) => count == maxRecvs)[0];

  console.log(`Max Sender: ${maxSender} [${maxSends} sends]`);
  console.log(`Max Receiver: ${maxReceiver} [${maxRecvs} recvs]`);
  console.log(`Max Gas Price: ${utils.formatUnits(maxGasPrice, 'ether')} ether`);
}

async function main() {
  console.log('Script 1');
  await getErc20TransactionDetails('0x2ad2bb00718ab0ed8310dacff9c029ea5d41e038d96c9f52561a1e7948759e99');

  console.log('\nScript 1a');
  await prepareErc20TranferInputData('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', '0x85b931A32a0725Be14285B66f1a22178c672d69B', '100');

  console.log('\nScript 2');
  await getBlockData(13507875);
}

main();

