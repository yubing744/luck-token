/**
 * 祝福语服务
 * 
 * @param {[type]} opts [description]
 */
function LuckBlessService(){
    this.init();
};

/**
 * 初始化
 * 
 * @return {[type]} [description]
 */
LuckBlessService.prototype.init = function(){
    console.log("LuckBlessService init ...");
};

/**
 * 获取祝福语
 * 
 * @param {} cb 
 */
LuckBlessService.prototype.getBlesses = function(next){
    var that = this

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
};

module.exports = LuckBlessService;