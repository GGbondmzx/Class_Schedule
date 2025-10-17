"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      howjc: [],
      topHeight: "",
      statusBar: "",
      content: [
        {
          iconPath: "/static/import_scheme.png",
          selectedIconPath: "/static/import_scheme.png",
          text: "导入课表",
          active: false
        },
        {
          iconPath: "/static/editimport.png",
          selectedIconPath: "/static/editimport.png",
          text: "添加课程",
          active: false
        }
      ],
      pattern: {
        color: "#FFF",
        backgroundColor: "#32c2bb",
        selectedColor: "#007AFF",
        buttonColor: "#32c2bb",
        iconColor: "#fff"
      },
      selceted: "",
      firsetweek: "",
      MondayTime: "",
      dayList: [],
      mouth: "",
      show: false,
      alltable: [],
      nowtbale: [],
      isTable: false,
      timemap: [
        {
          start: "8:00",
          end: "8:45"
        },
        {
          start: "8:55",
          end: "9:40"
        },
        {
          start: "10:00",
          end: "10:45"
        },
        {
          start: "10:55",
          end: "11:40"
        },
        {
          start: "14:20",
          end: "15:15"
        },
        {
          start: "15:25",
          end: "16:10"
        },
        {
          start: "16:30",
          end: "17:15"
        },
        {
          start: "17:25",
          end: "18:10"
        },
        {
          start: "19:00",
          end: "19:45"
        },
        {
          start: "19:55",
          end: "20:40"
        },
        { start: "20:50", end: "20:35" },
        { start: "20:45", end: "21:20" }
      ],
      week: "",
      startday: {
        y: 2022,
        m: 8,
        d: 29
      },
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
      array: [
        "第一周",
        "第二周",
        "第三周",
        "第四周",
        "第五周",
        "第六周",
        "第七周",
        "第八周",
        "第九周",
        "第十周",
        "第十一周",
        "第十二周",
        "第十三周",
        "第十四周",
        "第十五周",
        "第十六周"
      ]
    };
  },
  methods: {
    trigger(e) {
      console.log(e);
      if (e.index == 0) {
        common_vendor.index.navigateTo({
          url: "../selectSchool/selectSchool"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "../localclass/localclass"
        });
      }
    },
    goEdit() {
      let item = this.selceted;
      common_vendor.index.navigateTo({
        url: "../edit/edit?item=" + JSON.stringify(item)
      });
    },
    openDio(res) {
      this.selceted = res;
      console.log(res);
      this.$refs.popup.open("center");
    },
    getDayInfo() {
      let dayarr = [7, 1, 2, 3, 4, 5, 6];
      let date = /* @__PURE__ */ new Date();
      let m = date.getMonth() + 1;
      date.getDate();
      this.mouth = this.fix(m, 2);
      let now = /* @__PURE__ */ new Date();
      let nowTime = now.getTime();
      let day = dayarr[now.getDay()];
      let oneDayTime = 24 * 60 * 60 * 1e3;
      let MondayTime = nowTime - (day - 1) * oneDayTime;
      this.MondayTime = MondayTime;
      let xqy = this.fix(common_vendor.dayjs(MondayTime).$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).$D);
      let xqe = this.fix(common_vendor.dayjs(MondayTime).add(1, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(
        1,
        "day"
      ).$D);
      let xqs = this.fix(common_vendor.dayjs(MondayTime).add(2, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(
        2,
        "day"
      ).$D);
      let xqsi = this.fix(common_vendor.dayjs(MondayTime).add(3, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(
        3,
        "day"
      ).$D);
      let xqw = this.fix(common_vendor.dayjs(MondayTime).add(4, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(
        4,
        "day"
      ).$D);
      let xql = this.fix(common_vendor.dayjs(MondayTime).add(5, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(
        5,
        "day"
      ).$D);
      let xqq = this.fix(common_vendor.dayjs(MondayTime).add(6, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(
        6,
        "day"
      ).$D);
      let list = [{
        day: "一",
        time: xqy
      }, {
        day: "二",
        time: xqe
      }, {
        day: "三",
        time: xqs
      }, {
        day: "四",
        time: xqsi
      }, {
        day: "五",
        time: xqw
      }, {
        day: "六",
        time: xql
      }, {
        day: "日",
        time: xqq
      }];
      this.dayList = list;
      console.log(list);
      console.log(common_vendor.dayjs(MondayTime));
    },
    bindPickerChange(e) {
      let item = parseInt(e.detail.value) + 1;
      console.log(e);
      this.week = item;
      console.log(this.week);
      let first = this.firsetweek;
      let MondayTime = this.MondayTime;
      if (item == first) {
        console.log("nochange");
      }
      if (item > first) {
        let bewtten = item - first;
        let xqy = this.fix(common_vendor.dayjs(MondayTime).add(0 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(0 + bewtten * 7, "day").$D);
        let xqe = this.fix(common_vendor.dayjs(MondayTime).add(1 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(1 + bewtten * 7, "day").$D);
        let xqs = this.fix(common_vendor.dayjs(MondayTime).add(2 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(2 + bewtten * 7, "day").$D);
        let xqsi = this.fix(common_vendor.dayjs(MondayTime).add(3 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(3 + bewtten * 7, "day").$D);
        let xqw = this.fix(common_vendor.dayjs(MondayTime).add(4 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(4 + bewtten * 7, "day").$D);
        let xql = this.fix(common_vendor.dayjs(MondayTime).add(5 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(5 + bewtten * 7, "day").$D);
        let xqq = this.fix(common_vendor.dayjs(MondayTime).add(6 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).add(6 + bewtten * 7, "day").$D);
        let list = [{
          day: "一",
          time: xqy
        }, {
          day: "二",
          time: xqe
        }, {
          day: "三",
          time: xqs
        }, {
          day: "四",
          time: xqsi
        }, {
          day: "五",
          time: xqw
        }, {
          day: "六",
          time: xql
        }, {
          day: "日",
          time: xqq
        }];
        this.dayList = list;
      }
      if (item < first) {
        let bewtten = first - item;
        let xqy = this.fix(common_vendor.dayjs(MondayTime).subtract(0 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).subtract(0 + bewtten * 7, "day").$D);
        let xqe = this.fix(common_vendor.dayjs(MondayTime).subtract(1 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).subtract(1 + bewtten * 7, "day").$D);
        let xqs = this.fix(common_vendor.dayjs(MondayTime).subtract(2 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).subtract(2 + bewtten * 7, "day").$D);
        let xqsi = this.fix(common_vendor.dayjs(MondayTime).subtract(3 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(
          common_vendor.dayjs(MondayTime).subtract(3 + bewtten * 7, "day").$D
        );
        let xqw = this.fix(common_vendor.dayjs(MondayTime).subtract(4 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).subtract(4 + bewtten * 7, "day").$D);
        let xql = this.fix(common_vendor.dayjs(MondayTime).subtract(5 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).subtract(5 + bewtten * 7, "day").$D);
        let xqq = this.fix(common_vendor.dayjs(MondayTime).subtract(6 + bewtten * 7, "day").$M + 1, 2) + "/" + this.fix(common_vendor.dayjs(MondayTime).subtract(6 + bewtten * 7, "day").$D);
        let list = [{
          day: "一",
          time: xqy
        }, {
          day: "二",
          time: xqe
        }, {
          day: "三",
          time: xqs
        }, {
          day: "四",
          time: xqsi
        }, {
          day: "五",
          time: xqw
        }, {
          day: "六",
          time: xql
        }, {
          day: "日",
          time: xqq
        }];
        this.dayList = list;
      }
      this.selectweek();
    },
    showpopup() {
      console.log("wtf");
      this.$refs.popup.open("top");
    },
    change(e) {
      this.show = e.show;
      console.log(e);
    },
    tableText(item) {
      let str = item.name;
      if (item.enum == item.nums) {
        if (str.length >= 5) {
          return str.substring(0, 5) + "...";
        } else {
          return str;
        }
      } else {
        if (str.length >= 15) {
          return str.substring(0, 15) + "...";
        } else {
          return str;
        }
      }
    },
    selectweek() {
      let week = this.week;
      console.log(this.week);
      let all = JSON.parse(JSON.stringify(this.alltable));
      let now = all.filter((item) => {
        if (item.attend.indexOf(week) !== -1) {
          console.log(item.attend.indexOf(parseInt(week)));
          return item;
        }
      });
      console.log(now);
      this.nowtbale = now;
    },
    getStyle(item) {
      let color = this.colorarr[(item.enum + +item.day) % 9];
      return {
        "margin-left": (item.day - 1) * 340 / 7 + 2 + "px",
        "margin-top": (item.nums - 1) * 60 + 2.5 + "px",
        "height": (item.enum - item.nums + 1) * 60 - 5 + "px",
        "background-color": color
      };
    },
    getTable() {
      this.getweek();
      let that = this;
      common_vendor.index.getStorage({
        key: "table",
        success(res) {
          console.log(res);
          that.alltable = JSON.parse(res.data);
          that.isTable = true;
          that.selectweek();
          console.log(JSON.parse(res.data));
        },
        fail(res) {
          console.log(res);
        }
      });
    },
    getweek() {
      let day = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      let date = /* @__PURE__ */ new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      day[date.getDay()];
      console.log(y, m, d);
      let week = this.getWeeks(this.startday.y, this.startday.m, this.startday.d, y, m, d);
      this.firsetweek = week;
      this.week = week;
      console.log(week);
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
    fix(num, length) {
      return ("" + num).length < length ? (new Array(length + 1).join("0") + num).slice(-length) : "" + num;
    }
  },
  onLoad() {
    let that = this;
    common_vendor.index.getSystemInfo({
      success(e) {
        that.topHeight = common_vendor.index.upx2px(e.statusBarHeight * 750 / common_vendor.wx$1.getSystemInfoSync().windowWidth);
        console.log(e.statusBarHeight);
        if (e.platform == "ios" || e.platform == "devtools") {
          that.statusBar = 45;
        } else {
          that.statusBar = 50;
        }
      }
    });
    common_vendor.index.getStorage({
      key: "StartDay",
      success(res) {
        that.startday = res.data;
        res.data;
        console.log(res);
        common_vendor.index.getStorage({
          key: "timemap",
          success(time) {
            that.timemap = time.data;
            let arr = new Array();
            for (let i = 0; i < time.data.length; i++) {
              arr.push(i + 1);
            }
            that.howjc = arr;
            console.log(arr);
            that.getTable();
            that.getDayInfo();
            console.log(time);
          }
        });
      }
    });
    console.log(that.topHeight);
  },
  onShow() {
    let that = this;
    common_vendor.index.getSystemInfo({
      success(e) {
        that.topHeight = common_vendor.index.upx2px(e.statusBarHeight * 750 / common_vendor.wx$1.getSystemInfoSync().windowWidth);
        console.log(e.statusBarHeight);
        if (e.platform == "ios" || e.platform == "devtools") {
          that.statusBar = 45;
        } else {
          that.statusBar = 50;
        }
      }
    });
    common_vendor.index.getStorage({
      key: "StartDay",
      success(res) {
        that.startday = res.data;
        res.data;
        console.log(res);
        common_vendor.index.getStorage({
          key: "timemap",
          success(time) {
            that.timemap = time.data;
            let arr = new Array();
            for (let i = 0; i < time.data.length; i++) {
              arr.push(i + 1);
            }
            that.howjc = arr;
            that.getTable();
            that.getDayInfo();
            console.log(time);
            console.log(arr);
          }
        });
      }
    });
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_popup2 + _easycom_uni_fab2)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.selceted.name),
    b: common_vendor.t($data.selceted.attend_str),
    c: common_vendor.t($data.selceted.nums),
    d: common_vendor.t($data.selceted.enum),
    e: common_vendor.t($data.selceted.teacher),
    f: common_vendor.t($data.selceted.room),
    g: common_vendor.sr("popup", "4f870e9c-0"),
    h: common_vendor.o($options.change),
    i: common_vendor.p({
      ["background-color"]: "none"
    }),
    j: $data.topHeight + "px",
    k: common_vendor.t($data.week),
    l: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    m: _ctx.index,
    n: $data.array,
    o: $data.statusBar + "px",
    p: common_vendor.t($data.mouth),
    q: common_vendor.f($data.dayList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.day),
        b: common_vendor.t(item.time),
        c: index
      };
    }),
    r: common_vendor.f($data.howjc, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.t($data.timemap[item - 1].start),
        c: common_vendor.t($data.timemap[item - 1].end),
        d: index
      };
    }),
    s: common_vendor.f($data.howjc, (wtf, wtff, i0) => {
      return {
        a: wtff
      };
    }),
    t: common_vendor.f($data.nowtbale, (item, index, i0) => {
      return {
        a: common_vendor.t($options.tableText(item)),
        b: common_vendor.t(item.room),
        c: common_vendor.t(item.attend_str),
        d: common_vendor.s("margin-right:5rpx;margin-left:calc(" + (item.day - 1) + " * 100% / 7 + 5rpx);margin-top:" + ((item.nums - 1) * 60 + 2.5) * 2 + "rpx;margin-bottom:5rpx;height:" + ((item.enum - item.nums + 1) * 60 - 5) * 2 + "rpx;background-color:" + $data.colorarr[(item.enum + item.day) * item.name.length % 7] + ";"),
        e: index,
        f: common_vendor.o(($event) => $options.openDio(item), index)
      };
    }),
    v: common_vendor.o($options.trigger),
    w: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      direction: "horizontal",
      content: $data.content
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/timetable/timetable.vue"]]);
wx.createPage(MiniProgramPage);
