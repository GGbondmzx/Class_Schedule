"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      appname: ""
    };
  },
  methods: {},
  onLoad() {
    let that = this;
    common_vendor.index.getStorage({
      key: "setting",
      success(res) {
        that.appname = res.data.appname;
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.appname),
    b: common_vendor.t($data.appname),
    c: common_vendor.t($data.appname),
    d: common_vendor.t($data.appname),
    e: common_vendor.t($data.appname),
    f: common_vendor.t($data.appname),
    g: common_vendor.t($data.appname),
    h: common_vendor.t($data.appname),
    i: common_vendor.t($data.appname),
    j: common_vendor.t($data.appname),
    k: common_vendor.t($data.appname),
    l: common_vendor.t($data.appname),
    m: common_vendor.t($data.appname),
    n: common_vendor.t($data.appname)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/shouze/shouze.vue"]]);
wx.createPage(MiniProgramPage);
