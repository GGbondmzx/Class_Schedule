"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://v1api.apiicu.com/api/";
const myRequest = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        common_vendor.index.showToast({
          title: "请求接口失败(可能服务器没有开)",
          icon: "fail"
        });
        reject(err);
      }
    });
  });
};
exports.myRequest = myRequest;
