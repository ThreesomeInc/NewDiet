// pages/question/nephroticPeriod/nephroticPeriod.js
let util = require('../../../utils/util.js');
const periods = util.range(1, 5);
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '您目前属于肾脏病第几期？',
    nextQuestionText: '下一步 （7/9）',
    periods: periods,
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
    app.globalData.userBodyInfo.nephroticPeriod = this.data.periods[0];
  },

  bindChange: function (e) {
    const val = e.detail.value;
    app.globalData.userBodyInfo.nephroticPeriod = this.data.periods[val[0]];
  },

  goToNextQuestion: function (e) {
    wx.navigateTo({
      url: '../../question/treatmentMethod/treatmentMethod'
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