// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Token.sol";

contract TokenFactory {
    // Array to keep track of all deployed tokens
    Token[] public deployedTokens;

    // Event to emit when a new token is created
    event TokenCreated(address tokenAddress);

    // Function to create a new token
    function createToken(string memory name, string memory symbol, uint256 initialSupply) public {
        Token newToken = new Token(name, symbol, initialSupply);
        deployedTokens.push(newToken);
        emit TokenCreated(address(newToken));
    }

    // Function to get all deployed tokens
    function getDeployedTokens() public view returns (Token[] memory) {
        return deployedTokens;
    }
}
