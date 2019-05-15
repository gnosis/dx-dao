/* global artifacts, web3 */

const genesisProtocolHelper = require('../src/helpers/genesisProtocolHelper')({ artifacts, web3 })



module.exports = async function (deployer) { // eslint-disable-line no-unused-vars  
  // Configure Genesis Protocol voting machine
  await genesisProtocolHelper.setupGenesisProtocol()
}
