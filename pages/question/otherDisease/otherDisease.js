// pages/question/otherDisease/otherDisease.js
let util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '是否有其他併发疾病：',
    nextQuestionText: '下一步 （9/9）',
    parameter: [//高血压/高血脂（甘油三酯/胆固醇/both）/高血糖/高尿酸/无
      { id: 1, key: "hypertension", checked: false, name: '高血压'},
      { id: 2, key: "triglyceride", checked: false, name: '高甘油三酯'},
      { id: 3, key: "cholesterol", checked: false, name: '高胆固醇' },
      { id: 4, key: "hyperglycemia", checked: false, name: '高血糖'},
      { id: 5, key: "hyperuricacidemia", checked: false, name: '高尿酸'}
    ],
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
    app.globalData.userBodyInfo.otherDisease = [this.data.parameter[0].key];
  },

  bindChange: function (e) {
    const val = e.detail.value;
    app.globalData.userBodyInfo.otherDisease = this.data.parameter[val[0]].key;
  },

  goToNextQuestion: function (e) {
    console.log(app.globalData.userBodyInfo);
    wx.navigateTo({
      url: '../../question/irritability/irritability'
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