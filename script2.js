const ethers = require("ethers");

const {
  getBlockData,
} = require("./lib/ether-test.js");

const InfuraProvider = new ethers.providers.InfuraProvider(
  "mainnet",
  "8000d36d38fa41179038d0f92642f1d6"
);

async function Script2() {
  await getBlockData(InfuraProvider, 13507875);
}

Script2();
