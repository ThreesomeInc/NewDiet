// pages/question/height/height.js
let util = require('../../../utils/util.js');
const heights = util.range(100, 230);
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '您的身高是？',
    nextQuestionText: '下一步 （4/9）',
    heights: heights,
    value: [parseInt(heights.length / 2)],
    logoUrl: ''
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
    app.globalData.userBodyInfo.height = "165cm";
  },

  bindChange: function (e) {
    const val = e.detail.value;
    app.globalData.userBodyInfo.height = this.data.heights[val[0]] + "cm";
    console.log(app.globalData.userBodyInfo.height);
  },

  goToNextQuestion: function (e) {
    wx.navigateTo({
      url: '../../question/weight/weight'
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