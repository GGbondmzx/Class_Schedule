"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showvccode: false,
      buttonban: false,
      from: {
        username: "",
        school_id: ""
      },
      schoolList: [],
      school: "",
      check: false,
      base64code: ""
    };
  },
  methods: {
    getvccode() {
      let that = this;
      if (this.showvccode == false) {
        this.showvccode = true;
      }
      console.log("获取vccode");
      let token = common_vendor.index.getStorageSync("token");
      common_vendor.index.request({
        url: "https://schoolpro.apiicu.com/api/getVccode",
        data: {
          token
        },
        method: "POST",
        success(res) {
          console.log(res);
          that.base64code = res.data.data;
        },
        fail(error) {
          console.log(error);
        }
      });
    },
    goMine() {
      common_vendor.index.switchTab({
        url: "../mine/mine"
      });
    },
    checkboxChange: function(e) {
      if (this.check == true) {
        this.check = false;
      } else {
        this.check = true;
      }
    },
    jumpTo() {
      common_vendor.index.navigateTo({
        url: "../shouze/shouze"
      });
    },
    backToSelect() {
      common_vendor.index.navigateTo({
        url: "../selectSchool/selectSchool"
      });
    },
    submit(e) {
      let that = this;
      console.log(this.check);
      console.log(e);
      if (this.check) {
        that.buttonban = true;
        common_vendor.index.showLoading({
          title: "加载中"
        });
        common_vendor.index.getStorage({
          key: "token",
          success(res) {
            that.$http({
              url: "ImportByXH",
              method: "POST",
              data: {
                school_id: that.from.school_id,
                xh: that.from.username,
                token: res.data
              }
            }).then((res1) => {
              console.log("then" + JSON.stringify(res1));
              if (res1.data.code == 200) {
                that.getTable(res.data);
              } else {
                if (res1.data.code == 205) {
                  that.buttonban = false;
                  common_vendor.index.hideLoading();
                  common_vendor.index.showToast({
                    title: "请检查账户密码是否正确",
                    icon: "error",
                    success(res2) {
                      console.log("fuckme");
                    },
                    fail(res2) {
                      console.log("wtf");
                    }
                  });
                } else {
                  if (res1.data.code == 206) {
                    that.buttonban = false;
                    common_vendor.index.hideLoading();
                    common_vendor.index.showToast({
                      title: "教务系统异常！",
                      icon: "error",
                      success(res2) {
                        console.log("fuckme");
                      },
                      fail(res2) {
                        console.log("wtf");
                      }
                    });
                  } else {
                    that.buttonban = false;
                    common_vendor.index.hideLoading();
                    common_vendor.index.request({
                      url: "https://schoolpro.apiicu.com/api/logerror",
                      data: {
                        token: res.data,
                        error: res1.data
                      },
                      method: "POST"
                    });
                    common_vendor.index.showToast({
                      title: "未知错误请联系管理员",
                      icon: "error",
                      success(res2) {
                        console.log("fuckme");
                      },
                      fail(res2) {
                        console.log("wtf");
                      }
                    });
                  }
                }
              }
            }).catch((error) => {
              common_vendor.index.request({
                url: "https://schoolpro.apiicu.com/api/logerror",
                data: {
                  token: res.data,
                  error
                },
                method: "POST"
              });
              that.buttonban = false;
              common_vendor.index.hideLoading();
              console.log("fff" + error);
            });
          },
          fail() {
            that.buttonban = false;
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "没有token",
              icon: "error",
              success(res) {
                console.log("fuckme");
              },
              fail(res) {
                console.log("wtf");
              }
            });
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "请阅读用户协议！",
          icon: "error"
        });
      }
      console.log("submit" + this.from.username);
    },
    getTable(token) {
      let that = this;
      this.$http({
        url: "getTable",
        method: "POST",
        data: {
          token
        }
      }).then((res) => {
        that.buttonban = false;
        common_vendor.index.hideLoading();
        if (res.data.code == 200) {
          common_vendor.index.setStorage({
            key: "table",
            data: res.data.data,
            success() {
              common_vendor.index.setStorage({
                data: that.from.school_id,
                key: "school_id"
              });
              common_vendor.index.showModal({
                title: "导入成功！",
                content: "课表导入成功！",
                success(res2) {
                  if (res2.confirm) {
                    common_vendor.index.switchTab({
                      url: "../timetable/timetable"
                    });
                  } else if (res2.cancel) {
                    console.log(res2);
                  }
                }
              });
            }
          });
        } else if (res.data.code == 201) {
          that.buttonban = false;
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            title: "未导入数据"
          });
        } else {
          let error = res;
          common_vendor.index.request({
            url: "https://schoolpro.apiicu.com/api/logerror",
            data: {
              token,
              error
            },
            method: "POST"
          });
        }
        console.log(res);
      }).catch((error) => {
        common_vendor.index.request({
          url: "https://schoolpro.apiicu.com/api/logerror",
          data: {
            token,
            error
          },
          method: "POST"
        });
        that.buttonban = false;
        common_vendor.index.hideLoading();
        console.log(error);
        common_vendor.index.showToast({
          title: "出现未知错误！请联系管理员！",
          icon: "error"
        });
      });
    }
  },
  onLoad(res) {
    let that = this;
    if (res.number == null) {
      common_vendor.index.getStorage({
        key: "school_id",
        success(res1) {
          that.from.school_id = Number(res1.data);
          common_vendor.index.getStorage({
            key: "school_list",
            success(sl) {
              for (let i = 0; i < sl.data.length; i++) {
                if (sl.data[i].id == that.from.school_id) {
                  that.school = sl.data[i].name;
                  console.log(that.selectWay);
                }
              }
            }
          });
        },
        fail() {
          common_vendor.index.navigateTo({
            url: "/pages/selectSchool/selectSchool"
          });
        }
      });
    } else {
      that.from.school_id = Number(res.number);
      common_vendor.index.getStorage({
        key: "school_list",
        success(sl) {
          for (let i = 0; i < sl.data.length; i++) {
            if (sl.data[i].id == that.from.school_id) {
              that.school = sl.data[i].name;
              console.log(that.selectWay);
            }
          }
        }
      });
    }
    console.log(Number(res.number));
  }
};
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  _easycom_uni_notice_bar2();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  _easycom_uni_notice_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.goMine()),
    b: common_vendor.t($data.school),
    c: common_vendor.o(($event) => $options.backToSelect()),
    d: common_vendor.p({
      showIcon: true,
      scrollable: true,
      single: true,
      text: "温馨提示：本次导入不涉及密码即可导入个人专属课表,安全放心。"
    }),
    e: $data.from.username,
    f: common_vendor.o(($event) => $data.from.username = $event.detail.value),
    g: $data.from.school_id == 2
  }, $data.from.school_id == 2 ? common_vendor.e({
    h: $data.from.vccode,
    i: common_vendor.o(($event) => $data.from.vccode = $event.detail.value),
    j: $data.showvccode
  }, $data.showvccode ? {
    k: $data.base64code,
    l: common_vendor.o(($event) => $options.getvccode())
  } : {}, {
    m: !$data.showvccode
  }, !$data.showvccode ? {
    n: common_vendor.o(($event) => $options.getvccode())
  } : {}) : {}, {
    o: $data.check,
    p: common_vendor.o(($event) => $options.checkboxChange()),
    q: common_vendor.o(($event) => $options.jumpTo(_ctx.e)),
    r: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    s: $data.buttonban
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniappp/schoolproV1/pages/xh/xh.vue"]]);
wx.createPage(MiniProgramPage);
