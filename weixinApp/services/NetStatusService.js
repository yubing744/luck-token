/**
 * 微信用户管理器
 * 
 * @param {[type]} opts [description]
 */
function NetStatusService(app){
    this.app = app;
    this.init();
};

/**
 * 初始化
 * 
 * @return {[type]} [description]
 */
NetStatusService.prototype.init = function(){
    console.log("NetStatusService init ...");
};

NetStatusService.prototype.getWeb3Status = function(next){
    var web3 = this.app.getBean("web3");
    console.log("netStatus web3: %j", web3);

    web3.eth.getBlockNumber(function(error, blockNumber) {
        if (error) {
            return next(null, {
                status: "连接失败",
            });
        }

        return next(null, {
            status: "已经连接",
        });
    });
};

module.exports = NetStatusService;