"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const http_api = require("./http/api.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/mine/mine.js";
  "./pages/timetable/timetable.js";
  "./pages/import/import.js";
  "./pages/shouze/shouze.js";
  "./pages/selectSchool/selectSchool.js";
  "./pages/webview/webview.js";
  "./pages/edit/edit.js";
  "./pages/moreInfo/moreInfo.js";
  "./pages/push/push.js";
  "./pages/selectway/selectway.js";
  "./pages/class/class.js";
  "./pages/localclass/localclass.js";
  "./pages/xh/xh.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniappp/schoolproV1/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$http = http_api.myRequest;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
