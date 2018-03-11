var sign = require('ethjs-signer').sign;
var SignerProvider = require('ethjs-provider-signer');

// fix 
SignerProvider.prototype.send = function(payload){
  throw new Error('Web3ProviderEngine does not support synchronous requests.')
};

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
      network_id: "*", // Match any network id
      gas: 3000000,
      provider: function() {
        var account = "0x2f0d43336867E2e4AaFF22C1bC4BCc46e7d5DA2b";
        var privateKey = "0x32f4ce3c17d67c5b21ab7fdf121e9bc6c8c86f60c87261c0b63dd569fb152ac2";

        return new SignerProvider("https://eth-test.kuick.cn", {
          signTransaction: (rawTx, cb) => cb(null, sign(rawTx, privateKey)),
          accounts: (cb) => cb(null, [account]),
        });
      }
    }
  }
};
