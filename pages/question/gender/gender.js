// pages/question-sex/question-sex.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: '您的性别是：',
    parameter: [{ id: 1, key:"male", name: '男' }, { id: 2, key:"female", name: '女' }],
    nextQuestionBtnText: '下一步 （2/9）',
    updateValueBtnText: '确认更新并返回',
    logoUrl: '',
    postUpdate: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.postUpdate!='false'){
      this.setData({
        postUpdate: true,
      });
    }
    console.log(this.data.postUpdate);

    if (app.globalData.logoUrl) {
      this.setData({
        logoUrl: app.globalData.logoUrl
      })
    }
    this.data.parameter[0].checked = true;
    app.globalData.userBodyInfo.gender = this.data.parameter[0].key;
    this.setData({
      parameter: this.data.parameter,
    })
  },

  parameterTap: function (e) {
    let that = this;
    let this_checked = e.currentTarget.dataset.id;
    let parameterList = this.data.parameter;
    for (let i = 0; i < parameterList.length; i++) {
      if (parameterList[i].id === this_checked) {
        parameterList[i].checked = true;
        app.globalData.userBodyInfo.gender = parameterList[i].key;
      }
      else {
        parameterList[i].checked = false;
      }
    }
    that.setData({
      parameter: parameterList
    })
  },

  goToNextQuestion: function (e) {
    console.log(app.globalData.userBodyInfo);
    wx.navigateTo({
      url: '../../question/birth/birth?postUpdate=false'
    })
  },

  updateValue: function (e) {
    console.log(app.globalData.userBodyInfo);
    try {
      wx.setStorageSync('userBodyInfo', app.globalData.userBodyInfo);
      console.log('userBodyInfo is updated.');
    } catch (e) {
      console.log('Exception happen when try to get userBodyInfo from storage!')
    };
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