pragma solidity ^0.4.24;

// DutchX dependencies
import "@gnosis.pm/dx-contracts/contracts/DxDevDependencies.sol";

// Universal Schemes
import "@daostack/arc/contracts/universalSchemes/SchemeRegistrar.sol";
import "@daostack/arc/contracts/universalSchemes/UpgradeScheme.sol";
import "@daostack/arc/contracts/universalSchemes/GlobalConstraintRegistrar.sol";
import "@daostack/arc/contracts/universalSchemes/ContributionReward.sol";
import "@daostack/arc/contracts/universalSchemes/GenericScheme.sol";
import "@daostack/infra/contracts/votingMachines/GenesisProtocol.sol";

// Tokens
//  First aproach, maybe later we take it from DutchX contracts
import "../test/contracts/GenToken.sol";
// import "../test/contracts/MgnToken.sol";
// import "../test/contracts/EthToken.sol";
// import "../test/contracts/GnoToken.sol";

contract LocalDevelopment {}
