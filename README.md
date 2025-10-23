# ApexDao Faucet

ApexDao Faucet is a sepolia faucet that distributes ETH to users. This faucet is built on top of a smart contract and uses a web interface to allow users to claim small amounts of testnet ETH at regular intervals.

## 🌟 Features
Token Distribution: Users can claim tokens via the faucet.

Smart Contract Interaction: Built on Sepolia.

Web Interface: A user-friendly React frontend..

## 🛠 Technologies Used
React.js: Frontend framework for the user interface.

Ethers.js: For interacting with the blockchain.

Reown AppKit: For wallet & UI connection

Solidity: Smart contract code that powers the faucet.

Sepolia: The blockchain network used for distributing tokens.

## 🧑‍💻 Installation
To get the project up and running locally, follow these steps:

Clone the repository:

git clone https://github.com/your-username/OT-Faucet.git
cd OT-Faucet
Install dependencies:
If you're using npm:

npm install
Or if you're using yarn:

yarn install
Run the project locally:
To start the development server:

npm start
This will open the faucet on http://localhost:3000.

Connect to the blockchain:
Make sure your MetaMask or other Ethereum wallet is set up and connected to the network you want (e.g., the Ethereum testnet or mainnet).

## 🔐 Security Considerations
Ensure that the smart contract is audited for vulnerabilities.

Make sure you have rate-limiting or anti-bot measures in place to prevent abuse.

## 📈 How It Works
User Visits Faucet: The user accesses the frontend web interface.

Claim Tokens: Users can claim tokens at a set interval, based on conditions like wallet address and transaction costs.

Smart Contract Interaction: The frontend interacts with the smart contract, executing the transfer of tokens.

Tokens Delivered: After the user’s transaction is confirmed, the tokens are delivered to their wallet.

