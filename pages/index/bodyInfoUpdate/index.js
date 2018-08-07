// pages/index/bodyInfoUpdate/index.js

let util = require('../../../utils/util.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    headerText: '身体资料更新',
    subHeader: '及时更新，获得最精确的膳食推荐',
    updateBodyInfoBtnText: '更新身体资料',
    userBodyInfo: null,
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
      let cachedBodyInfo = app.globalData.userBodyInfo.gender ? app.globalData.userBodyInfo : wx.getStorageSync('userBodyInfo');
      console.log(cachedBodyInfo);
      this.setData({
        userBodyInfo: {
          gender: util.getAliasSingleOption("gender", cachedBodyInfo.gender),
          birth: cachedBodyInfo.birth,
          height: cachedBodyInfo.height,
          weight: cachedBodyInfo.weight,
          sportRate: util.cutMessage(util.getAliasSingleOption("sportRate", cachedBodyInfo.sportRate), 6),
          treatmentMethod: util.getAliasMultiOption("treatmentMethod", cachedBodyInfo.treatmentMethod),
          otherDisease: util.getAliasMultiOption("otherDisease", cachedBodyInfo.otherDisease),
          nephroticPeriod: cachedBodyInfo.nephroticPeriod,
          irritability: util.getAliasMultiOption("irritability", cachedBodyInfo.irritability),
        },
      });
      console.log("Successfully get userBodyInfo.");
      console.log(this.data.userBodyInfo);

    } catch (e) {
      console.log('Exception happen when try to get userBodyInfo from storage!' + e)
    }
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