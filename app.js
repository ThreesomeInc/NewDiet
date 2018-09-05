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
    this.initCategories();
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
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.apiBase + "/common/wxLogin",
          method: "GET",
          header: header,
          dataType: "json",
          success: (result) => {
            wx.hideLoading();
            wx.setStorageSync('skey', result.data.session_key);
            wx.setStorageSync('openid', result.data.openid);
            util.showSuccess('登录后台成功');
            console.log(this.globalData);
            this.globalData.authInfo.skey = result.data.session_key;
            this.globalData.authInfo.openid = result.data.openid;
            // 获取用户信息
            wx.getSetting({
              success: res2 => {
                if (res2.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res3 => {
                      console.log(res3);
                      if (res3.iv && res3.encryptedData) {
                        wx.request({
                          url: this.globalData.apiBase + "/common/decrypt",
                          method: "GET",
                          header: {
                            iv: res3.iv,
                            encryptedData: res3.encryptedData,
                            appId: "wxd7b407ad92867db4",
                            skey: result.data.session_key
                          },
                          dataType: "json",
                          success: (result2) => {

                          },

                          fail: (result2) => {
                            wx.hideLoading();
                            util.showModel('登录后台错误', result2.msg)
                          },
                        });
                      }
                      // 可以将 res 发送给后台解码出 unionId
                      this.globalData.userInfo = res3.userInfo;

                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res3)
                      }
                    }
                  })
                }
              }
            });
          },

          fail: (result) => {
            wx.hideLoading();
            util.showModel('登录后台错误', result.msg)
          },
        });
      }
    });
  },
  initCategories: function () {
    wx.request({
      url: this.globalData.apiBase + "/recipe",
      method: "GET",
      success: res => {
        this.globalData.recipeTypes = res.data.recipeTypes;
      },
      fail: res => {
        util.showModel('获取食谱分类错误', result.msg)
      }
    });
    wx.request({
      url: this.globalData.apiBase + "/recipe/mealtime",
      method: "GET",
      success: res => {
        this.globalData.mealtime = res.data.recipeTypeList;
      },
      fail: res => {
        util.showModel('获取分类错误', result.msg)
      }
    });
    wx.request({
      url: this.globalData.apiBase + "/food/type",
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
        util.showModel('获取食材分类错误', result.msg)
      },
    });
  },
  globalData: {
    authInfo: {
      skey: null,
      openid: null
    },
    mealtime: [],
    foodTypeList: null,
    recipeTypes: null,
    userInfo: null,
    apiBase: "https://kidneyhealty.com.cn",
    imageBasePath: 'https://kidneyhealty.com.cn/images/',
    logoUrl: 'https://kidneyhealty.com.cn/images/Diet_logo.png',
    userBodyInfo: null,
    basicInfoSummary: [],
    suggestedNutrition: [],
    advice: '',
    slogan: ''
  }
});
