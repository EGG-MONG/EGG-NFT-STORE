require("dotenv").config();

// npx truffle migrate --network goerli

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "1337", // Any network (default: none)
    },
    // goerli: {
    //   provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_API_KEY),
    //   network_id: '5',
    //   gas: 4465030
    // }
  },

  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
};
