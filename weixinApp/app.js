var Web3 = require("./libs/web3");
var Web3ConfigService = require("./services/Web3ConfigService");
var WeixinUserService = require("./services/WeixinUserService");
var NetStatusService = require("./services/NetStatusService");
var LuckBlessService = require("./services/LuckBlessService");

//app.js
App({
    globalData:{
        beans: {}
    },
    onLaunch: function () {
      //调用API从本地缓存中获取数据
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      this.init();
    },
    init: function() {
        this.globalData.window = window;

        this.registerBean("web3", new Web3());
        this.registerBean("web3ConfigService", new Web3ConfigService(this));
        this.registerBean("weixinUserService", new WeixinUserService(this));
        this.registerBean("netStatusService", new NetStatusService(this));
        this.registerBean("luckBlessService", new LuckBlessService(this));
    },
    registerBean: function(name, instance) {
        this.globalData.beans[name] = instance;
    },
    getBean: function(beanName) {
        return this.globalData.beans[beanName];
    }
});