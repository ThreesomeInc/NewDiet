var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    font: "",
    arr: [],
    sysW: null,
    lastDay: null,
    firstDay: null,
    currentDate: null,
    currentWeekday: null,
    mealtime: [],
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    year: null,
    day: null,
    ballTop: 0,
    ballLeft: 0,
    screenHeight: 0,
    screenWidth: 0,
    text: "没有滑动",
  },
  onShow: function () {
    flag_hd = true; //重新进入页面之后，可以再次执行滑动切换页面代码
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
  selectedLog: function (e) {
    let selectedDate = e.target.dataset.date;
    if (Math.abs(this.data.currentDate - selectedDate) > 10) {
      if (selectedDate < 10) {
        this.next(e);
      } else {
        this.last(e);
      }
    }
    this.setData({
      currentDate: selectedDate
    });

    this.dataTime(this.data.year, this.data.month - 1, selectedDate, 2)
  },

  switchWeek: function (e) {
    let screenWidth = wx.getSystemInfoSync().windowWidth;
    if (e.detail.x > (screenWidth / 2)) {
      this.next(e);
    } else {
      this.last(e);
    }
  },
  test: function (event) {

    let pageX = event.touches[0].pageX;
    let pageY = event.touches[0].pageY;
    if (pageX < 30 || pageY < 30)
      return;
    if (pageX > this.data.screenWidth - 30)
      return;
    if (pageY > this.data.screenHeight - 30)
      return;
    this.setData({
      ballTop: event.touches[0].pageY - 30,
      ballLeft: event.touches[0].pageX - 30,
    });

  },
  next: function (res) {

    if (this.data.endDay < this.data.currentDate) {

      this.onLoad(res, this.data.year, this.data.month, this.data.endDay, 2);
    }

    else if (this.data.lastDay === this.data.currentDate && this.data.endDay !== null) {
      this.onLoad(res, this.data.year, Number(this.data.month), 1, 2);
    }
    else if (this.data.lastDay !== this.data.endDay) {

      this.onLoad(res, this.data.year, Number(this.data.month - 1), Number(this.data.endDay + 1), 2);
    }
    else {

      this.data.endDay = 0;
      this.onLoad(res, this.data.year, Number(this.data.month), 1, 2);
    }
  },
  last: function (res) {
    if (this.data.startDay < 7) {
      this.onLoad(res, this.data.year, this.data.month - 1, this.data.startDay - 1)
    }
    else if (this.data.startDay > this.data.endDay && this.data.font === 1) {
      this.onLoad(res, this.data.year, this.data.month - 2, this.data.startDay)
    }
    else {
      this.onLoad(res, this.data.year, this.data.month - 1, this.data.startDay - 7)
    }
  },
  //获取日历相关参数
  dataTime: function (year, month, day, state) {

    let last = this.data.lastDay;
    let date = new Date(year, month, day);
    if (!year) {
      date = new Date()
    }
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    let months = date.getMonth() + 1;

    //获取现今年份
    this.data.year = year;

    //获取现今月份
    this.data.month = months;
    //获取今日日期
    this.data.currentDate = date.getDate();
    //最后一天是几号
    let d = new Date(year, months, 0);

    this.data.lastDay = d.getDate();
    //第一天星期几

    let firstDay
    if (state === 1) {
      if (d.getDate() == date.getDate()) {
        if (this.data.startDay == 1) {
          firstDay = new Date(year, Number(month), Number(new Date(year, month - 1, 0).getDate() - 6));
        }
        else if (this.data.startDay <= 7) {

          firstDay = new Date(year, Number(month), Number(new Date(year, month - 1, 0).getDate() - 8));
        }
        else {
          firstDay = new Date(year, Number(month), Number(new Date(year, month - 1, 0).getDate() - 7));
        }

      }
      else if (this.data.startDay >= 6) {
        if (month == 11 && this.data.endDay > this.data.startDay && this.data.startDay != 16 && this.data.startDay != 9) {
          if (this.data.endDay <= 23) {
            firstDay = new Date(year, Number(month + 1), day);
          }
          else {
            firstDay = new Date(year, Number(month), day);
          }
        }
        else if (this.data.startDay == 8) {
          firstDay = new Date(year, Number(month), day - 4);
        }
        else {
          if (this.data.startDay == 6 && this.data.year != 2018 && this.data.month != 4) {
            this.data.month = Number(this.data.month + 1)
            firstDay = new Date(year, Number(month + 1), day);
          }
          else if (this.data.year == 2018 && this.data.month == 4) {
            firstDay = new Date(year, Number(month), day);
          }
          else {
            firstDay = new Date(year, Number(month - 1), day);
          }
        }

      }
      else {
        if (this.data.startDay == 4 && month == 2) {

          firstDay = new Date(year, Number(month - 1), Number(new Date(year, month - 1, 0).getDate() - day + 1));

        }
        else if (month == 1) {

          firstDay = new Date(year, Number(month), Number(new Date(year, month - 1, 0).getDate() - day + 2));
        }
      }
    }
    else if (state == 2) {

      if (this.data.endDay == last && last != null) {

        firstDay = new Date(year, month, 1);

      }
      else {
        firstDay = new Date(year, Number(month), Number(1 + this.data.endDay));
      }
    }
    else {
      firstDay = new Date(year, month, day);
    }
    this.data.firstDay = firstDay.getDay();
    this.setData({
      currentWeekday: date.getDay()
    })
  },
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸结束事件
  touchEnd: function (e) {
    let touchMove = e.changedTouches[0].pageX;
    // 向左滑动
    if (touchMove - touchDot <= -20 && time < 10) {
      //执行切换页面的方法
      this.next()
    }
    // 向右滑动
    if (touchMove - touchDot >= 20 && time < 10) {
      //执行切换页面的方法
      this.last()
    }
    clearInterval(interval); // 清除setInterval
    time = 0;

  },
  showMealDetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: "../logFoodDetail/logFoodDetail?mealtime=" + e.currentTarget.dataset.mealtime + "&openId=" + this.data.openId,
    })
  },
  onLoad: function (options, year, month, day, state) {
    this.setData({
      mealtime: app.globalData.mealtime,
      openId: app.globalData.authInfo.openid
    });
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
    this.dataTime(year, month, day, state);
    let two;
    //根据今天是星期几，几号获得周的日期
    let res = wx.getSystemInfoSync();
    let date = ""
    if (this.data.currentWeekday === 0) {
      date = this.data.currentDate
    }
    else if (this.data.currentDate <= this.data.currentWeekday) {
      two = 1
      date = 1
    }
    else {
      date = this.data.currentDate - Number(this.data.currentWeekday)
    }
    let num = Number(this.data.currentDate + (6 - this.data.currentWeekday));

    if (num > this.data.lastDay) {
      num = this.data.lastDay
    }

    let cha = Number(this.data.lastDay - date);
    let endDay;
    this.data.arr = [];
    let startDay = date;
    if (two == 1) {
      this.setData({
        font: 1
      });
      let last = new Date(this.data.year, this.data.month - 1, 1).getDay();
      let start = new Date(this.data.year, this.data.month - 1, 0).getDate();
      let now = start - last + 1;
      let newdate = new Date(this.data.year, this.data.month - 1, now);
      startDay = newdate.getDate();
      for (let i = startDay; i <= start; i++) {
        this.data.arr.push(i);
      }
    }

    for (let i = date; i <= num; i++) {

      this.data.arr.push(i);
      endDay = i;
    }

    if (cha < 6) {
      this.setData({
        font: 2
      });
      for (let i = 1; i <= (6 - cha); i++) {
        this.data.arr.push(i);
        endDay = i;
      }
    }

    this.setData({
      sysW: res.windowHeight / 12,//更具屏幕宽度变化自动设置宽度
      marLet: this.data.firstDay,
      arr: this.data.arr,
      year: this.data.year,
      currentDate: this.data.currentDate,
      month: this.data.month,
      endDay: endDay,
      startDay: startDay
    });
  }
});
