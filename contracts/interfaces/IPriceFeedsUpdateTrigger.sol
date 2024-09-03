// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPriceFeedsUpdateTrigger {
    event PriceFeedsUpdateRequest();

    function refreshPriceFeeds() payable external;
}