import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-contract-sizer";
import "solidity-coverage";
import * as dotenv from "dotenv";
import "@typechain/hardhat";

dotenv.config({ path: "./../../.env" });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: process.env.POLYGON_URL,
        timeout: 120000000,
        // blockNumber: 12552123
        // blockNumber: 13024371
      },
      blockGasLimit: 20000000,
      timeout: 120000,
      gas: 'auto',
    },
    localhost: {
      url: 'http://localhost:8545',
    },
  },
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
