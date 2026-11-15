// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CampusLostAndFound {
    struct Report {
        string itemName;
        string description;
        address reporter;
        bool claimed;
    }

    Report[] private reports;

    function reportItem(
        string calldata name,
        string calldata details
    ) external {
        require(bytes(name).length > 0, "Enter item name");
        reports.push(Report(name, details, msg.sender, false));
    }

    function getReportCount() external view returns (uint256) {
        return reports.length;
    }

    function getReport(uint256 index)
        external view
        returns (string memory, string memory, address, bool)
    {
        require(index < reports.length, "Invalid report");
        Report memory r = reports[index];
        return (r.itemName, r.description, r.reporter, r.claimed);
    }

    function markClaimed(uint256 index) external {
        require(index < reports.length, "Invalid report");
        require(reports[index].reporter == msg.sender, "Only reporter");
        reports[index].claimed = true;
    }
}