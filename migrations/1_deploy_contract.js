const CampusLostAndFound = artifacts.require("CampusLostAndFound");

module.exports = function (deployer) {
    deployer.deploy(CampusLostAndFound);
};