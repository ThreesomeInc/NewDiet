// pages/foodDetail.js
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodCode: null,
    foodInfo: {
      imageUrl: 'https://kidneyhealty.com.cn/images/item_icon.png',
    },
    food_composition: null,
    showModalStatus: true,
    animationData: null,
    preferenceMap: [
      {key: "1", value: "不吃"},
      { key: "2", value: "偶尔吃", default_checked: true},
      { key: "3", value: "经常吃"},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      foodCode: options.foodCode
    });
    console.log(options);
    wx.showLoading({
      title: "正在加载食材信息...",
      mask: true
    });
    if (this.data.foodCode) {
      let that = this;
      wx.request({
        url: "https://kidneyhealty.com.cn/food/detail/" + this.data.foodCode,
        data: {
          "openId": app.globalData.authInfo.openid
        },
        method: "GET",
        header: {
          "Content-Type": "application/json"
        },
        dataType: "json",
        success: res => {
          wx.hideLoading();
          console.log(res.data.frequency === undefined);
          that.setData({
            foodInfo: res.data,
            showModalStatus: (res.data.frequency === undefined)
          });
          console.log(this.data.foodInfo);
          // that.setData({
          //   foodInfo: dummy_resp,
          // });
          that.setData({
            food_composition: [
              {name: "蛋白质", value: this.data.foodInfo.composition["蛋白质"]},
              {name: "热量", value: this.data.foodInfo.composition["热量"]},
              {name: "碳水化合物", value: this.data.foodInfo.composition["碳水化合物"]},
              {name: "脂肪", value: this.data.foodInfo.composition["脂肪"]},
              {name: "水", value: this.data.foodInfo.composition["水"]},
              {name: "钠", value: this.data.foodInfo.composition["钠"]},
              {name: "钾", value: this.data.foodInfo.composition["钾"]},
              {name: "磷", value: this.data.foodInfo.composition["磷"]},
            ]
          });

        },
        fail: res => {
          wx.hideLoading();
        }
      });
    }
  },

  updatePreference: function (e) {
    let preference = e.detail.value;
    console.log(preference);
    let foodCode = this.data.foodCode;
    wx.request({
      url: "https://kidneyhealty.com.cn/food/preference",
      data: {
        "userId": app.globalData.authInfo.openid,
        "foodId": foodCode,
        "preference": preference,
      },
      method: "POST",
      header: {
        "Accept":"application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: res => {
        if (res.data.status === 500) {
          wx.showModal({
            title: res.data.message,
            status: "fail"
          })
        }else{
          console.log("Successfully post preference to backend")
        }
      },
      fail: res => {
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

  }
});