"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isOkUrl: {
        is: "../../static/isOk.png",
        onOk: "../../static/noOk.png"
      },
      schoolList: []
    };
  },
  methods: {
    goToSelectWay(number) {
      common_vendor.index.navigateTo({
        url: "../selectway/selectway?number=" + number
      });
    },
    goToImport(number) {
      common_vendor.index.navigateTo({
        url: "../import/import?number=" + number
      });
    },
    stopJump() {
      common_vendor.index.showToast({
        title: "该学校正在测试阶段！",
        icon: "error"
      });
    }
  },
  onLoad() {
    let that = this;
    common_vendor.index.getStorage({
      key: "school_list",
      success(res) {
        console.log(res);
        that.schoolList = res.data;
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.schoolList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.nickname),
        c: item.ways == 1 ? $data.isOkUrl.is : $data.isOkUrl.onOk,
        d: index,
        e: common_vendor.o(($event) => item.ways == 1 ? $options.goToSelectWay(item.id) : $options.stopJump(), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/selectSchool/selectSchool.vue"]]);
wx.createPage(MiniProgramPage);
