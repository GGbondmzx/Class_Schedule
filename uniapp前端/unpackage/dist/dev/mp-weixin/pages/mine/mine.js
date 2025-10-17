"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      appname: "",
      applogo: "",
      checked: false,
      school: "未选择学校",
      schoolList: []
    };
  },
  methods: {
    goToPush() {
      common_vendor.index.getStorage({
        key: "school_id",
        success(res) {
          common_vendor.index.navigateTo({
            url: "/pages/push/push"
          });
        },
        fail(error) {
          common_vendor.index.showModal({
            title: "提示",
            content: "您还未导入课表,是否立即前往?",
            success: function(res) {
              if (res.confirm) {
                console.log("用户点击确定");
                common_vendor.index.navigateTo({
                  url: "/pages/selectSchool/selectSchool"
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
        }
      });
    },
    unOk() {
      common_vendor.index.showToast({
        title: "暂未开放！",
        icon: "error"
      });
    },
    openPush() {
      let that = this;
      common_vendor.index.getStorage({
        key: "token",
        success(res) {
          that.$http({
            url: "openPush",
            method: "POST",
            data: {
              token: res.data
            }
          }).then((res1) => {
            common_vendor.index.showToast({
              title: "订阅成功！",
              icon: "success"
            });
          }).catch((res2) => {
            common_vendor.index.showToast({
              title: "订阅成功！",
              icon: "success"
            });
          });
        }
      });
    },
    wxshare() {
      common_vendor.index.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 1,
        summary: "我正在使用盐小助微信小程序，赶紧跟我一起来体验！",
        success: function(res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function(err) {
          console.log("fail:" + JSON.stringify(err));
        }
      });
    },
    gotoImport() {
      common_vendor.index.navigateTo({
        url: "../import/import"
      });
    },
    jumpTo(url) {
      common_vendor.index.navigateTo({
        url: "../" + url + "/" + url
      });
    }
  },
  onLoad() {
    let that = this;
    common_vendor.index.getStorage({
      key: "setting",
      success(res) {
        that.appname = res.data.appname;
        that.applogo = res.data.applogo;
      }
    });
    common_vendor.index.getStorage({
      key: "school_list",
      success(res) {
        that.schoolList = res.data;
      }
    });
    common_vendor.wx$1.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },
  onShow() {
    let that = this;
    common_vendor.index.getStorage({
      key: "school_list",
      success(res) {
        that.schoolList = res.data;
        common_vendor.index.getStorage({
          key: "school_id",
          success(res2) {
            that.school = that.schoolList[res2.data - 1].name;
          },
          fail(res2) {
          }
        });
      }
    });
    common_vendor.index.getStorage({
      key: "setting",
      success(res) {
        that.appname = res.data.appname;
        that.applogo = res.data.applogo;
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.applogo,
    b: common_vendor.t($data.school),
    c: common_vendor.t($data.appname),
    d: common_vendor.o(($event) => $options.jumpTo("selectSchool")),
    e: common_vendor.o(($event) => $options.jumpTo("selectSchool")),
    f: common_vendor.o(($event) => $options.jumpTo("localclass")),
    g: common_vendor.o(($event) => $options.goToPush()),
    h: common_vendor.o((...args) => $options.unOk && $options.unOk(...args)),
    i: common_vendor.o(($event) => $options.jumpTo("shouze"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
