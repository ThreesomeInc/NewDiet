// pages/threeDayDietReport/threeDayDietReport.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      headerText: '三日膳食分析',
      subHeader: '您，吃对了吗？',
    }, 
    logTypeInfo: null,
    elementEvgs: null,
    dieticianAdvice:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.apiBase + "/foodLog/analysis",
      method: "GET",
      data: {
        openId: app.globalData.authInfo.openid,
      },
      success: res => {
        console.log(res.data);
        var result = res.data;
        if (result.logTypeInfo){
          this.setData({
            logTypeInfo: result.logTypeInfo,
          })
        }
        if (result.elementEvgs) {
          this.setData({
            elementEvgs: result.elementEvgs,
          })
        }
        if (result.dieticianAdvice) {
          this.setData({
            dieticianAdvice: result.dieticianAdvice,
          })
        }
          

        
      },
      fail: res => {
        wx.showToast({
          title: res,
          icon: 'success'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})