var app = getApp();

Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        innerText: {
            type: String,
            value: 'default value',
        }
    },
    data: {
        // 这里是一些组件内部数据
        status: "未连接",
        netName : "未配置"
    },
    attached: function() {
        var self = this;

        var netStatusService = app.getBean("netStatusService");
        netStatusService.getWeb3Status(function(err, data){
            self.setData({
                status: data.status,
                netName: data.name
            });
        });
    },

    methods: {
        // 这里是一个自定义方法
        customMethod: function(){}
    }
});