const app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: ""
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
    console.log(this.data.inputVal);
  },
  onFoodTypeTap: function (e) {

  }
});