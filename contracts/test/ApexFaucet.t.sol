// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.29;

import "forge-std/Test.sol";
import "../src/ApexFaucet.sol";

contract ApexFaucetTest is Test {
    ApexFaucet faucet;
    address user = address(0x1);
    address owner = address(this);

    function setUp() public {
        faucet = new ApexFaucet();
    }

    function testOwnerCanWhitelist() public {
        faucet.addToWhitelist(user);
        assertTrue(faucet.whitelisted(user));
    }

    function testUserCannotClaimIfNotWhitelisted() public {
        vm.prank(user);
        vm.expectRevert("Not whitelisted");
        faucet.claim();
    }

    function testClaimCooldownWorks() public {
        faucet.addToWhitelist(user);
        vm.deal(address(faucet), 1 ether);

        vm.prank(user);
        faucet.claim();

        // Try to claim again immediately
        vm.prank(user);
        vm.expectRevert("Claim cooldown: wait for 2 days");
        faucet.claim();
    }

    function testClaimAfter2Days() public {
        faucet.addToWhitelist(user);
        vm.deal(address(faucet), 1 ether);

        vm.prank(user);
        faucet.claim();

        // Warp time forward 2 days
        vm.warp(block.timestamp + 2 days);

        vm.prank(user);
        faucet.claim();
    }
}
