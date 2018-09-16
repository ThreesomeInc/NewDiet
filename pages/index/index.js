//index.js
//获取应用实例
let sdk = require('../../vendor/wafer2-client-sdk/index');
let util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    motto: '只需九步，了解自己更多',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    slogon1: '知道怎样吃得好又吃的饱?',
    slogon2: '肾脏营养师\n为您规划一日三餐!',
    hasUserBodyInfo: false,
    basicInfoSummary:[],
    menu: {
      menuList:[
      {
          iconUrl: app.globalData.imageBasePath+'tips_icon.png',
        menuName:'膳食结构建议',
        directUrl:'../summary/summary',
          rightImageUrl: app.globalData.imageBasePath +'rightArrow.png',
      },
      {
        iconUrl: app.globalData.imageBasePath +'setting_icon.png',
        menuName: '更新我的身体资料',
        directUrl: 'bodyInfoUpdate/index',
        rightImageUrl: app.globalData.imageBasePath +'rightArrow.png',
      },
      {
        iconUrl: app.globalData.imageBasePath +'authentication_icon.png',
        menuName: '授权设置',
        directUrl: 'authentication/authentication',
        rightImageUrl: app.globalData.imageBasePath +'rightArrow.png',
      },
      {
        iconUrl: app.globalData.imageBasePath +'about_icon.png',
        menuName: '关于肾脏营养师',
        directUrl: 'about/about',
        rightImageUrl: app.globalData.imageBasePath +'rightArrow.png',
      },
    ]},
  },
  //事件处理函数
  goToQuestions: function () {
    wx.navigateTo({
      url: '../question/gender/gender?postUpdate=false'
    })
  },
  onLoad: function () {
    if (app.globalData.logoUrl) {
      this.setData({
        logoUrl: app.globalData.logoUrl
      })
    }
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
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
      wx.navigateTo({
        url: '../question/gender/gender?postUpdate=false'
      })
    }
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    }
    try {
      var info= wx.getStorageSync('userBodyInfo');
      if (info != "") {
        this.setData({
          hasUserBodyInfo: true,
        });
        app.globalData.userBodyInfo = info;
        console.log("Session contained userBodyInfo.");
        console.log(app.globalData.userBodyInfo);
      }else{
        this.setData({
          hasUserBodyInfo: false,
        });
      }
      if (wx.getStorageSync("basicInfoSummary")) {
        this.setData({
          basicInfoSummary: wx.getStorageSync("basicInfoSummary")
        })
        console.log("Session contained basicInfoSummary.");
        console.log(this.data.basicInfoSummary);
      }
    } catch (e) {
      console.log('Exception happen when try to get userBodyInfo from storage!');
      console.log(e);
      this.setData({
        hasUserBodyInfo: false,
      });
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    if(e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo;
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }else{
      console.log('User reject the authentication');
    }
    
  }
})
