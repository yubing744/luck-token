//index.js
//获取应用实例
var app = getApp()

Page({
    data: {
        blesses: []
    },
    //事件处理函数
    touchstart: function() {
      
    },
    touchend: function(){
      
    },

    onLoad: function () {
        var self = this

        var luckBlessService = app.getBean("luckBlessService");

        //调用应用实例的方法获取全局数据
        luckBlessService.getBlesses(function(err, blesses){
            //更新数据
            self.setData({
                blesses: blesses
            });
        })
    }
})
