import {
  IPriceFeed,
  IPriceFeedsUpdateTrigger,
  Sample
} from '@artifacts/typechain'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'

describe('Price Feed Sample', () => {
  async function setupTest(): Promise<{
    sample: Sample
    priceFeedsUpdateTrigger: IPriceFeedsUpdateTrigger
    priceFeed: IPriceFeed
    admin: Signer
    operator: Signer
    user: Signer
  }> {
    const [admin, operator, user] = await ethers.getSigners()

    const priceFeedsUpdateTrigger = await ethers.getContractAt(
      'IPriceFeedsUpdateTrigger',
      '0x562Be0fa5BE5bf2359494683B6680B5864A8324C'
    )
    const priceFeed = await ethers.getContractAt(
      'IPriceFeed',
      '0x52aD0Ad031E8efd67ccc3a862E37d69fC79c7072' // BTC-USD price feed
    )
    const sample = await ethers.deployContract(
      'Sample',
      [await priceFeed.getAddress()],
      admin
    )

    return {
      sample,
      priceFeedsUpdateTrigger,
      priceFeed,
      admin,
      operator,
      user
    }
  }

  it('should log something with an updated price', async () => {
    const { sample, priceFeedsUpdateTrigger, priceFeed, user } =
      await loadFixture(setupTest)

    await expect(sample.doSomethingWithLatestPrice()).to.emit(
      sample,
      'SomeEvent'
    )
  })
})
