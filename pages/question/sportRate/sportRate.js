// pages/question/sportRate/sportRate.js
let util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '请问您从事体力活动是：',
    nextQuestionText: '下一步 （6/9）',
    parameter: [
      {id: 1, key: "light", name: '轻度'},
      {id: 2, key: "medium", name: '中度'},
      {id: 3, key: "severe", name: '重度'}
    ],
    value: [0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.logoUrl) {
      this.setData({
        logoUrl: app.globalData.logoUrl
      })
    }
    app.globalData.userBodyInfo.sportRate = this.data.parameter[0].key;
  },

  bindChange: function (e) {
    const val = e.detail.value;
    app.globalData.userBodyInfo.sportRate = this.data.parameter[val[0]].key;
  },

  goToNextQuestion: function (e) {
    wx.navigateTo({
      url: '../../question/nephroticPeriod/nephroticPeriod'
    })
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