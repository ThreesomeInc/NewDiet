// pages/question-sex/question-sex.js
let util = require('../../../utils/util.js');
const date = new Date();
const years = util.range(1990, date.getFullYear());
const months = util.range(1, 12);
const days = util.range(1, 31);

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    question: '您的生日是：',
    nextQuestionText: '下一步 （3/9）',
    logoUrl: '',
    years: years,
    months: months,
    days: days,
    value: [9999, 0, 0],
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

    console.log(app.globalData.userBodyInfo);
    app.globalData.userBodyInfo.birth = "2018-01-01";
  },

  bindChange: function (e) {
    const val = e.detail.value;
    let year = this.data.years[val[0]];
    let month = this.data.months[val[1]];
    this.setData({
      days: util.range(1, new Date(year, month, 0).getDate())
    });
    let day = this.data.days[val[2]];
    app.globalData.userBodyInfo.birth = [year, util.pad(month, 2), util.pad(day, 2)].join('-');
  },

  goToNextQuestion: function (e) {
    wx.navigateTo({
      url: '../../question/height/height'
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
});