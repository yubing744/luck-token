module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gas: 6600000
    },
    test: {
      host: "test.kuick.cn",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
