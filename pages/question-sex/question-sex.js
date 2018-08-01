// pages/question-sex/question-sex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {        logoUrl:'http://wiki.saraqian.com/wp-content/uploads/2018/08/diet_big_logo.png',
  question: '您的性别是：',
  parameter: [{ id: 1, name: '男' }, { id: 2, name: '女' }],
  nextQuestionText: '下一步 （2/9）'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.parameter[0].checked = true;
    this.setData({
      parameter: this.data.parameter,
    })
  },

  parameterTap: function (e) {
    var that = this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.parameter
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].id == this_checked) {
        parameterList[i].checked = true;
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
    wx.navigateTo({
      url: '../question-birth/question-birth'
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