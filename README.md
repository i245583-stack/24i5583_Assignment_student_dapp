# Campus Lost & Found dApp

**Student ID:** 24i5583  
**Course:** MG3012 – Blockchain Technology for Business  
**Assignment:** 3 – Building and Deploying Smart Contracts using Truffle & Ganache

## 1. Project Overview

Campus Lost & Found is a decentralised application (dApp) developed using Solidity, Truffle, Ganache, HTML, CSS and JavaScript.

The application allows users to report lost or found items, view submitted reports and mark their own reported items as claimed.

## 2. Technologies Used

- Solidity 0.8.20
- Truffle 5.11.5
- Ganache 7.9.1
- MetaMask
- HTML, CSS and JavaScript
- Ethers.js

## 3. Smart Contract Features

The CampusLostAndFound smart contract includes the following functions:

- `reportItem()` – submits a new lost or found item report.
- `getReportCount()` – returns the total number of reports.
- `getReport()` – retrieves the details of a specific report.
- `markClaimed()` – allows the original reporter to mark their item as claimed.

## 4. Project Setup

Install Node.js, Truffle and Ganache.

Open the project folder in Visual Studio Code and run:

```bash
npm install -g truffle
```

Verify the installation:

```bash
truffle version
```

## 5. Ganache Configuration

Start Ganache and launch the local Ethereum blockchain.

The project uses the following local network configuration:

- Network: Ganache Local
- RPC URL: `http://127.0.0.1:7545`
- Chain ID: `1337`

Connect MetaMask to the Ganache Local network.

## 6. Compilation and Deployment

Run the following commands in the project directory:

```bash
truffle compile
```

To deploy the smart contract:

```bash
truffle migrate --network development
```

The contract was successfully deployed on the local Ganache blockchain.

**Contract Address:**

`0xDF5EBFA72F735168E2F94A3FA6451F2e43F18f6c`

*Note: This is a local Ganache deployment address. It may change when the blockchain is reset and the contract is redeployed.*

## 7. Running the Frontend

Open `index.html` using Visual Studio Code Live Server.

Connect MetaMask using the Ganache Local network.

Users can then:

1. Connect their MetaMask wallet.
2. Submit an item report.
3. Load and view existing reports.
4. Mark their own reports as claimed.

## 8. Testing

The application was tested successfully on the local Ganache blockchain.

The following operations were performed:

- Successful smart contract compilation.
- Successful smart contract deployment using Truffle migrations.
- Successful MetaMask connection.
- Successful submission of an item report.
- Successful retrieval of report details.
- Successful marking of an item as claimed.

## 9. Screenshots

Screenshots demonstrating Ganache setup, successful compilation, smart contract deployment and frontend interaction are included in the `screenshots` folder.

## 10. Conclusion

The project demonstrates the development and deployment of a Solidity smart contract using Truffle and Ganache, together with a frontend interface that interacts with the local blockchain through MetaMask and Ethers.js.