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
    this.bindNetworkChangeRefresh();
    this.wxLogin();
  },
  wxLogin: function () {
    return new Promise((resolve, reject) => {

      wx.login({
        success: res => {
          console.log(res);
          wx.setStorageSync('wx_code', res.code);
          const header = {
            "X-WX-Code": res.code
          };
          console.log("登录中...");
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: this.globalData.apiBase + "/common/wxLogin",
            method: "GET",
            header: header,
            dataType: "json",
            complete: res => {
              wx.hideLoading();
            },
            success: resolve,

            fail: reject,
          });
        }
      });
    }).then((result) => {
      wx.setStorageSync('skey', result.data.session_key);
      wx.setStorageSync('openid', result.data.openid);
      console.log("登录后台成功");
      // util.showSuccess('登录后台成功');
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
                    complete: res => {
                      wx.hideLoading();
                    },
                    success: (result2) => {

                    },

                    fail: (result2) => {
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
    }, (result) => {
      util.showModel('登录后台错误', result.errMsg)
    });
  },
  bindNetworkChangeRefresh: function () {
    util.networkTypePromise()
      .then((isConnected) => this.globalData.isNetworkConnected = isConnected)
      .catch((isConnected) => this.globalData.isNetworkConnected = isConnected);
    wx.onNetworkStatusChange(res => {
      if (res.networkType === 'none') {
        this.globalData.isNetworkConnected = false;
        wx.showToast({
          title: '当前没有网络!',
          mask: true,
          icon: "loading",
          duration: 1000
        });
      } else if (res.isConnected) {
        if (!this.globalData.isNetworkConnected) {
          let networkResumeCallback = () => {
            let curpage = util.getCurrentPageUrlWithArgs();
            wx.reLaunch({
              url: "/" + curpage
            });
            this.globalData.isNetworkConnected = true;
          };
          let promiseList = [];
          if (!this.globalData.authInfo.openid) {
            promiseList.push(this.wxLogin());
          }
          if (this.globalData.mealtime.length === 0 ||
            !this.globalData.foodTypeList ||
            !this.globalData.recipeTypes) {
            promiseList.push(this.initCategories());
          }
          if (promiseList.length !== 0) {
            Promise.all(promiseList)
              .then(networkResumeCallback, () => {
              });
          } else {
            networkResumeCallback();
          }
        }
      } else {// for Android Unknown status
        this.globalData.isNetworkConnected = false;
        wx.showToast({
          title: '网络情况异常!',
          image: this.globalData.imageBasePath + "/public/error.png",
          mask: true,
          duration: 1000
        });
      }
    })
  },
  initCategories: function () {
    return Promise.all([
      util.request(this.globalData.apiBase + "/recipe")
        .then((res) => {
          this.globalData.recipeTypes = res.data.recipeTypes;
        }, (res) => {
          util.showModel('获取食谱分类错误', res.errMsg)
        }),
      util.request(this.globalData.apiBase + "/recipe/mealtime")
        .then((res) => {
          this.globalData.mealtime = res.data.recipeTypeList;
        }, (res) => {
          util.showModel('获取分类错误', res.errMsg)
        }),
      util.request(this.globalData.apiBase + "/food/type", {}, {
        "Content-Type": "application/json"
      })
        .then((result) => {
          console.log("foodTypeList:" + result.data.foodTypeList);
          this.globalData.foodTypeList = result.data.foodTypeList;
        }, (result) => {
          util.showModel('获取食材分类错误', result.errMsg)
        }),
    ]).then(() => {
      wx.hideLoading();
    });
  },
  globalData: {
    authInfo: {
      skey: null,
      openid: null
    },
    mealtime: [],
    isNetworkConnected: true,
    foodTypeList: null,
    recipeTypes: null,
    userInfo: null,
    apiBase: "https://www.kidneyhealty.com.cn",
    imageBasePath: 'https://www.kidneyhealty.com.cn/images/',
    logoUrl: 'https://www.kidneyhealty.com.cn/images/Diet_logo.png',
    userBodyInfo: null,
    basicInfoSummary: [],
    suggestedNutrition: [],
    advice: '',
    slogan: ''
  }
});
