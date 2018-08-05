// pages/summary/summary.js
const app = getApp();

const headerBodyInfo = [{
  header: 'BMI',
  info: '正常',
}, {
  header: '理想体重',
  info: '50Kg',
}, {
  header: '目标热量摄入',
  info: '1615.25',
}, {
  header: '目标蛋白摄入',
  info: '49.7',
}];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userBodyInfo: {},
    goBackMain: '返回主程序',
    goShare: '好东西齐分享',
    headerBodyInfo: headerBodyInfo,
    reportHeader: '您的身体报告',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      this.data.userBodyInfo = wx.getStorageSync('userBodyInfo')
      if (this.data.userBodyInfo) {
        console.log(this.data.userBodyInfo);
      }
    } catch (e) {
      console.log('Exception happen when try to get userBodyInfo from storage!')
    }
  },

  goBackMain: function (e) {
    wx.navigateBack({
      delta: 10
    })
  },

  goShare: function (e) {
    wx.redirectTo({
      url: 'share/share'
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