const Web3 = require("web3");

const Abi = require("./abi.json");

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

async function getBalance(address) {
  const contract = "0xe5859f4EFc09027A9B718781DCb2C6910CAc6E91";

  const Instance = new web3.eth.Contract(Abi, contract);

  const numberOfTokens = await Instance.methods._ntokens().call();
  const LPtokensRecieved = await Instance.methods.balanceOf(address).call();
  const LptotalSupply = await Instance.methods.totalSupply().call();

  for (let i = 0; i < 8; i++) {
    let tokenReserve = await Instance.methods.getTokenStats(i).call();
    let tokenDecimals = tokenReserve.decimals;
    tokenReserve = tokenReserve.balance;

    let balance = (
      (LPtokensRecieved / LptotalSupply) *
      (tokenReserve / 10 ** tokenDecimals)
    ).toFixed(2);

    switch (i) {
      case 0:
        console.log(balance, "USDT");
        break;
      case 1:
        console.log(balance, "USDC");
        break;
      case 2:
        console.log(balance, "DAI");
        break;
      case 3:
        console.log(balance, "TUSD");
        break;
      case 4:
        console.log(balance, "sUSD");
        break;
      case 5:
        console.log(balance, "BUSD");
        break;
      case 6:
        console.log(balance, "PAX");
        break;
      case 7:
        console.log(balance, "GUSD");
        break;
    }
  }
}

let address = "0xf38c50b316ad1d5b177f4f085994383b8e92730e";
getBalance(address);
