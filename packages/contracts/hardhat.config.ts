import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-contract-sizer';
import 'solidity-coverage';
import * as dotenv from 'dotenv';
import '@typechain/hardhat';

dotenv.config({ path: './../../.env' });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
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
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: false,
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: true,
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
