const app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    foodList: []
  },
  onShow: function () {
    this.setData({
      foodTypeList: app.globalData.foodTypeList
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
      url: "https://kidneyhealty.com.cn/food/search",
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
  onFoodTypeTap: function (e) {
    wx.navigateTo({
      url: "../foodList/foodList?typeCode=" + e.currentTarget.dataset.foodCode
    })
  }
});