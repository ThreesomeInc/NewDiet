// pages/logFoodDetail/logFoodDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mealtime: null,
    openId:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.mealtime){
      this.setData({
        mealtime: options.mealtime,
        searchBarTips: '搜索并添加' + options.mealtime +'食材',
        title:{
          headerText: options.mealtime +'吃了啥？',
          subHeader: '坚持完整记录，结果更精确哦',
        }
      })
    };
    if (options.openId) {
      this.setData({
        openId: options.openId,
      })
      console.log(this.data.openId);
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