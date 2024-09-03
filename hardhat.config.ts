import '@nomicfoundation/hardhat-toolbox'
import '@nomicfoundation/hardhat-chai-matchers'
import 'dotenv/config'
import 'hardhat-contract-sizer'
import 'hardhat-deploy'

import { ethers } from 'ethers'
import { HardhatUserConfig } from 'hardhat/config'

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000
          }
        }
      }
    ]
  },
  paths: {
    tests: './tests/hardhat'
  },
  networks: {
    hardhat: {
      //accounts:
      //  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      //accounts,
      forking: {
        url:
          process.env.ARBITRUM_SEPOLIA_URL ||
          'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
        blockNumber: 76779734
      }
    },
    arbitrum_sepolia: {
      url:
        process.env.ARBITRUM_SEPOLIA_URL ||
        'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    }
  },
  typechain: {
    outDir: 'artifacts/typechain',
    target: 'ethers-v6',
    tsNocheck: true
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: ['ERC20', 'ERC20Test'],
    coinmarketcap: process.env.COINMARKETCAP_API,
    currency: 'EUR'
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: 'arbitrum_sepolia',
        chainId: 421614,
        urls: {
          apiURL: 'https://api-sepolia.arbiscan.io/api',
          browserURL: 'https://sepolia.arbiscan.io/'
        }
      },
      {
        network: 'arbitrum',
        chainId: 42161,
        urls: {
          apiURL: 'https://api.arbiscan.io/api',
          browserURL: 'https://arbiscan.io/'
        }
      }
    ]
  }
}

export default config
