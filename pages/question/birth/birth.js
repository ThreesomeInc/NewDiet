// pages/question-sex/question-sex.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

var app = getApp()
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
    value: [9999, 1, 1],
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
    app.globalData.userBodyInfo.birth = "2018-2-2";
  },

  bindChange: function (e) {
    const val = e.detail.value;
    app.globalData.userBodyInfo.birth = this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]];
  },

  goToNextQuestion: function (e) {
    wx.navigateTo({
      url: '../../question/birth/birth'
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