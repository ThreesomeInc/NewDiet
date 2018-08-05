//index.js
//获取应用实例
let sdk = require('../../vendor/wafer2-client-sdk/index');
let util = require('../../utils/util.js');
const app = getApp();

const headerBodyInfo = [{
  header: 'BMI',
  info: '正常',
}, {
  header: '理想的体重',
  info: '50Kg',
}, {
  header: '总热量摄入',
  info: '1615.25',
}, {
  header: '总蛋白摄入',
  info: '49.7',
}];

Page({
  data: {
    motto: '只需九步，了解自己更多',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    slogon1: '知道怎样吃得好又吃的饱?',
    slogon2: '肾脏营养师\n为您规划一日三餐!',
    hasUserBodyInfo: false,
    userBodyInfo: {},
    headerBodyInfo: headerBodyInfo,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToQuestions: function () {
    wx.navigateTo({
      url: '../question/gender/gender'
    })
  },
  onLoad: function () {
    this.login();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  login: function () {
    sdk.setLoginUrl('http://localhost:8081/common/wxLogin');

    if (this.data.logged) return;

    util.showLoading('正在登录');

    const session = sdk.Session.get();

    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      console.log("second time");
      sdk.loginWithCode({
        success: res => {
          wx.setStorageSync('userInfo', res);
          this.setData({userInfo: res, logged: true});
          util.showSuccess('登录成功')
        },
        fail: err => {
          console.error(err);
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      sdk.login({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({userInfo: res, logged: true});
          util.showSuccess('登录成功')
        },
        fail: err => {
          console.error(err);
          util.showModel('登录错误', err.message)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      this.data.userBodyInfo = wx.getStorageSync('userBodyInfo')
      if (this.data.userBodyInfo) {
        this.setData({
          hasUserBodyInfo: true,
          headerBodyInfo: app.globalData.basicInfoSummary
        })
        console.log("Session contained userBodyInfo.");
        console.log(this.data.userBodyInfo);
      }
    } catch (e) {
      console.log('Exception happen when try to get userBodyInfo from storage!')
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
