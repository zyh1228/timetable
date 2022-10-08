// pages/schedule/schedule.js
import data from '../../utils/data'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekArray: [],
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
    course_time: [
      ['8:05', '8:45'],
      ['8:45', '9:25'],
      ['9:40', '10:20'],
      ['10:30', '11:10'],
      ['11:20', '12:00'],
      ['13:40', '14:20'],
      ['14:30', '15:10'],
      ['15:20', '16:00'],
      ['16:10', '16:50'],
      ['18:30', '19:10'],
      ['19:20', '20:00'],
      ['20:00', '20:50'],
    ],
    wList: [
        // { "id":1,"isToday": 0, "jie": 7, "classNumber": 2, "name": "算法设计与分析","address":"111" },
        // { "id":2,"isToday": 0, "jie": 1, "classNumber": 2, "name": "操作系统" ,"address":"112" },
        // { "id":3,"isToday": 0, "jie": 3, "classNumber": 2, "name": "毛概","address":"113" },

        // { "id":4,"isToday": 1, "jie": 3, "classNumber": 2, "name": "Matlab" ,"address":"114" },
        // { "id":5,"isToday": 1, "jie": 5, "classNumber": 2, "name": "数据库原理及应用" ,"address":"115" },
        // { "id":7,"isToday": 1, "jie": 7, "classNumber": 2, "name": "数学建模","address":"116"},
       
        // { "id":6,"isToday": 2, "jie": 3, "classNumber": 3, "name": "计算机网络" ,"address":"117" },
        // { "id":2,"isToday": 2, "jie": 7, "classNumber": 2, "name": "操作系统" ,"address":"118" },

        // { "id":3,"isToday": 3, "jie": 1, "classNumber": 2, "name": "毛概" ,"address":"119" },
        // { "id":6,"isToday": 3, "jie": 5, "classNumber": 2, "name": "计算机网络" ,"address":"120" },
        
        // { "id":1,"isToday": 4, "jie": 3, "classNumber": 2, "name": "算法设计与分析" ,"address":"121" },
    ],
    hidden:true,
    flag:false,
    x:0,
    y:0,
    disabled: true,
    moveCourseIndex: 0,
    elements:{},
    scrollTop: 0,
    offsetX: 0,
    offsetY: 0,
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
    var start = new Date(year, month-1, day);
    //计算时间差
    var left_time = parseInt((date.getTime()-start.getTime())/1000)+24 * 60 * 60;
    var days = parseInt(left_time/3600/24);
    var week = Math.floor(days / 7) + 1;
    var result = week
    if(week>20 || week <= 0){
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

  // 点击切换导航的回调
  changeNav(event){
    let pageNum = event.currentTarget.dataset.page
    let nowWeek = pageNum + 1
    let nowDay = this.getDayOfWeek(nowWeek)
    let month = this.getMonth((nowWeek-1)*7)
    this.getCourseList(pageNum)
    this.setData({
      pageNum,
      nowWeek,
      nowDay,
      month,
      monthNum: month / 1, // 当前月份数字类型，用于数字运算
    })
  },

  gotoDetails(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/schedule/details/details?id=' + id,
    })
  },

  addCourse(event) {
    wx.navigateTo({
      url: '/pages/schedule/details/details',
    })
  },

  scrolling(event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    })
  },

  movePrepared(event){
    wx.vibrateLong()
    let offsetX = wx.getSystemInfoSync().windowWidth * 0.07
    this.setData({
      x: event.detail.x - offsetX,
      y: event.detail.y - 90 + this.data.scrollTop,
      offsetX: offsetX,
      offsetY: 90,
      hidden: false,
      flag:true,
    })
  },

  moveStarted(event) {
    this.setData({
      moveCourseIndex: event.currentTarget.dataset.index,
    })
  },

  moving(event) {
    if(this.data.flag){
      const x = event.touches[0].pageX
      const y = event.touches[0].pageY
      this.setData({
        x: x - this.data.offsetX,
        y: y - this.data.offsetY  + this.data.scrollTop,
      })
      let i = Math.trunc(this.data.x / (wx.getSystemInfoSync().windowWidth * 0.92 / 7))
      let j = Math.trunc(this.data.y / 60)
      let elements = {}
      if (i >= 0 && j >= 0) {
        for (let index = 0; index < this.data.wList[this.data.moveCourseIndex].classNumber; index++) {
          let key = (j + index) + '-' + i
          elements[key] = true
        }
        this.setData({
          elements: elements
        })
      }
    }
  },

  moveEnd(event) {
    let that = this
    if(that.data.flag){
      let jie = Math.trunc(that.data.y / 60)
      let isToday = Math.trunc(that.data.x / (wx.getSystemInfoSync().windowWidth * 0.92 / 7))
      let course = that.data.wList[that.data.moveCourseIndex]
      if(jie + course.classNumber <= that.data.coursePerDay) {
        wx.showModal({
          title: '提示',
          content: '将课程改到',
          success (res) {
            if (res.confirm) {
              course.jie = jie + 1
              course.isToday = isToday
              // console.log(course.id)
              data.setCourse(course.id, course, ()=>{
                that.getCourseList(that.data.pageNum)
              })
            }
          }
        })
      }
    }
    this.setData({
      hidden: true,
      flag: false,
      elements: {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let nowWeek = this.getNowWeek()
    let nowDay = this.getDayOfWeek(nowWeek)
    let pageNum = nowWeek - 1
    let month = this.getMonth((nowWeek - 1) * 7);
    // this.data.todayMonth
    let query = wx.createSelectorQuery();
    let nodesRef = query.select(".kcb-background");
    nodesRef.fields({
      dataset: true,
      rect:true
    },(result)=>{
      this.setData({
        hight: result.bottom - result.top 
      })
    }).exec()
    this.setData({
      nowWeek,
      nowDay,
      pageNum,
      todayWeek: nowWeek,
      monthNum: month / 1, // 当前月份数字类型，用于数字运算
      colorArrays: app.globalData.colorArray, // 课表颜色
      weekArray: app.globalData.weekArray,
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