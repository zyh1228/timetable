// pages/schedule/details/details.js
import data from '../../../utils/data'
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
    beginWeek: 0,
    endWeek: 0,
    week: [],
    weekIndex: 0,
    jie: [],
    jieIndex: 0,
    number: [],
    numberIndex: 0,
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

  cancelTap(e) {
    wx.navigateBack()
  },

  saveCourse(e) {
    let course = {
      'isToday': Number(this.data.weekIndex),
      'jie': Number(this.data.jieIndex) + 1,
      'classNumber': Number(this.data.numberIndex) + 1,
      'name': this.data.name,
      'address': this.data.address,
      'beginWeek': Number(this.data.beginWeek),
      'endWeek': Number(this.data.endWeek),
      'other': this.data.other,
    }
    if (course.name == '' || course.address == '') {
      wx.showModal({
        title: '提示',
        content: '课程名称或上课地点为空',
        showCancel: false,
      })
      return
    }
    if (this.data.courseId == undefined) {
      data.addCourse(course, ()=>{
        data.getCourseList((courses)=>{console.log(courses)})
        wx.navigateBack()
      })
    }
    else {
      data.setCourse(this.data.courseId, course, () => {
        wx.navigateBack()
      })
    }
  },

  deleteCourse(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否删除当前课程',
      success (res) {
        if (res.confirm) {
          data.deleteCourse(that.data.courseId, () => {
            wx.navigateBack()
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let courseId = options.id
    let coursePerDay = app.globalData.coursePerDay
    let jie = []
    let number = []
    for (let i = 0; i < coursePerDay; i++) {
      jie.push('第' + (i + 1) + '节')
      number.push((i + 1) + '节')
    }
    this.setData({
      courseId: courseId,
      coursePerDay: coursePerDay,
      weekArray: app.globalData.weekArray,
      week: app.globalData.week,
      jie: jie,
      number: number,
    })
    if (courseId != undefined) {
      data.getCourse(courseId, (course) => {
        this.setData({
          weekIndex: course.isToday,
          jieIndex: course.jie - 1,
          numberIndex: course.classNumber - 1,
          name: course.name,
          address: course.address,
          beginWeek: course.beginWeek,
          endWeek: course.endWeek,
          other: course.other,
        })
      })
    }
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