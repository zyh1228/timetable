// pages/schedule/details/details.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursePerDay: 0,
    name: '',
    address: '',
    other: '',
    weekArray: [],
    beginWeek: null,
    endWeek: null,
    week: [],
    weekIndex: 0,
    jie: [],
    jieIndex: 0,
    number: [],
    numberIndex: 0,
    // course: {"isToday": this.data.weekIndex, "jie": this.data.jieIndex, "classNumber": this.data.numberIndex, "name": null, "address": null },
  },

  nameChanged(e) {
    this.setData({
      name: e.detail.value
    })
  },

  beginWeekChanged(e) {
    this.setData({
      beginWeek: e.detail.value
    })
  },

  endWeekChanged(e) {
    this.setData({
      endWeek: e.detail.value
    })
  },

  weekChanged(e) {
    this.setData({
      weekIndex: e.detail.value
    })
  },

  jieChanded(e) {
    let index = e.detail.value
    let number = []
    for (let i = 0; i < this.data.coursePerDay - index; i++) {
      number.push((i + 1) + '节')
    }
    let numberIndex = number.length > this.data.numberIndex ? this.data.numberIndex : 0
    this.setData({
      jieIndex: index,
      number: number,
      numberIndex: numberIndex,
    })
  },

  numberChanded(e) {
    this.setData({
      numberIndex: e.detail.value
    })
  },

  addressChanged(e) {
    this.setData({
      address: e.detail.value
    })
  },

  otherChanged(e) {
    this.setData({
      other: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let coursePerDay = app.globalData.coursePerDay
    let jie = []
    let number = []
    for (let i = 0; i < coursePerDay; i++) {
      jie.push('第' + (i + 1) + '节')
      number.push((i + 1) + '节')
    }
    this.setData({
      coursePerDay: coursePerDay,
      weekArray: app.globalData.weekArray,
      week: app.globalData.week,
      jie: jie,
      number: number,
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