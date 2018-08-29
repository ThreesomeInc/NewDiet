// pages/logFoodDetail/logFoodDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mealtime: null,
    logDate: null,
    openId: null,
    inputVal: "",
    inputShowed: false,
    foodList: [],
    selectedFood: [],
    sourceMap: [
      {key: "1", text: "市场买的", value: "市场", default_checked: true},
      {key: "2", text: "超市净菜", value: "超市", default_checked: false},
    ],
    title: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.apiBase + "/foodLog/single",
      method: "GET",
      data: {
        openId: options.openId,
        date: options.logDate,
        mealtime: options.mealtime,
      },
      success: res => {
        let currentRecord = res.data.dietRecordList.filter(item => item.mealtime === options.mealtime);
        if (currentRecord.length > 0) {
          this.setData({
            selectedFood: currentRecord[0].foodLogItems,
          });
        }
      },
      fail: res => {
        wx.showToast({
          title: res,
          icon: 'success'
        });
      }
    });
    if (options.mealtime) {
      this.setData({
        mealtime: options.mealtime,
        logDate: options.logDate,
        searchBarTips: options.mealtime + '吃了啥？',
        title: {
          headerText: options.mealtime + '记录',
          subHeader: '坚持完整记录，结果更精确哦',
        }
      })
    }
    if (options.openId) {
      this.setData({
        openId: options.openId,
      })
    }
  },
  addFood: function (e) {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    let foodId = e.currentTarget.dataset.selectedFoodId;
    console.log(foodId);
    wx.request({
      url: app.globalData.apiBase + "/foodLog/food/" + foodId,
      method: "GET",
      success: res => {
        if (this.data.selectedFood.filter(item => item.foodId === res.data.foodId).length !== 0) {
          wx.showToast({
            title: "食材已存在！",
            icon: 'loading',
            duration: 1000
          });
          return;
        }
        this.data.selectedFood.push({
          foodId: res.data.foodId,
          edible: res.data.edible,
          unit: res.data.unit,
          channel: this.data.sourceMap[0].value,
          foodName: res.data.foodName,
          foodAlias: res.data.foodAlias
        });
        this.setData({
          selectedFood: this.data.selectedFood,
        });
      },
      fail: res => {
        wx.showToast({
          title: res,
          icon: 'success'
        });
      }
    });
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
    console.log('going to search from backend');
    wx.request({
      url: app.globalData.apiBase + "/food/search",
      method: "GET",
      data: {
        name: e.detail.value
      },
      success: res => {
        console.log('get response from backend');
        this.setData({
          foodList: res.data.foodList
        })
      },
      fail: res => {
        console.log('fail to get response from backend');
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
      selectedFood: []
    });
  },

  confirmBtn: function (e) {
    wx.request({
      url: app.globalData.apiBase + "/foodLog",
      method: "POST",
      data: {
        openId: this.data.openId,
        logDate: this.data.logDate,
        mealTime: this.data.mealtime,
        foodLogItems: this.data.selectedFood,
      },
      success: res => {

        wx.navigateBack({
          delta: -1
        })
      },
      fail: res => {
        wx.showToast({
          title: res,
          icon: 'success'
        });
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

  },

  updateEdible: function (e) {
    let index = e.currentTarget.dataset.foodIndex;
    this.data.selectedFood[index].channel = e.detail.value;
    this.setData({
      selectedFood: this.data.selectedFood,
    });
  },

  removeFood: function (e) {
    let index = e.currentTarget.dataset.removeIndex;
    this.data.selectedFood.splice(index, 1);
    this.setData({
      selectedFood: this.data.selectedFood,
    });
  },
});