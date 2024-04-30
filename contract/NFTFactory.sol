// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./NFT.sol";

contract NFTFactory {
    NFT[] public deployedNFTs;

    event NFTCreated(address nftAddress);

    function createNFT(string memory name, string memory symbol) public {
        NFT newNFT = new NFT(name, symbol);
        deployedNFTs.push(newNFT);
        emit NFTCreated(address(newNFT));
    }

    function getDeployedNFTs() public view returns (NFT[] memory) {
        return deployedNFTs;
    }
}
