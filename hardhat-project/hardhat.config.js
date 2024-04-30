require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
    },
    ethereum: {
      url: process.env.ETH_MAINNET_RPC_URL, // RPC URL for Ethereum Mainnet
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 1,
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL, // RPC URL for Rinkeby Testnet
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 4,
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL, // RPC URL for Goerli Testnet
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 5,
    },
    kovan: {
      url: process.env.KOVAN_RPC_URL, // RPC URL for Kovan Testnet
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 42,
    },
    ropsten: {
      url: process.env.ROPSTEN_RPC_URL, // RPC URL for Ropsten Testnet
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 3,
    },
    scrollSepolia: {
      url: "https://rpc.sepolia.scroll.io", // RPC URL for Scroll Sepolia
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 11155111,
    },
    scrollMainnet: {
      url: "https://rpc.scroll.io", // RPC URL for Scroll Mainnet
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 1111,
    }
  },
  etherscan: {
    apiKey: {
      // You must replace these with your API keys
      ethereum: "YOUR_ETHERSCAN_API_KEY",
      rinkeby: "YOUR_RINKEBY_API_KEY",
      goerli: "YOUR_GOERLI_API_KEY",
      kovan: "YOUR_KOVAN_API_KEY",
      ropsten: "YOUR_ROPSTEN_API_KEY",
      scrollSepolia: "YOUR_SCROLL_SEPOLIA_ETHERSCAN_API_KEY",
      scrollMainnet: "YOUR_SCROLL_MAINNET_ETHERSCAN_API_KEY",
    }
  }
};
