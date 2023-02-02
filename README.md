# Simple smart contract and JS scripts

## Init:
```shell
yarn
```

## Run smart contract tests:
```shell
npx hardhat test
```

## Deploy smart contract:
```shell
npx hardhat node
npx hardhat run scripts/deploy.js
```

## Run Script1 & Script2:
```shell
node index.js
```
## Output:
```
Script 1:
To Address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
Gas Price: 0.000000272978274689 ether
Block Number: 13507871
Block Miner: 0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8
Raw Input Data: 0xa9059cbb0000000000000000000000003be960fef469fee13a34a475f5b57e9ec2a9899800000000000000000000000000000000000000000000000000000000066ff300
Token Name: USD Coin
Token Symbol: USDC
Token Decimals: 6
Call: transfer(0x3Be960FEF469FEe13A34A475f5b57E9ec2A98998,108000000)
        - transfer() recipient address: 0x3Be960FEF469FEe13A34A475f5b57E9ec2A98998
        - transfer() amount: 108.0 USDC
Encoded input data to transfer 100 undefined to 0x85b931A32a0725Be14285B66f1a22178c672d69B:
        0xa9059cbb00000000000000000000000085b931a32a0725be14285b66f1a22178c672d69b0000000000000000000000000000000000000000000000056bc75e2d63100000

Script 2:
Max Sender: 0x46340b20830761efd32832A74d7169B29FEB9758 [15 sends]
Max Receiver: 0xA090e606E30bD747d4E6245a1517EbE430F0057e [97 recvs]
Max Gas Price: 0.000000324 ether
```
