// pages/index/dietStructure/index.js
const wxCharts = require('../../../utils/wxcharts-min.js');
const app = getApp();
var columnChart = null;
const chartData = {
  main: {
    title: 'CKD饮食结构推荐',
    data: [175, 50, 250, 400, 368, 50],
    categories: ['谷薯类', '淀粉', '绿叶蔬菜', '瓜果蔬菜', '肉蛋类', '油脂类']
  }
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerText: '膳食结构建议',
    subHeader: '没有垃圾食物，只有垃圾食法',
    suggestedNutrition: [],
    barChartTitle:'CKD饮食结构推荐',
    barChartSubTitle:'根据您的理想体重，目标能量和目标蛋白质，CKD推荐了以下的每日饮食结构',
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
    let windowWidth = 320;
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.log('fail to get system width.');
    }
    let suggestedNutrition = wx.getStorageSync('suggestedNutrition');
    let categories = suggestedNutrition.map(item => item.name);
    let data = suggestedNutrition.map(item => item.value).map(item => parseFloat(/\d+/.exec(item)[0]));
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: categories,
      series: [{
        name: '一日分量',
        color: '#fe6345',
        data: data,
        format: function (val, name) {
          return val.toFixed(2) + 'g';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + 'g';
        },
        min: 0
      },
      width: windowWidth,
      height: 180,
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