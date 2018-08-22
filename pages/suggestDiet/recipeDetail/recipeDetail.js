// pages/suggestDiet/recipeDetail/recipeDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipeCode: null,
    recipeInfo: null,
    recipe_composition: null,
    preferenceMap: [
      {key: "1", value: "不喜欢"},
      {key: "2", value: "马马马虎虎"},
      {key: "3", value: "超爱吃的"},
    ],
    hasUserBodyInfo: false,
    motto: '只需九步，了解自己更多',
    slogon2: '记录身体信息\n获得营养师更有针对性的推荐',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userBodyInfo !== null) {
      this.setData({
        hasUserBodyInfo: true
      })
    }
    let that = this;
    this.setData({
      recipeCode: options.recipeCode
    });
    if (this.data.recipeCode) {
      wx.showLoading({
        title: "正在加载食谱信息...",
        mask: true
      });
      wx.request({
        url: "https://kidneyhealty.com.cn/recipe/detail/" + options.recipeCode,
        method: "GET",
        header: {
          "Content-Type": "application/json"
        },
        dataType: "json",
        success: res => {
          wx.hideLoading();
          console.log(res);
          let recipeInfo = res.data;
          recipeInfo.label = [
            `类别：${recipeInfo.category}`,
            `难度：${recipeInfo.difficulty}`,
            `风味：${recipeInfo.taste}`,
            `烹饪方式：${recipeInfo.cookMethod}`,
          ];
          let recipe_composition = recipeInfo.mainIngredients;
          that.setData({
            recipeInfo: recipeInfo,
            recipe_composition: recipe_composition,
          });
        },
        fail: res => {
          wx.hideLoading();
          console.log(res);
        }
      })
    }
  },

  onFoodTap: function (e) {
    wx.navigateTo({
      url: '../foodDetail/foodDetail?foodCode=' + e.currentTarget.dataset.foodCode
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
});