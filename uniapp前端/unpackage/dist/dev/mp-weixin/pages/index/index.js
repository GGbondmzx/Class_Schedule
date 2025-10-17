"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showCount: 0,
      allDataCount: 0,
      school_id: 1,
      school_hot: [],
      colorarr: [
        "#f2791c",
        "#fabc07",
        "#8cc63e",
        "#1bbbb3",
        "#f0be43",
        "#da786b",
        "#5297f6",
        "#e89859",
        "#7ac077",
        "#6ec8bf"
      ],
      title: "Hello",
      message: "",
      isTable: false,
      isCourse: false,
      swiperList: [],
      swiperCurrent: 0,
      swiperDotIndex: 0,
      dotsStyles: {
        backgroundColor: "#FFF",
        border: "1px #707070 solid",
        color: "#fff",
        selectedBackgroundColor: "#FFF",
        selectedBorder: "1px rgba(225, 225, 225,0.9) solid"
      },
      swipermode: "round",
      date: "",
      weather: "",
      startday: {
        y: "",
        m: "",
        d: ""
      },
      week: "",
      morningCourse: [],
      afternoonCourse: [],
      allTable: [],
      timemap: [
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        },
        {
          start: "",
          end: ""
        }
      ]
    };
  },
  onLoad() {
    common_vendor.index.showLoading({
      title: "正在登录"
    });
    console.log("热更新");
    if (common_vendor.wx$1.canIUse("getUpdateManager")) {
      const updateManager = common_vendor.wx$1.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        console.log("onCheckForUpdate====11111", res);
        if (res.hasUpdate) {
          console.log("res.hasUpdate====");
        }
      });
      updateManager.onUpdateReady(function(res) {
        console.log(111, res);
        common_vendor.wx$1.showModal({
          title: "版本更新",
          content: "新版本已经准备好，确定重启应用？",
          showCancel: false,
          success: function(res2) {
            console.log("success====", res2);
            if (res2.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });
      updateManager.onUpdateFailed(function() {
        common_vendor.wx$1.showModal({
          title: "已经有新版本了哟~",
          content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
        });
      });
    }
    this.checkToken();
    this.getWeatherInfo();
    common_vendor.wx$1.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },
  methods: {
    getAllData(school_id) {
      let that = this;
      this.$http({
        url: "init",
        method: "post",
        data: {
          school_id
        }
      }).then((res) => {
        console.log(res);
        let start_time = JSON.parse(res.data.data.startday[0].start_time);
        that.startday = start_time;
        console.log(start_time);
        console.log(that.startday);
        common_vendor.index.setStorage({
          key: "StartDay",
          data: start_time
        });
        let timemap = JSON.parse(res.data.data.timemap[0].time);
        that.timemap = timemap;
        common_vendor.index.setStorage({
          key: "timemap",
          data: timemap
        });
        console.log(that.timemap);
        that.school_hot = res.data.data.info.sort(function(a, b) {
          return b.id - a.id;
        }).slice(0, 3);
        that.swiperList = res.data.data.swiper;
        that.allDataCount = 4;
        let schoollist = res.data.data.schoollist;
        common_vendor.index.setStorage({
          key: "school_list",
          data: schoollist
        });
        let setting = res.data.data.setting;
        common_vendor.index.setStorage({
          key: "setting",
          data: setting
        });
      });
    },
    geToMore() {
      common_vendor.index.navigateTo({
        url: "/pages/moreInfo/moreInfo"
      });
    },
    getSchoolId(token) {
      let that = this;
      this.$http({
        url: "getSchoolId",
        method: "POST",
        data: {
          token
        }
      }).then((res) => {
        console.log("getSchool_id" + res.data.data);
        if (res.data.data != null) {
          that.getAllData(res.data.data);
          common_vendor.index.setStorage({
            key: "school_id",
            data: res.data.data,
            success() {
              console.log("checkschoolidsucess" + that.school_id);
            }
          });
          console.log("getschoolid" + that.school_id);
        } else {
          that.getAllData(1);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    swiperTo(item) {
      common_vendor.index.navigateTo({
        url: "../webview/webview?url=" + item.url
      });
      console.log(item);
    },
    goImport() {
      common_vendor.index.navigateTo({
        url: "../selectSchool/selectSchool"
      });
    },
    goTotimetabble() {
      common_vendor.index.switchTab({
        url: "../timetable/timetable"
      });
    },
    gotowebView(i) {
      common_vendor.index.navigateTo({
        url: "../webview/webview?url=" + i.url
      });
    },
    tableText(str) {
      if (str.length >= 9) {
        return str.substring(0, 9) + "...";
      } else {
        return str;
      }
    },
    wxLogin() {
      let that = this;
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          that.$http({
            url: "login",
            method: "POST",
            data: {
              code: loginRes.code
            }
          }).then((res) => {
            common_vendor.index.setStorage({
              key: "token",
              data: res.data.data,
              success() {
                that.message = `登陆成功！`;
                that.$refs.message.open();
              }
            });
            that.getSchoolId(res.data.data);
          }).catch((error) => {
            console.log("error:" + error);
          });
        },
        fail: function(res) {
          console.log("fail:" + res);
        }
      });
    },
    checkToken() {
      let that = this;
      common_vendor.index.getStorage({
        key: "token",
        success(ress) {
          that.$http({
            url: "checkToken",
            method: "POST",
            data: {
              token: ress.data
            }
          }).then((res) => {
            if (res.data.code == 200) {
              that.getSchoolId(ress.data);
            } else {
              that.wxLogin();
            }
          }).catch((error) => {
            console.log("error" + error);
          });
        },
        fail() {
          that.wxLogin();
        }
      });
    },
    getTable(token) {
      let that = this;
      common_vendor.index.getStorage({
        key: "table",
        success(res) {
          that.isTable = true;
          that.allTable = res.data;
          that.getweek();
        },
        fail() {
          that.$http({
            url: "getTable",
            method: "POST",
            data: {
              token
            }
          }).then((res) => {
            if (res.data.code == 200) {
              common_vendor.index.setStorage({
                key: "table",
                data: res.data.data,
                success() {
                  that.allTable = res.data.data;
                  that.getweek();
                  that.isTable = true;
                }
              });
            }
            console.log(res);
          }).catch((error) => {
            console.log(error);
          });
        }
      });
    },
    change(e) {
      this.swiperCurrent = e.detail.current;
    },
    clickItem(e) {
      console.log("这是轮播图点击事件：" + e);
      this.swiperDotIndex = e;
    },
    getWeatherInfo() {
      let that = this;
      common_vendor.index.request({
        url: "https://restapi.amap.com/v3/weather/weatherInfo?key=4f2800a0d5029905b0bf8e2df6e745e6&city=321003&extensions=all",
        method: "GET",
        success(res) {
          console.log(res.data.forecasts[0].casts[0]);
          let min = Math.trunc(res.data.forecasts[0].casts[0].nighttemp);
          let max = Math.trunc(res.data.forecasts[0].casts[0].daytemp);
          that.weather = "扬州市 " + min + "~" + max + "℃ " + res.data.forecasts[0].casts[0].dayweather;
        }
      });
    },
    getWeeks(y, m, d, y1, m1, d1) {
      let dayArray = [1, 2, 3, 4, 5, 6, 0];
      let sd = new Date(y, m - 1, d);
      let ed = new Date(y1, m1 - 1, d1);
      let sdNowDay = sd.getDay();
      let sdNNowDay = dayArray.indexOf(sdNowDay);
      let edNowDay = ed.getDay();
      let edNNowDay = dayArray.indexOf(edNowDay);
      let edL = 7 - edNNowDay;
      let sdF = new Date(y, m - 1, d - sdNNowDay);
      let enF = new Date(y1, m1 - 1, d1 + edL);
      var dt1 = sdF.getTime();
      var dt2 = enF.getTime();
      let week = Math.abs(dt2 - dt1) / 1e3 / 60 / 60 / 24 / 7;
      return week;
    },
    getweek() {
      let day = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      let date = /* @__PURE__ */ new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let xqj = day[date.getDay()];
      console.log(y, m, d);
      console.log(this.startday);
      let week = this.getWeeks(this.startday.y, this.startday.m, this.startday.d, y, m, d);
      this.week = week;
      let da = m + "月" + d + "日 " + xqj;
      this.date = da;
      console.log(this.allTable.length);
      let that = this;
      if (this.allTable.length > 0) {
        that.init_table();
      }
      console.log(week);
    },
    init_table() {
      let table = JSON.parse(this.allTable);
      let week = this.week;
      console.log(week);
      let now = /* @__PURE__ */ new Date();
      let day = now.getDay();
      let course = table.filter((item) => {
        let attend = item.attend.map(Number);
        if (attend.indexOf(week) != -1) {
          if (parseInt(item.day) == day) {
            return item;
          }
        }
      });
      if (course.length > 0) {
        this.isCourse = true;
        let mCourse = course.filter((item) => {
          if (item.nums < 5) {
            return item;
          }
        });
        this.morningCourse = mCourse;
        let aCourse = course.filter((item) => {
          if (item.nums >= 5) {
            return item;
          }
        });
        this.afternoonCourse = aCourse;
        console.log(mCourse, aCourse);
      } else {
        this.isCourse = false;
        this.morningCourse = [];
        this.afternoonCourse = [];
      }
    }
  },
  onShow() {
    let that = this;
    console.log("onShow:" + this.showCount);
    if (that.showCount != 0) {
      common_vendor.index.getStorage({
        key: "school_id",
        success(res) {
          that.getAllData(res.data);
          that.isTable = true;
        }
      });
      common_vendor.index.getStorage({
        key: "table",
        success(res) {
          that.allTable = res.data;
          that.getweek();
        }
      });
    }
    this.showCount++;
  },
  watch: {
    allDataCount(newval, oldval) {
      let that = this;
      console.log(newval, oldval);
      if (newval == 4) {
        console.log("getAlldata done");
        common_vendor.index.hideLoading();
        common_vendor.index.getStorage({
          key: "school_id",
          success() {
            let token = common_vendor.index.getStorageSync("token");
            that.getTable(token);
          },
          fail() {
            let token = common_vendor.index.getStorageSync("token");
            that.getTable(token);
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_swiper_dot2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.date),
    b: common_vendor.t($data.weather),
    c: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item.img,
        b: common_vendor.o(($event) => $options.swiperTo(item), index),
        c: index
      };
    }),
    d: common_vendor.o((...args) => $options.change && $options.change(...args)),
    e: $data.swiperDotIndex,
    f: common_vendor.o($options.clickItem),
    g: common_vendor.p({
      info: $data.swiperList,
      current: $data.swiperCurrent,
      field: "img",
      mode: $data.swipermode,
      dotsStyles: $data.dotsStyles
    }),
    h: common_vendor.t($data.week),
    i: $data.morningCourse.length != 0
  }, $data.morningCourse.length != 0 ? {
    j: $data.morningCourse.length * 119 + $data.morningCourse.length * 20 + "rpx",
    k: common_vendor.f($data.morningCourse, (item, index, i0) => {
      return {
        a: common_vendor.t($options.tableText(item.name)),
        b: common_vendor.t(item.room),
        c: common_vendor.t(item.attend_str),
        d: common_vendor.t($data.timemap[Number(item.nums) - 1].start),
        e: common_vendor.t($data.timemap[Number(item.enum) - 1].end),
        f: index,
        g: common_vendor.s("background-color:" + $data.colorarr[(item.enum + item.day) * item.name.length % 7] + ";"),
        h: common_vendor.o((...args) => $options.goTotimetabble && $options.goTotimetabble(...args), index)
      };
    })
  } : {}, {
    l: $data.afternoonCourse.length != 0
  }, $data.afternoonCourse.length != 0 ? {
    m: $data.afternoonCourse.length * 119 + $data.afternoonCourse.length * 20 + "rpx",
    n: common_vendor.f($data.afternoonCourse, (item, index, i0) => {
      return {
        a: common_vendor.t($options.tableText(item.name)),
        b: common_vendor.t(item.room),
        c: common_vendor.t(item.attend_str),
        d: common_vendor.t($data.timemap[Number(item.nums) - 1].start),
        e: common_vendor.t($data.timemap[Number(item.enum) - 1].end),
        f: index,
        g: common_vendor.s("background-color:" + $data.colorarr[(item.enum + item.day) * item.name.length % 7] + ";"),
        h: common_vendor.o((...args) => $options.goTotimetabble && $options.goTotimetabble(...args), index)
      };
    })
  } : {}, {
    o: $data.isTable == true && $data.afternoonCourse.length == 0 && $data.morningCourse.length == 0
  }, $data.isTable == true && $data.afternoonCourse.length == 0 && $data.morningCourse.length == 0 ? {} : {}, {
    p: $data.isTable == false
  }, $data.isTable == false ? {
    q: common_vendor.o(($event) => $options.goImport())
  } : {}, {
    r: $data.afternoonCourse.length !== 0 || $data.morningCourse.length !== 0
  }, $data.afternoonCourse.length !== 0 || $data.morningCourse.length !== 0 ? {
    s: common_vendor.t($data.morningCourse.length + $data.afternoonCourse.length)
  } : {}, {
    t: common_vendor.o(($event) => $options.geToMore()),
    v: common_vendor.f($data.school_hot, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.time),
        c: index,
        d: common_vendor.o(($event) => $options.gotowebView(item), index)
      };
    }),
    w: common_vendor.p({
      type: "success",
      message: $data.message,
      duration: 2e3
    }),
    x: common_vendor.sr("message", "0f858e54-1"),
    y: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
