// pages/todo/todo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: '',
    todos: [],
    leftCount: 0,
    allCompleted: false,
    toastHidden: true,
  },

  inputChanged(e) {
    this.setData({ input: e.detail.value })
  },

  addTodo(e) {
    if (!this.data.input || !this.data.input.trim())
      return
    let todos = this.data.todos
    todos.push({ name: this.data.input, completed: false })
    this.setData({
      input: '',
      todos: todos,
      leftCount: this.data.leftCount + 1,
    })
  },

  toggleAllTodos(e) {
    let todos = this.data.todos
    this.data.allCompleted = !this.data.allCompleted
    for (let i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
    }
    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length,
    })
    wx.vibrateShort()
  },

  clearCompletedTodos(e) {
    let todos = this.data.todos
    let remains = []
    for (let i = 0; i < todos.length; i++) {
      todos[i].completed || remains.push(todos[i])
    }
    this.setData({
      todos: remains
    })
    this.setData({
      toastHidden: false
    })
    wx.vibrateShort()
  },

  toggleTodo(e) {
    let index = e.currentTarget.dataset.index
    let todos = this.data.todos
    todos[index].completed = !todos[index].completed
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
    })
  },

  deleteTodo(e) {
    let index = e.currentTarget.dataset.index
    let todos = this.data.todos
    let remove = todos.splice(index, 1)[0]
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
    })
  },

  hideToast() {
    this.setData({
      toastHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      colorArrays: app.globalData.colorArray,
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