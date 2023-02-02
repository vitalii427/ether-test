# Simple smart contract and JS scripts

## Init:
```shell
git clone https://github.com/vitalii427/ether-test.git
cd ether-test

yarn
```

## Compile smart contract:
```shell
npx hardhat compile
```

## Run smart contract tests:
```shell
npx hardhat test
```

## Deploy smart contract:
```shell
# run local test node
npx hardhat node

# deploy
npx hardhat run scripts/deploy.js
```

## Etherscan task 1
```
Block 13507871:
1. Mined by 0xea674fdde714fd979de3edf0f56aa9716b898ec8 (Ethermine)
2. Block contains 74 transactions
3. Transaction sent by 0x71660c4005ba85c37ccec55d0c4493e66fe775d3 (Coinbase 1):
        0x2ad2bb00718ab0ed8310dacff9c029ea5d41e038d96c9f52561a1e7948759e99 
```

## Run Script1
```shell
node script1.js
```
### Output:
```
Transaction details for 0x2ad2bb00718ab0ed8310dacff9c029ea5d41e038d96c9f52561a1e7948759e99:
To Address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
Gas Price: 0.000000272978274689 ether
Block Number: 13507871
Block Miner: 0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8
Raw Input Data: 0xa9059cbb0000000000000000000000003be960fef469fee13a34a475f5b57e9ec2a9899800000000000000000000000000000000000000000000000000000000066ff300
ERC20 call details for 0x2ad2bb00718ab0ed8310dacff9c029ea5d41e038d96c9f52561a1e7948759e99:
Token Name: USD Coin
Token Symbol: USDC
Token Decimals: 6
Call: transfer(0x3Be960FEF469FEe13A34A475f5b57E9ec2A98998,108000000)
        - transfer() recipient address: 0x3Be960FEF469FEe13A34A475f5b57E9ec2A98998
        - transfer() amount: 108.0 USDC
Encoded input data to transfer 100 USDC to 0x85b931A32a0725Be14285B66f1a22178c672d69B:
        - 0xa9059cbb00000000000000000000000085b931a32a0725be14285b66f1a22178c672d69b0000000000000000000000000000000000000000000000000000000005f5e100
```

## Etherscan task 2
```
Next block mined by 0xea674fdde714fd979de3edf0f56aa9716b898ec8 is 13507875
```

## Run Script2:
```shell
node script2.js
```
### Output:
```
Max Sender: 0x46340b20830761efd32832A74d7169B29FEB9758 [15 sends]
Max Receiver: 0xA090e606E30bD747d4E6245a1517EbE430F0057e [97 recvs]
Max Gas Price: 0.000000324 ether
```

## Sepolia testnet
 - Contract deployed to [0x138dEAC1eCC501241FB567E6ddFA00a6DBCAD4Ff](https://sepolia.etherscan.io/address/0x138deac1ecc501241fb567e6ddfa00a6dbcad4ff) by [0x2d97Dc28b939d37Cc5fe1C7724a75726578Ae106](https://sepolia.etherscan.io/address/0x2d97Dc28b939d37Cc5fe1C7724a75726578Ae106)
 - Source code uploaded & verified at Etherscan
 - Few test transactions done
