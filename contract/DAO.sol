// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract MyGovernanceToken is ERC20, ERC20Votes {
    constructor() ERC20("GovernanceToken", "GT") ERC20Permit("GovernanceToken") {
        _mint(msg.sender, 10000 * 10 ** uint(decimals())); // Initial supply of tokens to the deployer
    }

    // The functions below are overrides required by Solidity.
    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}

contract MyDAO is Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    constructor(ERC20Votes _token)
        Governor("MyDAO")
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) // Quorum of 25%
    {}

    function votingDelay() public pure override returns (uint256) {
        return 1; // 1 block
    }

    function votingPeriod() public pure override returns (uint256) {
        return 45818; // ~1 week
    }

    function proposalThreshold() public pure override returns (uint256) {
        return 100; // 100 tokens required to create a proposal
    }

    // The functions below are overrides required by Solidity.
    function _quorumReached(uint256 proposalId) internal view override returns (bool) {
        return quorum(proposalSnapshot(proposalId)) <= proposalVotes(proposalId);
    }

    function _execute(bytes memory details, bytes memory data) internal override {
        (bool success, ) = address(this).delegatecall(data);
        require(success, "Proposal execution failed");
    }
}
