// pages/todo/todo.js
import data from '../../utils/data'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: '',
    todos: [],
    todosCompleted: [],
    leftCount: 0,
    allCompleted: false,
    toastHidden: true,
  },

  inputChanged(e) {
    this.setData({ input: e.detail.value })
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

  addTodo(e) {
    if (!this.data.input || !this.data.input.trim())
      return
    let todo = {
      name: this.data.input,
      completed: false
    }
    data.addTodo(todo, ()=>{
      this.LoadTodoList()
      this.setData({
        input: '',
        leftCount: this.data.leftCount + 1,
      })
    })
  },

  toggleAllTodos(e) {
    let todos = this.data.todos
    this.data.allCompleted = !this.data.allCompleted
    for (let i = todos.length - 1; i >= 0; i--) {
      if (todos[i].completed != this.data.allCompleted) {
        data.setTodoStatus(todos[i].id, this.data.allCompleted, ()=>{
          this.LoadTodoList()
        })
      }
    }
    wx.vibrateShort()
  },

  clearCompletedTodos(e) {
    let todosCompleted = this.data.todosCompleted
    for (let i = 0; i < todosCompleted.length; i++) {
        data.deleteTodo(todosCompleted[i].id, () => {
          this.LoadTodoList()
        })
      }
    this.setData({
      toastHidden: false
    })
    wx.vibrateShort()
  },

  toggleTodo(e) {
    let todoId = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let isCompleted = e.currentTarget.dataset.iscompleted
    let list = isCompleted ? this.data.todosCompleted : this.data.todos
    data.setTodoStatus(todoId, !list[index].completed, () => {
      this.LoadTodoList()
    })
  },

  deleteTodo(e) {
    let that = this
    let todoId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否删除待办',
      success (res) {
        if (res.confirm) {
          data.deleteTodo(todoId, () => {
            that.LoadTodoList()
          })
        }
      }
    })

    // let todos = this.data.todos
    // let remove = todos.splice(index, 1)[0]
    // this.setData({
    //   todos: todos,
    //   leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
    // })
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
    this.LoadTodoList()
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