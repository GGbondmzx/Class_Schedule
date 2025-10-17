"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      rlinfo: null,
      longpress: null,
      options: [{
        text: "编辑",
        style: {
          backgroundColor: "#007aff",
          height: "156rpx"
        }
      }, {
        text: "删除",
        style: {
          backgroundColor: "#dd524d"
        }
      }],
      alllocal: [],
      pattern: {
        color: "#FFF",
        backgroundColor: "#32c2bb",
        selectedColor: "#007AFF",
        buttonColor: "#32c2bb",
        iconColor: "#fff"
      }
    };
  },
  methods: {
    change(e, ee) {
      let that = this;
      console.log(e, ee);
      if (e.index == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/edit/edit?index=" + ee
        });
      }
      if (e.index == 1) {
        common_vendor.index.getStorage({
          key: "table",
          success(res) {
            let all = JSON.parse(res.data);
            all.splice(ee, 1);
            that.alllocal = all;
            let token = common_vendor.index.getStorageSync("token");
            that.$http({
              url: "editTable",
              method: "POST",
              data: {
                token,
                table: JSON.stringify(all)
              }
            }).then((res2) => {
              common_vendor.index.setStorage({
                key: "table",
                data: JSON.stringify(all)
              });
            });
          }
        });
      }
    },
    changeshow(index) {
      let that = this;
      if (index == that.longpress) {
        that.longpress = null;
      } else {
        that.longpress = index;
      }
    },
    fabClick() {
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit"
      });
    }
  },
  onShow() {
    let that = this;
    common_vendor.index.getStorage({
      key: "table",
      success(res) {
        console.log(res);
        that.alllocal = JSON.parse(res.data);
      },
      fail() {
      }
    });
  },
  onLoad() {
    let that = this;
    common_vendor.index.getStorage({
      key: "table",
      success(res) {
        console.log(res);
        that.alllocal = JSON.parse(res.data);
      },
      fail() {
      }
    });
  }
};
if (!Array) {
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_load_more2 + _easycom_uni_fab2)();
}
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_load_more + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.alllocal, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.day),
        c: common_vendor.t(item.nums),
        d: common_vendor.t(item.enum),
        e: common_vendor.o(($event) => $options.changeshow(index), index),
        f: common_vendor.o(($event) => $options.change($event, index), index),
        g: "8c5ff2e4-1-" + i0 + "," + ("8c5ff2e4-0-" + i0),
        h: common_vendor.p({
          ["right-options"]: $data.options,
          show: $data.longpress == index ? "right" : "none"
        }),
        i: index,
        j: "8c5ff2e4-0-" + i0
      };
    }),
    b: common_vendor.p({
      status: "noMore"
    }),
    c: common_vendor.o($options.fabClick),
    d: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      direction: "horizontal"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/localclass/localclass.vue"]]);
wx.createPage(MiniProgramPage);
