/* global artifacts, artifacts  */
/* eslint no-undef: "error" */

var Migrations = artifacts.require('./Migrations.sol')

module.exports = function (deployer) {
  deployer.deploy(Migrations)
}
