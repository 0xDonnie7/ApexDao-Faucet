//SPDX-License-Identifier: MIT

pragma solidity ^0.8.29;

contract ApexFaucet {
    address public owner;
    uint256 public constant MAX_AMOUNT = 0.2 ether;
    mapping(address => uint) public lastClaimedAt;
    mapping(address => bool) public whitelisted;

    event Whitelisted(address indexed user);
    event RemovedFromWhitelist(address indexed user);
    event Claimed(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyWhitelisted() {
        require(whitelisted[msg.sender], "Not whitelisted");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this function");
        _;
    }

    function addToWhitelist(address user) external onlyOwner {
        require(!whitelisted[user], "Address already whitelisted");
        whitelisted[user] = true;
        emit Whitelisted(user);
    }

    function removeFromWhitelist(address user) external onlyOwner {
        require(whitelisted[user], "Address not whitelisted");
        whitelisted[user] = false;
        emit RemovedFromWhitelist(user);
    }

    function claim() external onlyWhitelisted {
        require(
            block.timestamp >= lastClaimedAt[msg.sender] + 2 days,
            "Claim cooldown: wait for 2 days"
        );

        uint payout = address(this).balance >= MAX_AMOUNT
            ? MAX_AMOUNT
            : address(this).balance;
        require(payout > 0, "Faucet is empty");
        lastClaimedAt[msg.sender] = block.timestamp;
        payable(msg.sender).transfer(payout);
        emit Claimed(msg.sender, payout);
    }

    function drainFaucet() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No faucet to drain");

        payable(owner).transfer(balance);
    }

    receive() external payable {}
}
