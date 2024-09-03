// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPriceFeed {
    function name() external view returns (string memory);
    function latestUpdate() external view returns (uint256, uint256, uint256);
}