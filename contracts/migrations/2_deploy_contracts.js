var electionContract = artifacts.require("../contracts/Election");
module.exports = function (deployer) {
  deployer.deploy(electionContract);
};
