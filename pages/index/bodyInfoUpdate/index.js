// pages/index/bodyInfoUpdate/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    headerText: '身体资料更新',
    subHeader: '及时更新，获得最精确的膳食推荐',
    updateBodyInfoBtnText: '更新身体资料',
    userBodyInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      app.globalData.userBodyInfowx.getStorageSync('userBodyInfo');
    } catch (e) {
      console.log('Exception happen when try to get userBodyInfo from storage!')
    }
    console.log(app.globalData.userBodyInfo);
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
    const that = this;
    try {
        this.setData({
          userBodyInfo: app.globalData.userBodyInfo,
        })
      console.log("Successfully get userBodyInfo.");
      console.log(this.data.userBodyInfo);

    } catch (e) {
      console.log('Exception happen when try to get userBodyInfo from storage!')
    };
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