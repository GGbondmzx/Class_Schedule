"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isshow: false,
      school_id: "",
      items: [],
      bh_id: "",
      isok: false
    };
  },
  methods: {
    submit() {
      let token = common_vendor.index.getStorageSync("token");
      let that = this;
      if (this.isok) {
        that.$http({
          url: "ImportByClass",
          method: "POST",
          data: {
            token,
            bh_id: that.bh_id
          }
        }).then((res) => {
          console.log(res);
        });
      }
    },
    onchange(e) {
      let that = this;
      const value = e.detail.value;
      console.log(value);
      if (value.length == 3) {
        let bh_id = value[2];
        console.log(bh_id);
        that.bh_id = bh_id;
        that.isok = true;
      }
    },
    onnodeclick(node) {
      console.log(node);
    }
  },
  onLoad(res) {
    let that = this;
    that.school_id = res.number;
    console.log(that.school_id);
    let token = common_vendor.index.getStorageSync("token");
    this.$http({
      url: "getClassList",
      method: "post",
      data: {
        "school_id": that.school_id,
        token
      }
    }).then((res2) => {
      console.log(res2);
      that.items = res2.data.data;
      console.log(res2.data.data);
    });
  }
};
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  _easycom_uni_data_picker2();
}
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
if (!Math) {
  _easycom_uni_data_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onchange),
    b: common_vendor.o($options.onnodeclick),
    c: common_vendor.p({
      localdata: $data.items,
      placeholder: "选择学院|专业|班级导入课表",
      ["popup-title"]: "选择学院|专业|班级导入课表"
    }),
    d: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    e: $data.isshow
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/class/class.vue"]]);
wx.createPage(MiniProgramPage);
