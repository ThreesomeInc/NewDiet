// pages/suggestDiet/recipeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipeList: [],//for all data return from server
    recipeListView: [],//for page filtering only
    recipeType: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      recipeType: options.recipeType
    });
    if (this.data.recipeType) {
      wx.showLoading({
        title: "正在加载食谱信息...",
        mask: true
      });
      wx.request({
        url: app.globalData.apiBase + "/recipe/" + options.recipeType + "/" + options.subKey,
        method: "GET",
        header: {
          "Content-Type": "application/json"
        },
        dataType: "json",
        success: res => {
          wx.hideLoading();
          console.log(res);
          that.setData({
            recipeList: res.data.recipeList,
            recipeListView: res.data.recipeList
          });
        },
        fail: res => {
          wx.hideLoading();
          console.log(res);
        }
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