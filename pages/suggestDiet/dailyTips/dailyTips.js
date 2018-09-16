// pages/suggestDiet/dailyTips/dailyTips.js
let util = require('../../../utils/util.js');
const app = getApp();
const sampleData = [
  {
    meatime: "早餐",
    id: 1,
    recipeList: [
      {recipeId: "11", recipeName: "牛奶", shortIntroduction: "建议食用230g"},
      {recipeId: "4", recipeName: "馒头", shortIntroduction: "建议食用80g"},
      {recipeId: "47", recipeName: "拍黄瓜", shortIntroduction: "建议食用60g"},
      {recipeId: "3", recipeName: "面包", shortIntroduction: "建议食用60g"},
    ]
  },
  {
    meatime: "午餐",
    id: 2,
    recipeList: [
      {recipeId: "15", recipeName: "土豆红烧肉", shortIntroduction: "建议食用土豆80g，红烧肉50g"},
      {recipeId: "41", recipeName: "清炒大白菜", shortIntroduction: "建议食用100g"},
      {recipeId: "3", recipeName: "面包", shortIntroduction: "建议食用100g"},
    ]
  },
  {
    meatime: "晚餐",
    id: 3,
    recipeList: [
      {recipeId: "42", recipeName: "西红柿炒鸡蛋", shortIntroduction: "建议食用西红柿100g，鸡蛋50g"},
      {recipeId: "43", recipeName: "白灼西兰花", shortIntroduction: "建议食用120g"},
      {recipeId: "3", recipeName: "面包", shortIntroduction: "建议食用100g"},
    ]
  },
  {
    meatime: "加餐",
    id: 4,
    recipeList: [
      {recipeId: "48", recipeName: "苹果", shortIntroduction: "建议食用200g"},
    ]
  }
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerText:'',
    subHeader: '换一批推荐看看',
    mealList: null,
    aliasMap: {
      "additionMeal": "加餐",
      "breakfast": "早餐",
      "lunch": "午餐",
      "dinner": "晚餐",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    this.setData({
      mealList: sampleData,
      headerText: year + '-' + month + '-' + day,
    });

    wx.request({
      url: app.globalData.apiBase + "/meals/recommendation",
      method: "GET",
      data: {
        openId: app.globalData.authInfo.openid
      },
      dataType: "json",
      success: (result) => {
        let mealListResult = Object.entries(temp)
          .filter(item => item[0] in this.data.headerMapping)
          .map(item => {
            return {
              meatime: this.data.aliasMap[item[0]],
              recipeList: []
            }
          });
        console.log(mealListResult);
        console.log(result);//TODO: there is still problem from the api since the recommended list is not about recipe but food.
      },

      fail: (result) => {
        wx.showModel('后台错误', result.msg)
      },
    });
  },

/**
 * 换一批推荐菜谱
 */
  refleshRecomment: function (e) {
    console.log("Get new batch of recomment receipt.");
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