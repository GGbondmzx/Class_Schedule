"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      school_id: "",
      allInfo: []
    };
  },
  methods: {
    getDate() {
      let that = this;
      console.log(this.school_id);
      let school_id = this.school_id;
      common_vendor.index.request({
        url: "https://schoolpro.apiicu.com/api/getInfoList",
        method: "POST",
        data: {
          school_id
        },
        success(res) {
          that.allInfo = res.data.data.sort(function(a, b) {
            return b.id - a.id;
          });
          console.log(JSON.stringify(res.data));
        },
        fail(error) {
          console.log("getDate+fail:" + error);
        }
      });
    },
    gotowebView(i) {
      common_vendor.index.navigateTo({
        url: "../webview/webview?url=" + i.url
      });
    }
  },
  onLoad() {
    let that = this;
    common_vendor.index.getStorage({
      key: "school_id",
      success(res) {
        that.school_id = res.data;
        that.getDate();
      },
      fail(error) {
        that.school_id = 1;
        that.getDate();
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.allInfo, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.time),
        c: index,
        d: common_vendor.o(($event) => $options.gotowebView(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/moreInfo/moreInfo.vue"]]);
wx.createPage(MiniProgramPage);
