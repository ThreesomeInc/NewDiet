// pages/logFoodDetail/logFoodDetail.js
const app = getApp();
const exampleFood = {
  name: '牛肉',
  unit: 50,
  edible: 100,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mealtime: null,
    openId:null,
    foodList: [],
    selectedFood:null,
    sourceMap: [
      { key: "1", value: "市场买的", default_checked:true },
      { key: "2", value: "超市净菜", default_checked:false },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.mealtime){
      this.setData({
        mealtime: options.mealtime,
        searchBarTips: options.mealtime +'吃了啥？',
        title:{
          headerText: options.mealtime +'记录',
          subHeader: '坚持完整记录，结果更精确哦',
        }
      })
    };
    if (options.openId) {
      this.setData({
        openId: options.openId,
      })
    };
  },
  addFood: function(e){
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    console.log(e.currentTarget.dataset.selectedFoodId);
    //TODO: here should REST call to get 名称+默认值+可食部
    this.setData({
      selectedFood: exampleFood,
    })    
    console.log(this.data.selectedFood.edible);
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    wx.request({
      url: app.globalData.apiBase + "/food/search",
      method: "GET",
      data: {
        name: e.detail.value
      },
      success: res => {
        this.setData({
          foodList: res.data.foodList
        })
      },
      fail: res => {
        wx.showToast({
          title: res,
          icon: 'success'
        });
      }
    });
    console.log(this.data.inputVal);
  },

  cancelBtn: function (e) {
    this.setData({
      selectedFood: null
    });
  },

  confirmBtn: function (e) {
    //TODO: this is to pose the selectedFood info
    wx.navigateBack({
      delta: -1
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
})