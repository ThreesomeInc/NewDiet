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
    dietContent:'您的肾脏功能属于第一期，需要控制蛋白质摄入以延缓肾脏功能的进一步恶化。同时，您的甘油三酯偏高，建议低脂饮食。\n\n 具体一日三餐食谱，可参考主页面的“膳食建议“功能获得我们的智能推荐',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      this.setData({
        userBodyInfo: wx.getStorageSync('userBodyInfo'),
        basicInfoSummary: wx.getStorageSync('basicInfoSummary'),
        suggestedNutrition: wx.getStorageSync('suggestedNutrition')
      });
      console.log(this.data.basicInfoSummary);
      console.log(this.data.suggestedNutrition);
      console.log(this.data.userBodyInfo);
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
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '一日分量',
        color: '#fe6345',
        data: chartData.main.data,
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