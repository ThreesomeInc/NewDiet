// pages/question/weight/weight.js
let util = require('../../../utils/util.js');
const weightsInteger = util.range(30, 100);
const weightsFraction = util.range(0, 9);
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '您的体重是：',
    nextQuestionText: '下一步 （5/9）',
    weightsInteger: weightsInteger,
    weightsFraction: weightsFraction,
    value: [parseInt(weightsInteger.length / 2) - 10, 0]
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
    app.globalData.userBodyInfo.weight = this.data.weightsInteger[this.data.value[0]] +
      "." + this.data.weightsFraction[this.data.value[1]] + "kg";
  },

  bindChange: function (e) {
    const val = e.detail.value;
    app.globalData.userBodyInfo.weight = this.data.weightsInteger[val[0]] +
      "." + this.data.weightsFraction[val[1]] + "kg";
    console.log(app.globalData.userBodyInfo.weight);
  },

  goToNextQuestion: function (e) {
    console.log(app.globalData.userBodyInfo);
    wx.navigateTo({
      url: '../../question/sportRate/sportRate'
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