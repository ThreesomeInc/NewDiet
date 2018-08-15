// pages/index/dietStructure/index.js
const wxCharts = require('../../../utils/wxcharts-min.js');
const app = getApp();
var columnChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:{
      headerText: '膳食结构建议',
      subHeader: '没有垃圾食物，只有垃圾食法',
    }, 
    suggestedNutrition: [],
    barChartTitle:'CKD饮食结构推荐',
    barChartSubTitle:'根据您的理想体重，目标能量和目标蛋白质，营养师推荐了以下的每日饮食结构',
    advice:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      this.setData({
        userBodyInfo: wx.getStorageSync('userBodyInfo'),
        basicInfoSummary: wx.getStorageSync('basicInfoSummary'),
        suggestedNutrition: wx.getStorageSync('suggestedNutrition'),
        advice: wx.getStorageSync('advice'),
      });
      console.log(this.data.basicInfoSummary);
      console.log(this.data.suggestedNutrition);
      console.log(this.data.userBodyInfo);
      console.log(this.data.advice);
    } catch (e) {
      console.log('Exception happen when try to get summary info from storage!')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let suggestedNutrition = wx.getStorageSync('suggestedNutrition');
    let categories = suggestedNutrition.map(item => item.name);
    let data = suggestedNutrition.map(item => {
      var index = item.value.indexOf("克");
      var m= {
        name : item.name, 
        data: parseInt(item.value.substring(0, index)),
      }
      return m;
    })
    console.log(data);
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'pie',
      animation: true,
      categories: categories,
      series: data,
      width: 300,
      height: 290,
      dataLabel: true,
    });
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