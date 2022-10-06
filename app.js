// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    weekArray: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周'],
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], // 周一为起始日
    coursePerDay: 12,   // 每天几节课
    colorArray: [
      "#AEEC34",
      "#FFC44F",
      "#85B0FD",
      "#FEA17C",
      "#FF9392",
      "#D48DF9",
      "#7FCFF8",
      "#85B8CF", 
      "#90C652", 
      "#D8AA5A", 
      "#FC9F9D", 
      "#0A9A84", 
      "#61BC69", 
      "#12AEF3", 
      "#E29AAD"]
  }
})
