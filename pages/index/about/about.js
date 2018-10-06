// pages/index/about/about.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:{
      headerText: '关于肾脏营养师',
      subHeader: 'v1.0.0',
    },
    content: '以迅雷不及掩耳盗铃儿响叮当之势，肾脏营养师面世啦。这里有最智能的膳食建议，全面的饮食分析，务求令你吃得饱又吃得好！',
    logoUrl: '',
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