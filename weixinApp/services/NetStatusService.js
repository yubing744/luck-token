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

    var web3 = this.app.getBean("web3");
    console.log("netStatus web3: %j", web3);

    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
            return console.log(error);
        }

        console.log("accounts:%j", accounts);
    });
};

NetStatusService.prototype.getWeb3Status = function(next){
    var that = this;

    return next(null, {
        status: "已经连接",
        name: "测试网络"
    });
};

module.exports = NetStatusService;