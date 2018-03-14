var LuckToken = require("../libs/luck-token.js");

/**
 * 幸运币服务
 * 
 * @param {[type]} opts [description]
 */
function LuckTokenService(app){
    this.app = app;
    
    this.init();
};

/**
 * 初始化
 * 
 * @return {[type]} [description]
 */
LuckTokenService.prototype.init = function(){
    console.log("LuckTokenService init ...");
};

/**
 * 获取祝福语
 * 
 * @param {} cb 
 */
LuckTokenService.prototype.getLuckToken = function(next){
    var self = this

    var cfg = this.app.cfg;
    var web3 = this.app.getBean("web3");

    var network = cfg.networks[cfg.network];

    if (this.luckToken != null) {
        next(null, this.luckToken);
    } else {
        LuckToken(web3).at(network.address, function(err, instance) {
            if (err) {
                return next(err);
            }

            self.luckToken = instance;
            next(null, instance);
        });
    }
};

module.exports = LuckTokenService;