"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      school: "",
      school_id: null,
      selectWay: [
        {
          name: "教务系统导入",
          tips: "需要输入教务系统账号密码",
          isOK: true,
          way: "../import/import"
        },
        {
          name: "班级课表导入",
          tips: "无需输入任何账号密码",
          isOK: true,
          way: "../class/class"
        },
        {
          name: "输入学号导入课表",
          tips: "无需密码导入个人专属课表！",
          isOK: true,
          way: "../xh/xh"
        }
      ]
    };
  },
  methods: {
    wayto(item) {
      let that = this;
      common_vendor.index.navigateTo({
        url: item.way + "?number=" + that.school_id
      });
    }
  },
  onLoad(res) {
    let that = this;
    that.school_id = Number(res.number);
    common_vendor.index.getStorage({
      key: "school_list",
      success(resu) {
        console.log(resu);
        for (let i = 0; i < resu.data.length; i++) {
          if (resu.data[i].id == that.school_id) {
            that.selectWay[0].isOK = resu.data[i].waytospider == 1 ? true : false;
            that.selectWay[1].isOK = resu.data[i].waytoclass == 1 ? true : false;
            that.selectWay[2].isOK = resu.data[i].waytoxh == 1 ? true : false;
            console.log(that.selectWay);
          }
        }
      }
    });
    console.log(Number(res.number));
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.selectWay, (item, index, i0) => {
      return common_vendor.e({
        a: item.isOK
      }, item.isOK ? {
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.tips)
      } : {}, {
        d: index,
        e: common_vendor.o(($event) => $options.wayto(item), index)
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/selectway/selectway.vue"]]);
wx.createPage(MiniProgramPage);
