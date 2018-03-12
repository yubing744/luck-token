var Web3 = require("../libs/web3");
var WxHttpProvider = require("../libs/wx-http-privider");

/**
 * Web3配置管理器
 * 
 * @param {[type]} opts [description]
 */
function Web3ConfigService(app){
    this.app = app;
    this.config();
};

/**
 * 初始化
 * 
 * @return {[type]} [description]
 */
Web3ConfigService.prototype.config = function(){
    console.log("Web3ConfigService init ...");
    var cfg = this.app.cfg;
    var web3 = this.app.getBean("web3");

    var network = cfg.networks[cfg.network];
    console.log("Web3 network config: %j", network);

    var web3Provider = new WxHttpProvider(network.url);
    web3.setProvider(web3Provider);
};

module.exports = Web3ConfigService;