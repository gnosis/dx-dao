/* global artifacts, web3 */
/* eslint no-undef: "error" */
const assert = require('assert')

const getDaostackContract = require('../src/helpers/getDaostackContract')(web3, artifacts)


module.exports = async function (deployer) {
  // Configure Genesis Protocol voting machine
  const genesisProtocolConf = require('../src/config/votingMachines/GenesisProtocol')
  // reuse GenesisProtocol if available on the network
  const genesisProtocol = await getDaostackContract('GenesisProtocol')

  // Genesis Protocol params:
  //    https://github.com/daostack/infra/blob/master/contracts/VotingMachines/GenesisProtocol.sol#L27
  const parameterNames = [
    'preBoostedVoteRequiredPercentage',
    'preBoostedVotePeriodLimit',
    'boostedVotePeriodLimit',
    'thresholdConstA',
    'thresholdConstB',
    'minimumStakingFee',
    'quietEndingPeriod',
    'proposingRepRewardConstA',
    'proposingRepRewardConstB',
    'stakerFeeRatioForVoters',
    'votersReputationLossRatio',
    'votersGainRepRatioFromLostRep',
    'daoBountyConst',
    'daoBountyLimit'
  ]

  const { voteOnBehalf } = genesisProtocolConf

  console.log('Configure Genesis Protocol voting machine:')
  parameterNames.concat('voteOnBehalf').forEach(parameterName => {
    const parameter = genesisProtocolConf[parameterName]
    console.log(`  - ${parameterName}: ${parameter}`)
    assert(parameter !== undefined, `The parameter ${parameterName} for genesisProtocol was not defined`)
  })

  const parameters = parameterNames
    .map(parameterName => genesisProtocolConf[parameterName])

  const txResult = await genesisProtocol.setParameters(parameters, voteOnBehalf)
  console.log('  - Transaction: ' + txResult.tx)
  console.log('  - Gas used: ' + txResult.receipt.gasUsed)
  console.log()
}
