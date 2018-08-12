//app.js
let util = require('utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    let bodyInfo = wx.getStorageSync('userBodyInfo');
    if (bodyInfo) {
      this.globalData.userBodyInfo = bodyInfo;
    }
    wx.request({
      url: "https://kidneyhealty.com.cn/food/type",
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      dataType: "json",
      success: (result) => {
        console.log("foodTypeList:" + result.data.foodTypeList);
        this.globalData.foodTypeList = result.data.foodTypeList;

      },

      fail: (result) => {
        util.showModel('登录错误', result.msg)
      },
    });
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        wx.setStorageSync('wx_code', res.code);
        const header = {
          "X-WX-Code": res.code
        };
        wx.showLoading({
          title: "登录中...",
          mask: true
        });
        wx.request({
          url: "https://kidneyhealty.com.cn/common/wxLogin",
          method: "GET",
          header: header,
          dataType: "json",
          success: (result) => {
            wx.hideLoading();
            wx.setStorageSync('skey', result.data.session_key);
            wx.setStorageSync('openid', result.data.openid);
            util.showSuccess('登录成功');
            console.log(this.globalData);
            this.globalData.authInfo.skey = result.data.session_key;
            this.globalData.authInfo.openid = result.data.openid;
          },

          fail: (result) => {
            wx.hideLoading();
            util.showModel('登录错误', result.msg)
          },
        });
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    authInfo: {
      skey: null,
      openid: null
    },
    foodTypeList: null,
    userInfo: null,
    logoUrl: '../../../images/diet_big_logo.png',
    userBodyInfo: {},
    basicInfoSummary: [],
    suggestedNutrition: [],
    advice: '',
    slogan: ''
  }
});