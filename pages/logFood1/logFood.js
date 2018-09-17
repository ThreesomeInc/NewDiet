var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;
let util = require('../../utils/util.js');
const app = getApp();
const currentYear = new Date().getFullYear();
const currentMonth = util.formatNumber(new Date().getMonth() + 1);
const currentDate = util.formatNumber(new Date().getDate());

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_complete_logged: false,
    if_show_report: false,
    mealtime: [],
    mealFoodMap: null,
    nutritionRatio: null,
    datePickerIsShow: false,
    datePickerValue: [currentYear, currentMonth, currentDate],
    year: currentYear,
    month: currentMonth,
    currentDate: currentDate,
    day: new Date().getDate(),
    ballTop: 0,
    ballLeft: 0,
    screenHeight: 0,
    screenWidth: 0,
    text: "没有滑动",
    headerMapping: {
      totalEnergy: "总能量",
      totalProtein: "总蛋白质",
      peRatio: "优质蛋白比例（建议0.5-0.7)",
      fat: "脂肪",
      feRatio: "脂肪供能比(建议0.25-0.35)",
      cho: "碳水化合物",
      ceRatio: "碳水化合物供能比(建议0.55-0.65）",
      na: "钠 (建议<2000mg/d)",
      k: "钾",
      p: "磷 (建议<800mg/d)",
      ca: "钙 (建议<2000mg/d)"
    },
    title: {
      headerText: '饮食记录',
    },
    hasMealRecord: false,
    proteinPieText: '尚可吃蛋白质\n',
    energyPieText: '尚可吃热量\n',
    proteinBelowText: '尚可吃蛋白质\n',
    energyBelowText: '尚可吃热量\n',
    proteinOverText: '蛋白质已超吃\n',
    energyOverText: '热量已超吃\n',
    expectedProtein: null,
    expectedEnergy: null,
    proteinRemaining: null,
    energyRemaining: null,
  },
  onShow: function () {
    flag_hd = true; //重新进入页面之后，可以再次执行滑动切换页面代码
    clearInterval(interval); // 清除setInterval
    time = 0;
    this.loadFood();
  },
  loadFood: function () {
    if (this.data.year && this.data.month && this.data.currentDate) {
      let logDate = this.data.year + "-" + util.formatNumber(this.data.month) + "-" + util.formatNumber(this.data.currentDate);
      wx.request({
        url: app.globalData.apiBase + "/foodLog/single",
        method: "GET",
        data: {
          openId: app.globalData.authInfo.openid,
          date: logDate,
        },
        success: res => {
          let currentRecord = res.data.dietRecordList;
          console.log(currentRecord);
          if (currentRecord.length > 0) {
            this.setData({
              hasMealRecord: true,
            })
          } else {
            this.setData({
              hasMealRecord: false,
            })
          }
          let param = {};
          currentRecord.forEach(item => {
            param[item.mealtime] = item.foodLogItems.map((item2, index) => {
              return {
                description: item2.foodAlias + ": " + item2.unit + "g",
                object: item2,
                index: index,
              }
            })
          });
          this.setData({
            mealFoodMap: param,
          });

          if (res.data.monthFoodLog && res.data.monthFoodLog.totalProtein) {
            let temp = res.data.monthFoodLog;
            let nutritionRatio = Object.entries(temp)
              .filter(item => item[0] in this.data.headerMapping)
              .map(item => {
                return {name: this.data.headerMapping[item[0]], value: item[1]}
              });
            let proteinRemaining = parseFloat(temp.expectProtein) - parseFloat(temp.totalProtein);
            let energyRemaining = parseFloat(temp.expectEnergy) - parseFloat(temp.totalEnergy);
            let proteinRatio = proteinRemaining / parseFloat(temp.expectProtein);
            let energyRatio = energyRemaining / parseFloat(temp.expectEnergy);
            this.drawDiagram(proteinRatio < 0 ? 1 : proteinRatio, energyRatio < 0 ? 1 : energyRatio);
            this.setData({
              nutritionRatio: nutritionRatio,
              is_complete_logged: temp.isLogged,
              expectedProtein: temp.expectProtein,
              expectedEnergy: temp.expectEnergy,
              proteinRemaining: Math.abs(proteinRemaining.toFixed(2)),
              energyRemaining: Math.abs(energyRemaining.toFixed(2)),
              proteinPieText: proteinRemaining < 0 ? this.data.proteinOverText : this.data.proteinBelowText,
              energyPieText: energyRemaining < 0 ? this.data.energyOverText : this.data.energyBelowText,
            })
          } else {
            if (res.data.monthFoodLog) {
              let temp = res.data.monthFoodLog;
              this.drawDiagram(0, 0);
              this.setData({
                expectedProtein: temp.expectProtein,
                expectedEnergy: temp.expectEnergy,
                proteinRemaining: temp.expectProtein,
                energyRemaining: temp.expectEnergy,
              });
            }
            console.log('res.data.monthFoodLog is null');
            var temp = [];
            for (var key in this.data.headerMapping) {
              if (this.data.headerMapping.hasOwnProperty(key)) {
                temp.push({
                  name: this.data.headerMapping[key],
                  value: 0
                });
              }
            }

            this.setData({
              nutritionRatio: temp,
              is_complete_logged: false,
            })
          }
        },
        fail: res => {
          wx.showToast({
            title: res,
            icon: 'success'
          });
        }
      });
    }
  },
  switchReport: function (e) {
    this.setData({
      if_show_report: !this.data.if_show_report,
    })
  },

  threeDayDietReport: function (e) {
    let logDate = this.data.year + "-" + util.formatNumber(this.data.month) + "-" + util.formatNumber(this.data.currentDate);
    wx.navigateTo({
      url: "../threeDayDietReport/threeDayDietReport?logDate=" + logDate,
    })
  },
  checkboxChange: function (e) {
    var checked = e.detail.value;
    let logDate = this.data.year + "-" + util.formatNumber(this.data.month) + "-" + util.formatNumber(this.data.currentDate);
    if (checked.length > 0) {
      this.setData({
        is_complete_logged: true
      })
      wx.request({
        url: app.globalData.apiBase + "/foodLog/isCompletedLog",
        method: "POST",
        data: {
          openId: app.globalData.authInfo.openid,
          date: logDate,
          checked: true
        },
        success: res => {
          console.log(res.data);
        }
      })
    } else {
      this.setData({
        is_complete_logged: false
      })
      wx.request({
        url: app.globalData.apiBase + "/foodLog/isCompletedLog",
        method: "POST",
        data: {
          openId: app.globalData.authInfo.openid,
          date: logDate,
          checked: false
        },
        success: res => {
          console.log(res.data);
        }
      })
    }
  },

  showMealDetail: function (e) {
    console.log(e);
    let logDate = this.data.year + "-" + util.formatNumber(this.data.month) + "-" + util.formatNumber(this.data.currentDate);
    wx.navigateTo({
      url: "../logFoodDetail/logFoodDetail?logDate=" + logDate + "&mealtime=" + e.currentTarget.dataset.mealtime + "&openId=" + this.data.openId,
    })
  },
  showDatePicker: function (e) {
    this.setData({
      datePickerIsShow: true,
      datePickerValue: [this.data.year, this.data.month, this.data.currentDate]
    });
  },
  hideDatePicker: function (e) {
    this.setData({
      datePickerIsShow: false,
    });
  },
  confirmDate: function (e) {
    console.log(e);
    let dateArr = e.detail.value;
    this.setData({
      year: dateArr[0],
      month: dateArr[1],
      currentDate: dateArr[2],
      datePickerIsShow: false
    });
    this.loadFood();
  },
  addFoodLog: function () {
    let logDate = this.data.year + "-" + util.formatNumber(this.data.month) + "-" + util.formatNumber(this.data.currentDate);
    wx.navigateTo({
      url: "../logFoodDetail1/logFoodDetail?logDate=" + logDate + "&openId=" + this.data.openId,
    })
  },
  deleteMealDetail: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let mealtime = e.currentTarget.dataset.mealtime;
    let logDate = this.data.year + "-" + util.formatNumber(this.data.month) + "-" + util.formatNumber(this.data.currentDate);

    wx.showLoading({
      title: "正在删除选中用餐信息...",
      mask: true
    });
    let foodList = this.data.mealFoodMap[mealtime];
    foodList.splice(index, 1);
    wx.request({
      url: app.globalData.apiBase + "/foodLog",
      method: "POST",
      data: {
        openId: this.data.openId,
        logDate: logDate,
        mealTime: mealtime,
        foodLogItems: foodList.map(item => item.object),
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        this.setData({
          mealFoodMap: this.data.mealFoodMap,
        });
      },
      fail: res => {
        wx.showToast({
          title: res,
          icon: 'success'
        });
      }
    });

  },
  drawDiagram: function (proteinCompletionRatio, energyCompletionRatio) {
    this.drawProgressbg('canvasProgressbg1');
    this.drawCircle('canvasProgress1', 2 * proteinCompletionRatio);
    this.drawProgressbg('canvasProgressbg2');
    this.drawCircle('canvasProgress2', 2 * energyCompletionRatio);
  },
  drawProgressbg: function (backgroundId) {
    let radius = this.data.screenWidth / 4;
    // 使用 wx.createContext 获取绘图上下文 context
    let ctx = wx.createCanvasContext(backgroundId);
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#20183b'); // 设置圆环的颜色
    ctx.setLineCap('round');// 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (progressId, step) {
    let radius = this.data.screenWidth / 4;
    let context = wx.createCanvasContext(progressId);
    // 设置渐变
    let gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#83bcf3");
    gradient.addColorStop("0.5", "#1fedd6");
    gradient.addColorStop("1.0", "#4cb16f");
    // gradient.addColorStop("2.0", "#4cb16f");
    context.setLineWidth(10);
    context.setStrokeStyle(gradient);
    context.setLineCap('round');
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(radius, radius, radius * 0.9, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  onLoad: function (options, year, month, day, state) {
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
          font: ""
        });
      }
    });
    this.setData({
      mealtime: app.globalData.mealtime,
      openId: app.globalData.authInfo.openid
    });
  }
});
