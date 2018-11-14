pragma solidity ^0.4.24;

import "./TestToken.sol";

contract GnoToken is TestToken {
    constructor (uint256 initialBalance) public
    TestToken ("Gnosis", "GNO", initialBalance) {}
}