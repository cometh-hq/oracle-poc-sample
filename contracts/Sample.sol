// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IPriceFeed} from "./interfaces/IPriceFeed.sol";
import "hardhat/console.sol";

contract Sample {
    IPriceFeed public priceFeed;
    uint256 constant MAX_PRICE_UPDATE_DELAY = 5 * 60 * 1000; // 5 minutes

    event SomeEvent();

    constructor(IPriceFeed _priceFeed) {
        priceFeed = _priceFeed;
    }

    function doSomethingWithLatestPrice() external {
        // fetch latest price update
        (uint256 price, uint256 decimals, uint256 updatedAt) = priceFeed.latestUpdate();
        // require latest price update to be fresh enough
        require(updatedAt + MAX_PRICE_UPDATE_DELAY >= block.timestamp, "Price update too old");
        
        // TODO: do something relevant for your use-case, knowing the price was updated recently
        string memory priceFeedName = priceFeed.name();
        console.log(priceFeedName, "price was updated recently to", price / 10**18, "USD");

        emit SomeEvent();
    }
}