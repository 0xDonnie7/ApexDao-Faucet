import { abi } from "../ApexFaucetABI.js";
import { ethers } from 'ethers';
import { useAppKitAccount } from "@reown/appkit/react";

export default function Claim() {

    const { address, isConnected } =
        useAppKitAccount();

    const contractAddress = "0x965467e9142a2Ae4a0439621Ae41a3A559BD26E0";

    async function claimFromFaucet() {
        if (isConnected) {
            if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send('eth_requestAccounts', [])
                const signer = await provider.getSigner()
                const contract = new ethers.Contract(contractAddress, abi, signer)
                try {
                    console.log("Processing transaction...");
                    const transactionResponse = await contract.claim()
                    await transactionResponse.wait(1)
                    console.log("Done!")
                    const txnHash = transactionResponse.hash();
                    console.log(txnHash);
                } catch (error) {
                    const errorMessage = error?.error?.message || error?.reason || error?.message;

                    if (errorMessage?.includes("Not whitelisted")) {
                        alert("You are not whitelisted to claim from the faucet.");
                    } else {
                        alert("Transaction failed: " + errorMessage);
                    }
                }
            } else {
                console.log("Not whitelisted");
            }
        }
    }

    return (
        <div className="claim-site">
            <h2>Claim</h2>
            <h3 className="display-address">Your wallet Address: {address}</h3>
            <button onClick={claimFromFaucet}>Claim faucet</button>
        </div>
    )
}