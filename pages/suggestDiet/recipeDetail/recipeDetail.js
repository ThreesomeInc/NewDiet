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
        data: {
          "openId": app.globalData.authInfo.openid
        },
        method: "GET",
        header: {
          "Content-Type": "application/json"
        },
        dataType: "json",
        success: res => {
          wx.hideLoading();
          console.log(res);
          if (res.data.preference !== undefined) {
            this.data.preferenceMap.forEach(item => {
              item.default_checked = (+item.key === res.data.preference);
            });
          }
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
            preferenceMap: this.data.preferenceMap,
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

  updatePreference: function (e) {
    let preference = e.detail.value;
    console.log(preference);
    let recipeCode = this.data.recipeCode;
    wx.request({
      url: "https://kidneyhealty.com.cn/recipe/preference",
      data: {
        "userId": app.globalData.authInfo.openid,
        "recipeId": recipeCode,
        "preference": preference,
      },
      method: "POST",
      header: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: res => {
        if (res.data.status === 500) {
          wx.showModal({
            title: res.data.message,
            status: "fail"
          })
        } else {
          console.log("Successfully post preference to backend")
        }
      },
      fail: res => {
      }
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