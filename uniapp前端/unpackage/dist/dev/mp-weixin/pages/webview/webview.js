"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      src: ""
    };
  },
  methods: {},
  onLoad(res) {
    if (JSON.stringify(res) == "{}") {
      this.src = "http://ycit2022.apiicu.com/";
      console.log("add");
    } else {
      console.log(res);
      this.src = res.url;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.src
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/webview/webview.vue"]]);
wx.createPage(MiniProgramPage);
