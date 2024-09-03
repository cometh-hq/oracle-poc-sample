import {
  IPriceFeedsUpdateTrigger,
  IPriceFeedsUpdateTrigger__factory,
  Sample__factory
} from '@artifacts/typechain'
import * as dotenv from 'dotenv'
dotenv.config()

import { ethers } from 'ethers'

const operatorWallet = new ethers.Wallet(process.env.PRIVATE_KEY || '')

const provider = new ethers.JsonRpcProvider(
  'https://endpoints.omniatech.io/v1/arbitrum/sepolia/public'
)
const priceFeedsUpdateTrigger = IPriceFeedsUpdateTrigger__factory.connect(
  '0x562Be0fa5BE5bf2359494683B6680B5864A8324C',
  provider
)
const sampleContract = Sample__factory.connect(
  process.env.SAMPLE_CONTRACT_ADDRESS ||
    '0x6dAc5fD974C71D12186B57F5d163B09E4Cf618df',
  operatorWallet
)

const detectRefreshPriceFeedsRequests =
  async (): Promise<IPriceFeedsUpdateTrigger> => {
    const filter = priceFeedsUpdateTrigger.filters.PriceFeedsUpdateRequest
    return priceFeedsUpdateTrigger.on(filter, notifySampleContract)
  }

const notifySampleContract = async (): Promise<void> => {
  await sampleContract.doSomethingWithLatestPrice()
}

void detectRefreshPriceFeedsRequests()

process
  .on('unhandledRejection', (error: Error) => {
    console.error('unhandledRejection', error)
    process.exit(1)
  })
  .on('uncaughtException', (error: Error) => {
    console.error('uncaughtException', error)
    process.exit(1)
  })

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
  process.exit(0)
})
process.on('‘SIGINT’', () => {
  console.info('‘SIGINT’ signal received.')
  process.exit(0)
})
process.on('exit', () => {
  console.info('Exit signal received.')
})
