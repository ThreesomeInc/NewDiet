// pages/question/treatmentMethod/treatmentMethod.js
let util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '目前治疗方式是：',
    nextQuestionText: '下一步 （8/9）',
    parameter: [
      { id: 1, key: "medication", checked: false, name: '药物治疗'},
      { id: 2, key: "hemodialysis", checked: false, name: '血液透析治疗'},
      { id: 3, key: "peritoneal-dialysis", checked: false, name: '腹膜透析治疗'},
      { id: 4, key: "transplantation", checked: false, name: '肾脏移植'}
    ],
    value: [1]
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
    app.globalData.userBodyInfo.treatmentMethod = [];
  },

  checkboxChange: function (e) {
    console.log(e.detail.value);
    app.globalData.userBodyInfo.treatmentMethod = e.detail.value;
  },

  goToNextQuestion: function (e) {
    console.log(app.globalData.userBodyInfo);
    wx.navigateTo({
      url: '../../question/otherDisease/otherDisease'
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