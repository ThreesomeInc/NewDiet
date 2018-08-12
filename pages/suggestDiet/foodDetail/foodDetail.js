// pages/foodDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodCode: null,
    foodInfo: {
      imageUrl: 'https://kidneyhealty.com.cn/images/1.jpg',
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      foodCode: options.foodCode
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
    wx.showLoading({
      title: "正在加载商品信息...",
      mask: true
    });
    if (this.data.foodCode) {
      let that = this;
      wx.request({
        url: "https://kidneyhealty.com.cn/food/detail",
        data: {
          "foodCode": this.data.foodCode
        },
        method: "GET",
        header: {
          "Content-Type": "application/json"
        },
        dataType: "json",
        success: res => {
          wx.hiddenLoading();
          that.setData({
            foodInfo: res.detail
          });
        },
        fail: res => {
          wx.hiddenLoading();
        }
      });
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