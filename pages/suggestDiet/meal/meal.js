// pages/suggestDiet/meal/meal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipeList: [],
    inputShowed: false,
    inputVal: "",
    types: [],
    mealtime: [],
    category: [],
    style: [],
    state: 0,
    _num: '0'
  },
  /**
   * 点击tab切换
   */
  toggle(e){
    console.log(e.currentTarget.dataset.index);
    if (this.data._num === e.currentTarget.dataset.index) {
      return false;
    } else {
      this.setData({
        _num: e.currentTarget.dataset.index
      })
    }
  },

  bindChange: function (e) {
    let that = this;
    console.log(e);
    that.setData({
      _num: e.detail.current
    });
    switch (e.detail.current) {
      case 0:
        that.data.state = 0;
        break;
      case 1:
        that.data.state = 1;
        break;
      case 2:
        that.data.state = 2;
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      types: app.globalData.recipeTypes
    });
    this.data.types.forEach(item => {
      wx.request({
        url: "https://kidneyhealty.com.cn/recipe/" + item.key,
        method: "GET",
        success: res => {
          if (!res.data.recipeTypeList) return;
          let param = {};
          param[item.key + ""] = res.data.recipeTypeList;
          this.setData(param);
        },
        fail: res => {

        }
      });
    });
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
      url: "https://kidneyhealty.com.cn/recipe/search/" + e.detail.value,
      method: "GET",
      success: res => {
        this.setData({
          recipeList: res.data.recipeList
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