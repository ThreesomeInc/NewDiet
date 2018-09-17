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
    showConfirm: true,
    sourceMap: [
      {key: "1", text: "市场买的", value: "市场", default_checked: true},
      {key: "2", text: "超市净菜", value: "超市", default_checked: false},
    ],
    mealtimes: [],
    existingFood: [],
    title: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mealtimes: app.globalData.mealtime.map(item => {
        return {key: item, value: item, default_checked: item === app.globalData.mealtime[0]}
      }),
      mealtime: app.globalData.mealtime[0]
    });
    if (options.logDate) {
      this.setData({
        logDate: options.logDate,
        title: {
          headerText: '用餐记录',
          subHeader: '坚持完整记录，结果更精确哦',
        }
      })
    }
    if (options.openId) {
      this.setData({
        openId: options.openId,
      })
    }
    this.reloadCurrentList();
  },
  addFood: function (e) {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    let foodId = e.currentTarget.dataset.selectedFoodId;
    console.log(foodId);
    while (this.data.selectedFood.length > 0) {
      this.data.selectedFood.splice(0, 1);
      this.setData({
        selectedFood: this.data.selectedFood,
      });
    }
    wx.request({
      url: app.globalData.apiBase + "/foodLog/food/" + foodId,
      method: "GET",
      success: res => {
        if (this.data.existingFood.filter(item => item.foodId === res.data.foodId).length !== 0) {
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
          showConfirm: true,
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
    if (e.detail.value.length === 0) return;
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

  unitInput: function (e) {
    let value = e.detail.value;
    let id = e.target.dataset.id;
    let temp = this.data.selectedFood;

    temp[id].unit = value;
    this.setData({
      selectedFood: temp,
    });


  },
  cancelBtn: function (e) {
    this.setData({
      selectedFood: [],
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
        foodLogItems: this.data.selectedFood.concat(this.data.existingFood),
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

  updateMealTime: function (e) {
    this.setData({
      mealtime: e.detail.value
    });
    this.reloadCurrentList();
  },

  reloadCurrentList: function () {
    let _this = this;
    wx.request({
      url: app.globalData.apiBase + "/foodLog/single",
      method: "GET",
      data: {
        openId: _this.data.openId,
        date: _this.data.logDate,
        mealtime: _this.data.mealtime,
      },
      success: res => {
        let currentRecord = res.data.dietRecordList.filter(item => item.mealtime === _this.data.mealtime);
        if (currentRecord.length > 0) {
          this.setData({
            showConfirm: true,
            existingFood: currentRecord[0].foodLogItems,
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