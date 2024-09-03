import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const {
    deployments: { deploy }
  } = hre
  const [deployer] = await hre.ethers.getSigners()

  await deploy('Sample', {
    from: deployer.address,
    args: ['0x52aD0Ad031E8efd67ccc3a862E37d69fC79c7072'], // BTC-USD price feed
    log: true
  })
}

export default func
func.tags = ['sample']
