import { Sample } from '@artifacts/typechain'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Price Feed Sample', () => {
  async function setupTest(): Promise<{
    sample: Sample
  }> {
    const [admin, operator, user] = await ethers.getSigners()

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
      sample
    }
  }

  it('should log something with an updated price', async () => {
    const { sample } = await loadFixture(setupTest)

    await expect(sample.doSomethingWithLatestPrice()).to.emit(
      sample,
      'SomeEvent'
    )
  })
})
