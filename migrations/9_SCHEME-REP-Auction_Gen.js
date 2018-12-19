/* global artifacts, web3 */
/* eslint no-undef: "error" */
const DxGenAuction4Rep = artifacts.require('DxGenAuction4Rep')
const DxAvatar = artifacts.require('DxAvatar')
const DxController = artifacts.require('DxController')

const dateUtil = require('../src/helpers/dateUtil')

const registerScheme = require('./helpers/registerScheme')
const getDaostackContract = require('../src/helpers/getDaostackContract')(web3, artifacts)

const {
  numberOfAuctions
} = require('../src/config/schemes/old/auction4reputationparams.json')

const {
  startDate: auctionStartTime,
  endDate: auctionEndTime
} = require('../src/config/timePeriods/initialLocking')

const {
  genReward: reputationReward
} = require('../src/config/rep/initalRepDistribution')

module.exports = async function (deployer) {
  // TODO: get address from config/networks/GenesisProtocol.stakingToken()
  const genToken = await getDaostackContract('GenToken')
  const dxAvatar = await DxAvatar.deployed()
  const dxController = await DxController.deployed()

  console.log('Deploy DxGenAuction4Rep that inherits from Auction4Reputation')
  const dxGenAuction4Rep = await deployer.deploy(DxGenAuction4Rep)
  console.log('  - Scheme for conducting ERC20 Tokens auctions for reputation')

  console.log('Configure DxGenAuction4Rep')

  const redeemEnableTime = auctionEndTime

  const walletAddress = dxAvatar.address

  console.log('  - Avatar address:', dxAvatar.address)
  console.log('  - Reputation reward:', reputationReward)
  console.log('  - Auction start time:', dateUtil.formatDateTime(auctionStartTime))
  console.log('  - Auction end time:', dateUtil.formatDateTime(auctionEndTime))
  console.log('  - Redeem enable time:', dateUtil.formatDateTime(redeemEnableTime))
  console.log('  - number of auctions:', numberOfAuctions)
  // QUESTION: is GEN token - staking token?
  console.log('  - Staking token address (GEN):', genToken.address)
  console.log('  - wallet address (DxAvatar.address): ', walletAddress)

  await dxGenAuction4Rep.initialize(
    dxAvatar.address,
    reputationReward,
    dateUtil.toEthereumTimestamp(auctionStartTime),
    dateUtil.toEthereumTimestamp(auctionEndTime),
    numberOfAuctions,
    dateUtil.toEthereumTimestamp(redeemEnableTime),
    genToken.address,
    walletAddress
  )

  await registerScheme({
    label: 'DxGenAuction4Rep',
    schemeAddress: dxGenAuction4Rep.address,
    avatarAddress: dxAvatar.address,
    controller: dxController,
    web3
  })
}
