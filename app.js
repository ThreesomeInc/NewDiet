//app.js
let util = require('utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res);
        wx.setStorageSync('wx_code', res.code);
        const header = {
          "X-WX-Code": res.code
        };
        wx.request({
          url: "http://173.254.228.220:8081/common/wxLogin",
          method: "GET",
          header: header,
          dataType: "json",
          success: (result) => {
            wx.setStorageSync('skey', result.data.session_key);
            wx.setStorageSync('openid', result.data.openid);
            util.showSuccess('登录成功');
            console.log(this.globalData);
            this.globalData.authInfo.skey = result.data.session_key;
            this.globalData.authInfo.openid = result.data.openid;
          },

          fail: (result) => {
            util.showModel('登录错误', result.message)
          },
        });
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
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
    userInfo: null,
    logoUrl: 'http://wiki.saraqian.com/wp-content/uploads/2018/08/diet_big_logo.png',
    userBodyInfo: {
      gender: '',
      birth: '',
      height: '',
      weight: '',
      sportRate: '',
      nephroticPeriod: '',
      treatmentMethod: '',
      otherDisease: [],
      irritability: []
    },
    basicInfoSummary:[],
    suggestedNutrition: {},
    advice:'',
    slogan:''
  }
});