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
      {key: "2", value: "偶尔吃"},
      {key: "3", value: "经常吃"},
    ],
    hasUserBodyInfo: false,
    motto: '只需九步，了解自己更多',
    slogon2: '记录身体信息\n获得营养师更有针对性的推荐',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userBodyInfo != null) {
      this.setData({
        hasUserBodyInfo: true
      })
    }
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
          if (res.data.frequency !== undefined) {
            this.data.preferenceMap.forEach(item => {
              item.default_checked = (item.key === res.data.frequency);
            });
          }
          that.setData({
            foodInfo: res.data,
            preferenceMap: this.data.preferenceMap,
          });
          that.setData({
            food_composition: Object.entries(this.data.foodInfo.composition).map(item => {
              return {name: item[0], value: item[1]}
            }),
          });

        },
        fail: res => {
          wx.hideLoading();
        }
      });
    }
  },

  //事件处理函数
  goToQuestions: function () {
    wx.switchTab({
      url: '../../index/index'
    })
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
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: res => {
        if (res.data.status === 500) {
          wx.showModal({
            title: res.data.message,
            status: "fail"
          })
        } else {
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