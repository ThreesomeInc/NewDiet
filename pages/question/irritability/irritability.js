// pages/question/irritability/irritability.js
let util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '您是否有以下过敏症？',
    fetchReport: '查看report',
    parameter: [//奶/蛋/贝壳/虾蟹鱼/面粉/坚果/黄豆/玉米
      {id: 1, key: "milk", checked: false, name: '奶'},
      {id: 2, key: "egg", checked: false, name: '蛋'},
      {id: 3, key: "crostacei", checked: false, name: '贝壳'},
      {id: 4, key: "fish-prawn-crab", checked: false, name: '鱼虾蟹'},
      {id: 5, key: "flour", checked: false, name: '面粉'},
      {id: 6, key: "nuts", checked: false, name: '坚果'},
      {id: 7, key: "soya", checked: false, name: '黄豆'},
      {id: 8, key: "corn", checked: false, name: '玉米'}
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
    app.globalData.userBodyInfo.irritability = [];
  },

  checkboxChange: function (e) {
    console.log(e.detail.value);
    app.globalData.userBodyInfo.irritability = e.detail.value;
    
  },

  sendDataAndSeeReport: function (e) {
    console.log(app.globalData.userBodyInfo);
    //TODO: report data and jump to estimation report
    // wx.navigateTo({
    //   url: '../../question/otherDisease/otherDisease'
    // })
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