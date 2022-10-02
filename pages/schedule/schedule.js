// pages/schedule/schedule.js
var colors =  [
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
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekArray: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周'],
    pageNum: 0, // 当前所在分类的索引
    todayDay: '', // 今日日期
    todayMonth:'', // 今日月份
    todayWeek:'', // 今日周
    day:'', // 日期
    month: '', // 月份
    monthNum:1,
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], // 周一为起始日
    nowDay:[1,2,3,4,5,6,7], // 本周的七天日期
    schoolTime: ['2022','09','05'], // 本学期开学时间
    nowWeek: '', // 当前周
    course_time:[
      ['8:05','8:45'],
      ['8:45','9:25'],
      ['9:40','10:20'],
      ['10:30','11:10'],
      ['11:20','12:00'],
      ['13:40','14:20'],
      ['14:30','15:10'],
      ['15:20','16:00'],
      ['18:30','19:10'],
      ['19:20','20:00'],
      ['20:00','20:50'],
  ],
    wList: [
      [],
      [],
      [],
      [],
      [
        { "id":1,"isToday": 0, "jie": 7, "classNumber": 2, "name": "算法设计与分析","address":"111" },
        { "id":2,"isToday": 0, "jie": 1, "classNumber": 2, "name": "操作系统" ,"address":"112" },
        { "id":3,"isToday": 0, "jie": 3, "classNumber": 2, "name": "毛概","address":"113" },

        { "id":4,"isToday": 1, "jie": 3, "classNumber": 2, "name": "Matlab" ,"address":"114" },
        { "id":5,"isToday": 1, "jie": 5, "classNumber": 2, "name": "数据库原理及应用" ,"address":"115" },
        { "id":7,"isToday": 1, "jie": 7, "classNumber": 2, "name": "数学建模","address":"116"},
       
        { "id":6,"isToday": 2, "jie": 3, "classNumber": 3, "name": "计算机网络" ,"address":"117" },
        { "id":2,"isToday": 2, "jie": 7, "classNumber": 2, "name": "操作系统" ,"address":"118" },

        { "id":3,"isToday": 3, "jie": 1, "classNumber": 2, "name": "毛概" ,"address":"119" },
        { "id":6,"isToday": 3, "jie": 5, "classNumber": 2, "name": "计算机网络" ,"address":"120" },
        
        { "id":1,"isToday": 4, "jie": 3, "classNumber": 2, "name": "算法设计与分析" ,"address":"121" },
      ],
  ]},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowWeek = this.getNowWeek()
    let nowDay = this.getDayOfWeek(nowWeek)
    let pageNum = nowWeek - 1
    let month = this.getMonth((nowWeek - 1) * 7);
    this.data.todayMonth
    this.setData({
      nowWeek,
      nowDay,
      pageNum,
      todayWeek:nowWeek,
      monthNum: month / 1, // 当前月份数字类型，用于数字运算
      colorArrays: colors // 课表颜色
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
    for (var i = -1; i < 6; i++) {
      var days = (week - 1) * 7 + i;
      day.push(this.getDay(days))
    }
    return day
  },

  // 获取课表数据
  async getCourseList(){

  },

  // 点击切换导航的回调
  changeNav(event){
    let pageNum = event.currentTarget.dataset.page
    let nowWeek = pageNum + 1
    let nowDay = this.getDayOfWeek(nowWeek)
    let month = this.getMonth((nowWeek-1)*7)
    this.setData({
      pageNum,
      nowWeek,
      nowDay,
      month,
      monthNum: month / 1, // 当前月份数字类型，用于数字运算
    })
  },

  gotoDetails: function(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/schedule/details/details?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})