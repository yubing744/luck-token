/**
 * 微信用户管理器
 * 
 * @param {[type]} opts [description]
 */
function WeixinUserService(){
    //EventEmitter.call(this);
    this.init();
};

// 继承 EventEmitter
//util.inherits(WeixinUserService, EventEmitter);

/**
 * 初始化
 * 
 * @return {[type]} [description]
 */
WeixinUserService.prototype.init = function(){
    console.log("WeixinUserService init ...");
};

WeixinUserService.prototype.getUserInfo = function(cb){
    var that = this

    if(this.userInfo){
        typeof cb == "function" && cb(this.userInfo)
    } else {
        //调用登录接口
        wx.login({
            success: function () {
                wx.getUserInfo({
                    success: function (res) {
                        that.userInfo = res.userInfo
                        typeof cb == "function" && cb(that.userInfo)
                    }
                });
            }
        })
    }
};

module.exports = WeixinUserService;