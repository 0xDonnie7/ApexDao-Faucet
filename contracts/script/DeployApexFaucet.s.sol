// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import {Script} from "forge-std/Script.sol";
import {ApexFaucet} from "../src/ApexFaucet.sol";

contract DeployApexFaucet is Script {
    function run() external returns (ApexFaucet) {
        vm.startBroadcast();
        ApexFaucet apexFaucet = new ApexFaucet();
        vm.stopBroadcast();
        return apexFaucet;
    }
}
