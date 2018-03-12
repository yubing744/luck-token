var app = getApp();

Component({
    data: {
        status: "未连接"
    },
    attached: function() {
        var self = this;

        var netStatusService = app.getBean("netStatusService");
        netStatusService.getWeb3Status(function(err, data){
            self.setData({
                status: data.status
            });
        });
    }
});