// pages/index/index.js
Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    courseInput: '',
    courseList: []
  },

  onLoad() {
    // 检查是否支持getUserProfile接口
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    
    // 检查本地是否有用户信息
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo.nickName) {
      this.setData({
        userInfo,
        hasUserInfo: true
      })
    }
    
    // 加载本地存储的课程表
    const courseSchedule = wx.getStorageSync('courseSchedule')
    if (courseSchedule.length > 0) {
      this.setData({
        courseList: courseSchedule
      })
    }
  },

  // 获取用户信息
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善用户信息',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 保存到本地存储
        wx.setStorageSync('userInfo', res.userInfo)
      }
    })
  },

  // 输入课程表内容
  onCourseInput(e) {
    this.setData({
      courseInput: e.detail.value
    })
  },

  // 解析课程表
  parseCourse() {
    if (!this.data.courseInput.trim()) {
      wx.showToast({
        title: '请输入课程表内容',
        icon: 'none'
      })
      return
    }
    
    // 简单解析逻辑，可根据实际格式调整
    const lines = this.data.courseInput.split('\n')
    const courseList = []
    
    lines.forEach((line, index) => {
      if (line.trim()) {
        // 假设课程格式：课程名 时间 地点
        const parts = line.split(/\s+/)
        courseList.push({
          id: index,
          name: parts[0] || '未知课程',
          time: parts[1] || '时间未设置',
          location: parts[2] || '地点未设置',
          original: line
        })
      }
    })
    
    this.setData({
      courseList
    })
    
    // 保存到本地存储
    wx.setStorageSync('courseSchedule', courseList)
    
    wx.showToast({
      title: '解析成功',
      icon: 'success'
    })
  },

  // 导出课程表（复制到剪贴板）
  exportCourse() {
    if (this.data.courseList.length === 0) {
      wx.showToast({
        title: '没有课程表可导出',
        icon: 'none'
      })
      return
    }
    
    // 拼接课程表文本
    let text = '我的课程表：\n'
    this.data.courseList.forEach(course => {
      text += `${course.original}\n`
    })
    
    // 复制到剪贴板
    wx.setClipboardData({
      data: text,
      success() {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success'
        })
      }
    })
  },

  // 清空课程表
  clearCourse() {
    this.setData({
      courseInput: '',
      courseList: []
    })
    wx.setStorageSync('courseSchedule', [])
    wx.showToast({
      title: '已清空',
      icon: 'success'
    })
  }
})
    