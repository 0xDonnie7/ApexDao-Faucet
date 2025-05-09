import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { ethers } from 'ethers';
import { abi } from "../ApexFaucetABI.js"
import { useNavLinkContext } from "./NavLinkContext.jsx";


export default function RegisterWallet() {
    const { isNavLinkEnabled, setIsNavLinkEnabled } = useNavLinkContext();

    const [status, setStatus] = useState("");
    const [isWhitelisted, setIsWhitelisted] = useState(null);
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const navigate = useNavigate();

    const contractAddress = "0x965467e9142a2Ae4a0439621Ae41a3A559BD26E0";

    // Store connection info in localStorage
    useEffect(() => {
        if (isConnected) {
            localStorage.setItem("walletAddress", address);
            setStatus("Wallet connected!");
        } else {
            setStatus("");
            localStorage.removeItem("walletAddress");
        }
    }, [isConnected, address]);

    const register = async () => {
        if (!isConnected) {
            open();
            return;
        }
    };

    useEffect(() => {
        async function checkWhitelistStatus() {
            if (typeof window.ethereum !== "undefined" && isConnected && address) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(contractAddress, abi, provider);
                try {
                    const whitelisted = await contract.whitelisted(address);
                    if (whitelisted) {
                        setIsWhitelisted(whitelisted);
                        setIsNavLinkEnabled(true);
                    } else {
                        setIsWhitelisted(false);
                        setIsNavLinkEnabled(false);
                    }
                } catch (error) {
                    console.error("Error checking whitelist:", error);
                    setIsWhitelisted(false);
                }
            }
        }

        checkWhitelistStatus();
    }, [isConnected, address]);

    const disconnectWallet = () => {
        disconnect();
        localStorage.removeItem("walletAddress");
        setStatus("");
        setIsWhitelisted(null);
    };

    const claimClick = () => {
        navigate("/claim");
    };

    return (
        <div className="connect-wallet">
            {isConnected ? (
                <>
                    <div className="disconnect">
                        <button onClick={disconnectWallet} className="disconnect-button">Disconnect</button>
                    </div>
                    {status && <h2>{status}</h2>}
                    {address && <input type="text" value={address} readOnly />}
                    <button onClick={claimClick} className={!isWhitelisted ? 'disabled' : ''} disabled={!isWhitelisted}>{isWhitelisted ? "Proceed to Claim" : "Not eligible"}</button>
                </>
            ) : (
                <>
                    <h2>Connect your EVM Wallet</h2>
                    <button onClick={register}>Connect Wallet</button>
                </>
            )}
            {isWhitelisted === true &&
                <p style={{ color: 'green' }}>You are eligible to claim from the faucet.</p>
            }
            {isWhitelisted === false &&
                <p style={{ color: 'red' }}>You are not whitelisted to claim from the faucet.</p>
            }
        </div>
    );
}
