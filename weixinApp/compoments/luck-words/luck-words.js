var app = getApp();

Component({
    data: {
        blesses: []
    },
    attached: function() {
        var self = this;

        var luckWordsService = app.getBean("luckWordsService");

        //调用应用实例的方法获取全局数据
        luckWordsService.getBlesses(function(err, blesses){
            //更新数据
            self.setData({
                blesses: blesses
            });
        })
    }
});