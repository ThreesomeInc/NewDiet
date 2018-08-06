// pages/question/otherDisease/otherDisease.js
let util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '是否有其他併发疾病：',
    nextQuestionBtnText: '下一步 （9/9）',
    updateValueBtnText: '确认更新并返回',
    parameter: [//高血压/高血脂（甘油三酯/胆固醇/both）/高血糖/高尿酸/无
      { id: 1, key: "hypertension", checked: false, name: '高血压'},
      { id: 2, key: "triglyceride", checked: false, name: '高甘油三酯'},
      { id: 3, key: "cholesterol", checked: false, name: '高胆固醇' },
      { id: 4, key: "hyperglycemia", checked: false, name: '高血糖'},
      { id: 5, key: "hyperuricacidemia", checked: false, name: '高尿酸'}
    ],
    postUpdate: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.postUpdate != 'false') {
      this.setData({
        postUpdate: true,
      });
    }
    console.log(this.data.postUpdate);

    if (app.globalData.logoUrl) {
      this.setData({
        logoUrl: app.globalData.logoUrl
      })
    }
    app.globalData.userBodyInfo.otherDisease = [];
  },

  checkboxChange: function (e) {
    const val = e.detail.value;
    app.globalData.userBodyInfo.otherDisease = e.detail.value;
  },

  goToNextQuestion: function (e) {
    console.log(app.globalData.userBodyInfo);
    wx.navigateTo({
      url: '../../question/irritability/irritability?postUpdate=false'
    })
  },

  updateValue: function (e) {
    console.log(app.globalData.userBodyInfo);
    try {
      wx.setStorageSync('userBodyInfo', app.globalData.userBodyInfo);
      console.log('userBodyInfo is updated.');
    } catch (e) {
      console.log('Exception happen when try to get userBodyInfo from storage!')
    };
    wx.navigateBack({
      delta: -1
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