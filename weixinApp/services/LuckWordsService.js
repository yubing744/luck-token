/**
 * 祝福语服务
 * 
 * @param {[type]} opts [description]
 */
function LuckWordsService(app){
    this.app = app;

    this.init();
};

/**
 * 初始化
 * 
 * @return {[type]} [description]
 */
LuckWordsService.prototype.init = function(){
    console.log("LuckBlessService init ...");
};

/**
 * 监听祝福事件
 * 
 * @param {} cb 
 */
LuckWordsService.prototype.watchBless = function(watcher){
    var that = this

    var luckTokenService = this.app.getBean("luckTokenService");
    luckTokenService.getLuckToken(function(err, luckToken){
        if (err) {
            return console.log("error in get luckToken:", err);
        }

        luckToken.Bless({odd: true}, watcher);
    });
};

/**
 * 获取祝福语
 * 
 * @param {} cb 
 */
LuckWordsService.prototype.getBlesses = function(next){
    var that = this

    var luckTokenService = this.app.getBean("luckTokenService");
    luckTokenService.getLuckToken(function(err, luckToken){
        if (err) {
            return console.log("error in get luckToken:", err);
        }

        next(null, [
            "Hello Words!",
            "你好",
            "Hello Words!",
            "你好",
            "Hello Words!",
            "你好",
            "Hello Words!",
            "你好",
            "Hello Words!",
            "你好",
            "Hello Words!",
            "你好",
            "Hello Words!",
            "你好"
        ]);
    });
};

module.exports = LuckWordsService;