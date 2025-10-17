// app.js
App({
  onLaunch() {
    // 初始化本地存储
    if (!wx.getStorageSync('userInfo')) {
      wx.setStorageSync('userInfo', {})
    }
    if (!wx.getStorageSync('courseSchedule')) {
      wx.setStorageSync('courseSchedule', [])
    }
  },
  globalData: {
    userInfo: null
  }
})
    