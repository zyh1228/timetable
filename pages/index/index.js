// pages/index/index.js
import data from '../../utils/data'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 0, // 当前所在分类的索引
    todayDay: '', // 今日日期
    todayMonth: '', // 今日月份
    todayWeek: '', // 今日周
    day: '', // 日期
    month: '', // 月份
    monthNum: 1,
    week: [],
    nowDay: [], // 本周的七天日期
    nowWeek: '', // 当前周
    schoolTime: ['2022','09','05'], // 本学期开学时间
    coursePerDay: 12,
    course_time: [],
    wList: [],
    scrollTop: 0,
    todos: [],
    todosCompleted: [],
    leftCount: 0,
  },

  LoadTodoList() {
    data.getTodoStatusList((todoStatusList) => {
      this.setData({
        todos: todoStatusList.uncompleted,
        todosCompleted: todoStatusList.completed,
        leftCount: todoStatusList.uncompleted.length
      })
    })
  },

  // 获取第几周后的月份
  getMonth(days) {
    let [year,month,day] = this.data.schoolTime
    var date = new Date(year,month-1,day);    
    date.setDate(date.getDate() + days);//获取n天后的日期      
    var m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);        
    return  m;     
  },

  // 获取第几周后的星期几的日期
  getDay(days) {
    let [year, month, day] = this.data.schoolTime
    var date = new Date(year, month-1, day);
    date.setDate(date.getDate() + days);//获取n天后的日期      
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();//获取当前几号，不足10补0    
    return d;
  },

  // 获取当前周
  getNowWeek(){
    var date = new Date();
    let [year, month, day] = this.data.schoolTime
    var start = new Date(year, month - 1, day);
    //计算时间差
    var left_time = parseInt((date.getTime() - start.getTime()) / 1000) //+ 24 * 60 * 60;
    var days = parseInt(left_time / 3600 / 24);
    var week = Math.floor(days / 7) + 1;
    var result = week
    if(week > this.data.totalWeek || week <= 0){
      result = this.data.now_week;
    }
    return result
  },

  //获取一周的日期
  getDayOfWeek(week){
    var day = []
    for (var i = 0; i < 7; i++) {
      var days = (week - 1) * 7 + i;
      day.push(this.getDay(days))
    }
    return day
  },

  // 获取课表数据
  getCourseList(week){
    data.getWeekCourse(week, (weekCourse) => {
      this.setData({
        wList: weekCourse,
      })
    })
  },

  gotoDetails(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/schedule/details/details?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      colorArrays: app.globalData.colorArray, // 课表颜色
      week: app.globalData.week,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      todayDay: new Date().getDate(),
      todayMonth: new Date().getMonth() + 1,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.LoadTodoList()
    data.getScheduleInfo((scheduleInfo) => {
      this.setData({
        coursePerDay: scheduleInfo.coursePerDay,
        course_time: scheduleInfo.courseTime,
        schoolTime: scheduleInfo.schoolTime,
        totalWeek: scheduleInfo.totalWeek,
      })
      let nowWeek = this.getNowWeek()
      let nowDay = this.getDayOfWeek(nowWeek)
      let pageNum = nowWeek - 1
      let month = this.getMonth((nowWeek - 1) * 7)
      this.setData({
        nowWeek,
        nowDay,
        pageNum,
        todayWeek: nowWeek,
        monthNum: month / 1, // 当前月份数字类型，用于数字运算
      })
    })
    this.getCourseList(this.data.pageNum)
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