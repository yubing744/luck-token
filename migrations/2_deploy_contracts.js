var LuckToken = artifacts.require("LuckToken.sol");

module.exports = function(deployer) {
    deployer.deploy(LuckToken);
}