// pages/foodDetail.js
const app = getApp();
const dummy_resp = {
  "advice": "",
  "errorCode": 0,
  "errorMsg": null,
  "name": "小麦(粒)",
  "label": ["低嘌呤","低血压"],
  "preference": "",
  "composition": {
    "钠": "6.8克",
    "水": "10.0克",
    "碳水化合物": "75.2克",
    "磷": "325克",
    "脂肪": "1.3克",
    "热量": "339千卡",
    "蛋白质": "11.9克",
    "钾": "289克"
  },
  "dieticianAdvice": "您的肾脏功能属于第一期，血压偏高，该食物蛋白质和纳含量低，可以经常食用。"
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodCode: null,
    foodInfo: {
      imageUrl: '../../../images/item_icon.png',
    },
    food_composition:null,

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
          that.setData({
            foodInfo: res.data
          });
          console.log(this.data.foodInfo);
          // that.setData({
          //   foodInfo: dummy_resp,
          // });
          that.setData({
            food_composition: [                           
              { name: "蛋白质", value: this.data.foodInfo.composition["蛋白质"] },
              { name: "热量", value: this.data.foodInfo.composition["热量"] },
              { name: "碳水化合物", value: this.data.foodInfo.composition["碳水化合物"] },  
              { name: "脂肪", value: this.data.foodInfo.composition["脂肪"] },
              { name: "水", value: this.data.foodInfo.composition["水"] },
              { name: "钠", value: this.data.foodInfo.composition["钠"] },
              { name: "钾", value: this.data.foodInfo.composition["钾"] },
              { name: "磷", value: this.data.foodInfo.composition["磷"] },              
            ]
          });
          
        },
        fail: res => {
          wx.hideLoading();
        }
      });
    }
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