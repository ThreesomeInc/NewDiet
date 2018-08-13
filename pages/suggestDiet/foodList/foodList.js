const app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    typeCode: null,
    foodList: [],//for all data return from server
    foodListView: [],//for page filtering only
  },
  onLoad: function (options) {
    let that = this;
    this.setData({
      typeCode: options.typeCode
    });
    if(this.data.typeCode) {
      wx.showLoading({
        title: "正在加载食材信息...",
        mask: true
      });
      wx.request({
        url: "https://kidneyhealty.com.cn/food/",
        method: "GET",
        data: {
          "typeId": options.typeCode
        },
        header: {
          "Content-Type": "application/json"
        },
        dataType: "json",
        success: res => {
          wx.hideLoading();
          console.log(res);
          that.setData({
            foodList: res.data.foodList,
            foodListView: res.data.foodList
          });
        },
        fail: res => {
          wx.hideLoading();
          console.log(res);
        }
      })
    }
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