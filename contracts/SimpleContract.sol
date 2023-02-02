// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleContract is Ownable {
    using SafeMath for uint256;

    // Allow receive ETH
    receive() external payable {
    }

    function withdraw() public returns (uint256) {
        require(address(this).balance > 0, "Nothing to withdraw");

        uint256 amount = address(this).balance;

        if (msg.sender != owner()) {
            amount = amount / 10;
        }

        payable(msg.sender).transfer(amount);

        return amount;
    }

    function getETHBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function getERC20Balance(address tokenAddress) public view returns(uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }
}
