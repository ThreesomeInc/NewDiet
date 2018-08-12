// pages/suggestDiet/doctorAdvice/articleDetail/articleDetail.js
var WxParse = require('../../../../vendor/wxParse/wxParse.js');

var article = `<p><span ><strong>众所周知，大</strong><strong>鱼大肉这样的高蛋白饮食会加重肾脏滤过负担，对肾不好。</strong>但是，如果肾友今天偏偏就多吃了些肉，怎么办？或者是，今天特别想多吃一个鸡蛋、多喝一罐奶啊又怕蛋白质超标，怎么办？</span></p><p><br  /></p><p><span></span></p><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/rKzZIFEGQpmKQl7UUrJBnEtPUNJKKmfMicicQ0ncEpplD4iaqXPZ762Kao659FVCr39ulyBSo9YhIiafWqI6xicmyHw/640?wx_fmt=gif" /></p><p><span></span><br  /></p><p><span>别着急，肾上线为伙伴们介绍一种限制蛋白质的好办法---<strong>用蛋白质低的主食代替蛋白质多的普通主食。</strong></span></p><p><span><br  /></span></p><p><span>除了大家熟知的低蛋白大米以外，下面要介绍的这9种常见又实惠的食物，它们<strong>淀粉足、饱腹感强</strong>，<strong>并且</strong><strong>对我们肾友而言，最大的优点是</strong><strong>蛋白质含量比普通主食低得多，</strong>如果把平时吃的一部分普通主食比如米饭、馒头、面条这些蛋白质多一些的，替换成下面这部分蛋白质少的主食，能帮助大家更好控制一天总的蛋白摄入量。</span><br  /></p>
`;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: 0,
    title:'一种简单又便宜能控制肾病的饮食方式，肾友们都能学会！',
    author:'肾脏营养师',
    time: "2018-08-08",
    tag:'CKD',
    content: article
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    if (options.postId) {
      that.setData({
        postId: options.postId,
      });
    }
    
    WxParse.wxParse('article', 'html', that.data.content, that, 5);
  
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