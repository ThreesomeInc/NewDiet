// pages/suggestDiet/doctorAdvice/doctorAdvice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      headerText: '营养提示',
      subHeader: '来听听营养师有什么小建议？',
    },
    article:[
      { postId: 1,
        title: "一种简单又便宜能控制肾病的饮食方式，肾友们都能学会！",
        description:"众所周知，大鱼大肉这样的高蛋白饮食会加重肾脏滤过负担，对肾不好。但是，如果肾友今天偏偏就多吃了些肉，怎么办？或者是，今天特别想多吃一个鸡蛋、多喝一罐奶啊又怕蛋白质超标，怎么办？",
        author: "肾脏营养师",
        time: "2018-08-09",
      },
      // {
      //   postId: 2,
      //   title: "肾脏不好怎么调理?",
      //   description: "肾脏不好怎么调理？除了要多运动、作息合理，饮食也要多做调整。具体肾脏不好怎么调理呢？首先要多喝水，常吃黑色食物！下面小编为您介绍肾脏不好的调理方法。",
      //   author: "肾脏营养师",
      //   time: "2018-08-10",
      //   tag: "CKD"
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  goArticleDetail: function (e) {
    //This is the postId could be use for HTTP get request
    console.log(e.currentTarget.dataset.variable);

    wx.navigateTo({
      url: 'articleDetail/articleDetail'
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
})