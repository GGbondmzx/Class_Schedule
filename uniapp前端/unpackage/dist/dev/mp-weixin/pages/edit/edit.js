"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      indexedit: null,
      isshow: false,
      allTable: [],
      classitem: {
        name: "",
        teacher: "",
        attend_str: "",
        //备注
        enum: "1",
        //结束
        nums: "1",
        //开始
        attend: [],
        //周次，
        day: 1
      },
      isChange: false,
      info: false,
      start: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      weeks: [1, 2, 3, 4, 5, 6, 7],
      index: 0,
      index2: 0,
      index3: 0
    };
  },
  methods: {
    upupup(data) {
      let token = common_vendor.index.getStorageSync("token");
      this.$http({
        url: "editTable",
        method: "post",
        data: {
          table: JSON.stringify(data),
          token
        }
      }).then((res) => {
        console.log(res);
        common_vendor.index.showToast({
          title: "编辑成功！",
          icon: "success"
        });
        common_vendor.index.navigateTo({
          url: "/pages/localclass/localclass"
        });
      });
    },
    addclassitembyinfo(res) {
      let that = this;
      common_vendor.index.getStorage({
        key: "table",
        success(successres) {
          console.log(successres.data);
          let newitem = JSON.parse(successres.data);
          newitem.splice(that.indexedit, 1);
          newitem = newitem.push(res);
          common_vendor.index.setStorage({
            key: "table",
            data: JSON.stringify(newitem),
            success() {
              console.log("添加成功");
              that.upupup(newitem);
            },
            fail(fail) {
              console.log("获取到旧数据但是添加新数据失败", fail);
            }
          });
        },
        fail() {
          common_vendor.index.setStorage({
            key: "table",
            data: JSON.stringify([res]),
            success() {
              console.log("添加成功");
              that.upupup([res]);
            },
            fail(fail) {
              console.log("首次添加失败", fail);
            }
          });
        }
      });
    },
    addclassitem(res) {
      let that = this;
      common_vendor.index.getStorage({
        key: "table",
        success(successres) {
          console.log(successres.data);
          let newitem = JSON.stringify(JSON.parse(successres.data).push(res));
          common_vendor.index.setStorage({
            key: "table",
            data: newitem,
            success() {
              console.log("添加成功");
              that.upupup(newitem);
            },
            fail(fail) {
              console.log("获取到旧数据但是添加新数据失败", fail);
            }
          });
        },
        fail() {
          common_vendor.index.setStorage({
            key: "table",
            data: JSON.stringify([res]),
            success() {
              console.log("添加成功");
              that.upupup(JSON.stringify([res]));
            },
            fail(fail) {
              console.log("首次添加失败", fail);
            }
          });
        }
      });
    },
    checkIsOK(item) {
      let result = true;
      item.name.length == 0 ? result = false : null;
      item.teacher.length == 0 ? result = false : null;
      item.attend.length == 0 ? result = false : null;
      item.attend.day == 0 ? result = false : null;
      console.log(item.name.length, item.teacher.length, item.attend.length);
      if (item.enum < item.nums) {
        result = false;
      }
      common_vendor.index.getStorage({
        key: "table",
        success(success) {
          let rtable = JSON.parse(success.data);
          item.attend.forEach((item0) => {
            rtable.forEach((item2) => {
              if (item2.attend.indexOf(item0) != -1) {
                if (item.day == item2.day) {
                  if (item.enum < item2.nums) {
                    return false;
                  }
                }
              }
            });
          });
        },
        fail(fail) {
        }
      });
      return result;
    },
    add() {
      let that = this;
      let result = this.checkIsOK(that.classitem);
      console.log(result);
      if (result) {
        if (that.info == false) {
          that.addclassitem(that.classitem);
        } else {
          that.addclassitembyinfo(that.classitem);
        }
      } else {
        common_vendor.index.showToast({
          title: "请检查数据",
          icon: "error"
        });
      }
    },
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.index = e.detail.value;
      this.classitem.nums = Number(e.detail.value) + 1;
      console.log(this.classitem.nums);
    },
    bindPickerChange2: function(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.index2 = e.detail.value;
      this.classitem.enum = Number(e.detail.value) + 1;
      console.log(this.classitem.enum);
    },
    bindPickerChange3: function(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.index3 = e.detail.value;
      this.classitem.day = Number(e.detail.value) + 1;
      console.log(this.classitem.day);
    },
    change(e) {
      let that = this;
      let arr = this.classitem.attend.indexOf(e);
      if (arr == -1) {
        that.classitem.attend.push(e);
        that.classitem.attend = that.classitem.attend.sort();
        console.log(that.classitem.attend);
      } else {
        that.classitem.attend.splice(arr, 1);
        console.log(that.classitem.attend);
      }
    }
  },
  onLoad(res) {
    let that = this;
    console.log(res);
    if (JSON.stringify(res) == "{}") {
      console.log("add");
    }
    if (res.index != void 0) {
      that.info = true;
      console.log("edit");
      common_vendor.index.getStorage({
        key: "table",
        success(classes) {
          let item = JSON.parse(classes.data)[res.index];
          that.classitem = item;
          that.indexedit = res.index;
          console.log(Number(item.enum - 1));
          that.index = Number(item.nums - 1);
          that.index2 = Number(item.enum - 1);
          that.index3 = Number(item.day - 1);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.classitem.name,
    b: common_vendor.o(($event) => $data.classitem.name = $event.detail.value),
    c: common_vendor.f([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: $data.classitem.attend.indexOf(item) == -1 ? "" : "red",
        c: common_vendor.o(($event) => $options.change(item), index),
        d: index,
        e: "133014ae-1-" + i0 + ",133014ae-0"
      };
    }),
    d: common_vendor.p({
      column: 5,
      showBorder: false
    }),
    e: $data.classitem.teacher,
    f: common_vendor.o(($event) => $data.classitem.teacher = $event.detail.value),
    g: common_vendor.t($data.start[$data.index]),
    h: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    i: $data.index,
    j: $data.start,
    k: common_vendor.t($data.start[$data.index2]),
    l: common_vendor.o((...args) => $options.bindPickerChange2 && $options.bindPickerChange2(...args)),
    m: $data.index2,
    n: $data.start,
    o: common_vendor.t($data.start[$data.index3]),
    p: common_vendor.o((...args) => $options.bindPickerChange3 && $options.bindPickerChange3(...args)),
    q: $data.index3,
    r: $data.weeks,
    s: common_vendor.o((...args) => $options.add && $options.add(...args)),
    t: $data.isshow
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
