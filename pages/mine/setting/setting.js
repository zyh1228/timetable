// pages/mine/setting/setting.js
import data from '../../../utils/data'
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalWeek: 16,
    coursePerDay: 12,
    schoolTime: [],
    schoolTimeDisplay: [],
    // courseTime: [],
    courseTimeDisplay: [],
  },

  totalWeekChanged(e) {
    this.setData({
      totalWeek: Number(e.detail.value)
    })
  },

  coursePerDayChanged(e) {
    let coursePerDay = Number(e.detail.value)
    let courseTimeDisplay = this.data.courseTimeDisplay
    // let courseTime = this.data.schoolTime
    for (let index = 0; index < coursePerDay; index++) {
      // if (courseTime[index] == undefined)
        // courseTime[index] = [] 
      if (courseTimeDisplay[index] == undefined)
        courseTimeDisplay[index] = []
    }
    this.setData({
      coursePerDay: coursePerDay
    })
  },

  schoolTimeChanged(e) {
    this.setData({
      schoolTimeDisplay: e.detail.value,
      schoolTime: e.detail.value.split('-')
    })
  },

  courseTimeChanded(e) {
    let flag = e.currentTarget.dataset.flag
    let index = e.currentTarget.dataset.index
    let time = e.detail.value
    let courseTimeDisplay = this.data.courseTimeDisplay
    if (flag == 'start')
      flag = 0
    else
      flag = 1
    courseTimeDisplay[index][flag] = time
    this.setData({
      courseTimeDisplay: courseTimeDisplay
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    data.getScheduleInfo((scheduleInfo) => {
      this.setData({
        totalWeek: scheduleInfo.totalWeek,
        coursePerDay: scheduleInfo.coursePerDay,
        schoolTime: scheduleInfo.schoolTime,
        schoolTimeDisplay: scheduleInfo.schoolTime[0] + '-' + scheduleInfo.schoolTime[1] + '-' + scheduleInfo.schoolTime[2],
        courseTimeDisplay: scheduleInfo.courseTime,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})