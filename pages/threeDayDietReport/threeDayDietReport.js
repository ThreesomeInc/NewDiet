// pages/threeDayDietReport/threeDayDietReport.js
const app = getApp();
let util = require('../../utils/util.js');
const currentYear = new Date().getFullYear();
const currentMonth = util.formatNumber(new Date().getMonth() + 1);
const currentDate = util.formatNumber(new Date().getDate());
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      headerText: '三日膳食分析',
      subHeader: '您，吃对了吗？',
    },
    standardLog: null,
    elementEvgs: null,
    nutritionRatio: null,
    dieticianAdvice: null,
    headerMapping: {
      totalEnergy: "总能量",
      totalProtein: "总蛋白质",
      peRatio: "优质蛋白比例（建议0.5-0.7)",
      fat: "脂肪",
      feRatio: "脂肪供能比(建议0.25-0.35)",
      cho: "碳水化合物",
      ceRatio: "碳水化合物供能比(建议0.55-0.65）",
      na: "钠 (建议<2000mg/d)",
      k: "钾",
      p: "磷 (建议<800mg/d)",
      ca: "钙 (建议<2000mg/d)"
    },
    hasResult: false,
    basicInfoSummary: [],
    year: currentYear,
    month: currentMonth,
    currentDate: currentDate,
    day: new Date().getDate(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let logDate = options.logDate;
    if (!logDate) {
      logDate = this.data.year + "-" + util.formatNumber(this.data.month) + "-" + util.formatNumber(this.data.currentDate);
    }
    console.log(logDate);
    this.loadReport(logDate);
  },
  loadReport: function (logDate) {
    wx.request({
      url: app.globalData.apiBase + "/foodLog/analysis",
      method: "GET",
      data: {
        openId: app.globalData.authInfo.openid,
        date: logDate,
      },
      success: res => {
        console.log(res.data);
        let result = res.data;
        if (result.standardLog) {
          this.setData({
            standardLog: result.standardLog,
            hasResult: true,
          })
        }
        if (result.elementEvgs) {
          this.setData({
            elementEvgs: result.elementEvgs,
          });
          let nutritionRatio = Object.entries(this.data.elementEvgs)
            .map(item => {
              return {name: this.data.headerMapping[item[0]], value: item[1]}
            });
          this.setData({
            nutritionRatio: nutritionRatio,
          })
        }
        if (result.dieticianAdvice) {
          this.setData({
            dieticianAdvice: result.dieticianAdvice,
          });
          try {
            if (wx.getStorageSync("basicInfoSummary")) {
              this.setData({
                basicInfoSummary: wx.getStorageSync("basicInfoSummary")
              });
              console.log("Session contained basicInfoSummary.");
              console.log(this.data.basicInfoSummary);
            } else {
              console.log("Session does not contained basicInfoSummary.");
            }
          } catch (e) {
            console.log('Exception happen when try to get basicInfoSummary from storage!');
            console.log(e);
          }
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
});