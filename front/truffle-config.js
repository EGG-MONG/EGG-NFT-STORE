require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
// npx truffle migrate --network goerli
// , process.env.INFURA_API_KEY
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "1337", // Any network (default: none)
    },
    // goerli: {
    //   provider: () =>
    //     new HDWalletProvider({
    //       mnemonic: {
    //         phrase: process.env.MNEMONIC,
    //       },
    //       providerOrUrl: process.env.INFURA_API_KEY,
    //     }),
    //   network_id: "5",
    // },
  },

  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
};
