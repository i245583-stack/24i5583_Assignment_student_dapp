
const CONTRACT_ADDRESS = "0xdf5ebfa72f735168e2f94a3fa6451f2e43f18f6c";

const CONTRACT_ABI = [
  "function reportItem(string name, string details) external",
  "function getReportCount() external view returns (uint256)",
  "function getReport(uint256 index) external view returns (string, string, address, bool)",
  "function markClaimed(uint256 index) external"
];

let provider;
let signer;
let contract;

const status = document.getElementById("status");

function showStatus(message) {
  status.textContent = message;
}

async function connectWallet() {
  try {
    if (!window.ethereum) {
      showStatus("Please install MetaMask.");
      return;
    }

    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    // Switch to the Ganache network already added in MetaMask
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x539" }]
    });

    provider = new ethers.BrowserProvider(window.ethereum);

    const network = await provider.getNetwork();

    if (network.chainId !== 1337n) {
      showStatus("Wrong network. Select Ganache Local.");
      return;
    }

    signer = await provider.getSigner();

    contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    document.getElementById("walletStatus").textContent =
      "Connected: " + await signer.getAddress();

    showStatus("Connected to Ganache Local successfully!");

  } catch (error) {
    showStatus(error.shortMessage || error.message);
  }
}

async function reportItem() {
  try {
    if (!contract) {
      showStatus("Please connect your MetaMask wallet first.");
      return;
    }

    const name = document.getElementById("itemName").value.trim();
    const details = document.getElementById("itemDetails").value.trim();

    if (!name || !details) {
      showStatus("Please enter the item name and description.");
      return;
    }

    showStatus("Waiting for transaction confirmation...");

    const transaction = await contract.reportItem(name, details);

    await transaction.wait();

    showStatus("Item report submitted successfully!");

    document.getElementById("itemName").value = "";
    document.getElementById("itemDetails").value = "";

    await loadReports();

  } catch (error) {
    console.error(error);
    showStatus(error.shortMessage || error.message);
  }
}

async function loadReports() {
  try {
    if (!contract) {
      showStatus("Please connect your MetaMask wallet first.");
      return;
    }

    const count = await contract.getReportCount();

    document.getElementById("reportCount").textContent =
      "Total reports: " + count.toString();

    const reportsDiv = document.getElementById("reports");

    reportsDiv.innerHTML = "";

    for (let i = 0; i < Number(count); i++) {
      const report = await contract.getReport(i);

      const card = document.createElement("div");
      card.className = "report";

      const heading = document.createElement("h3");
      heading.textContent =
        "Report #" + (i + 1) + ": " + report[0];

      const description = document.createElement("p");
      description.textContent = report[1];

      const reporter = document.createElement("p");
      reporter.textContent = "Reported by: " + report[2];

      const claimed = document.createElement("p");
      claimed.textContent =
        "Status: " + (report[3] ? "Claimed" : "Unclaimed");

      card.append(heading, description, reporter, claimed);

      const connectedAddress = await signer.getAddress();

      if (
        !report[3] &&
        report[2].toLowerCase() === connectedAddress.toLowerCase()
      ) {
        const button = document.createElement("button");

        button.textContent = "Mark as Claimed";

        button.addEventListener("click", () => markClaimed(i));

        card.appendChild(button);
      }

      reportsDiv.appendChild(card);
    }

    showStatus("Reports loaded successfully!");

  } catch (error) {
    console.error(error);
    showStatus(error.shortMessage || error.message);
  }
}

async function markClaimed(index) {
  try {
    if (!contract) {
      showStatus("Please connect your MetaMask wallet first.");
      return;
    }

    showStatus("Waiting for transaction confirmation...");

    const transaction = await contract.markClaimed(index);

    await transaction.wait();

    showStatus("Item marked as claimed successfully!");

    await loadReports();

  } catch (error) {
    console.error(error);
    showStatus(error.shortMessage || error.message);
  }
}

document.getElementById("connectBtn")
  .addEventListener("click", connectWallet);

document.getElementById("reportBtn")
  .addEventListener("click", reportItem);

document.getElementById("loadBtn")
  .addEventListener("click", loadReports);

// Refresh connection if MetaMask account or network changes.
if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => {
    contract = null;
    signer = null;
    showStatus("Wallet changed. Please reconnect MetaMask.");
  });

  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
}
