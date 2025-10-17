"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      appname: "",
      wxname: "",
      wxlogo: "",
      school_id: "1",
      schoolList: [],
      name: "",
      url: "",
      checked: false
    };
  },
  methods: {
    switchChange(e) {
      console.log(e);
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
            if (res1.data.code == 201) {
              common_vendor.index.showToast({
                title: "未导入课表！",
                icon: "error"
              });
              that.checked = false;
            } else {
              common_vendor.index.showToast({
                title: res1.data.data,
                icon: "success"
              });
            }
          }).catch((res2) => {
            console.log(res2);
          });
        }
      });
    }
  },
  onLoad() {
    let that = this;
    common_vendor.index.getStorage({
      key: "setting",
      success(res) {
        that.appname = res.data.appname;
        that.wxname = res.data.wxname;
        that.wxlogo = res.data.wxlogo;
      }
    });
    common_vendor.index.getStorage({
      key: "token",
      success(res) {
        that.$http({
          url: "getPush",
          method: "POST",
          data: {
            token: res.data
          }
        }).then((res1) => {
          console.log(res1);
          if (res1.data.data == "已经开启订阅") {
            that.checked = true;
          }
        }).catch((res2) => {
        });
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.appname),
    b: common_vendor.t($data.wxname),
    c: $data.wxlogo,
    d: common_vendor.o((...args) => $options.switchChange && $options.switchChange(...args)),
    e: $data.checked
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/push/push.vue"]]);
wx.createPage(MiniProgramPage);
