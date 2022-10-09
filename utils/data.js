function getInfo(callback) {
  wx.getStorage({
    key: 'info',
    success(res) {
      callback(res.data)
    },
    fail() {
      let info = {nextCourseId: 1, nextTodoId: 1}
      wx.setStorage({
        key: 'info',
        data: info
      })
      callback(info)
    }
  })
}

function setInfo(nextCourseId, nextTodoId, callback) {
  getInfo((info)=>{
    if (nextCourseId != undefined)
      info['nextCourseId'] = nextCourseId
    if (nextTodoId != undefined)
      info['nextTodoId'] = nextTodoId
    wx.setStorage({
      key: 'info',
      data: info,
      success(res) {callback(res.data)}
    })
  })
}

function getScheduleInfo(callback) {
  wx.getStorage({
    key: 'scheduleInfo',
    success(res) {
      callback(res.data)
    },
    fail() {
      let scheduleInfo = {
        totalWeek: 16,
        coursePerDay: 12,
        schoolTime: ['2022','09','05'],
        courseTime: [
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
        ]
      }
      wx.setStorage({
        key: 'scheduleInfo',
        data: scheduleInfo
      })
      callback(scheduleInfo)
    }
  })
}

function setScheduleInfo(scheduleInfo, callback) {
  wx.setStorage({
    key: 'scheduleInfo',
    data: scheduleInfo,
    success(res) {
      callback(res.data)
    }
  })
}

function getCourseList(callback) {
  wx.getStorage({
    key: 'course',
    success(res) {
      callback(res.data)
    },
    fail() {
      wx.setStorage({
        key: 'course',
        data: {}
      })
      callback({})
    }
  })
}

function getCourse(courseId, callback) {
  getCourseList((courseList) => {
    callback(courseList[courseId])
  })
}

function addCourse(course, callback) {
  getInfo((info)=>{
    let courseId = info.nextCourseId
    course['id'] = courseId
    getCourseList((courses) => {
      courses[courseId] = course
      wx.setStorage({
        key: 'course',
        data: courses,
        success(res) {
          setInfo(courseId + 1, undefined, ()=>{})
          setWeekCourse(courseId, course.beginWeek, course.endWeek, ()=>{})
          callback(res.data)
        }
      })
    })
  })
}

function setCourse(courseId, course, callback) {
  course['id'] = courseId
  getCourseList((courses) => {
    courses[courseId] = course
    wx.setStorage({
      key: 'course',
      data: courses,
      success(res) {
        setWeekCourse(courseId, course.beginWeek, course.endWeek, ()=>{})
        callback(res.data)
      }
    })
  })
}

function deleteCourse(courseId, callback) {
  getCourseList((courses) => {
    if(courseId in courses) {
      delete courses[courseId]
      wx.setStorage({
        key: 'course',
        data: courses,
        success(res) {
          setWeekCourse(courseId, undefined, undefined, ()=>{callback(res.data)})
        }
      })
    }
  })
}

function getWeekCourseList(callback) {
  wx.getStorage({
    key: 'weekCourse',
    success(res) {
      callback(res.data)
    },
    fail() {
      let weekCourseList = {courses: {}, courseWeek: {}}
      wx.setStorage({
        key: 'weekCourse',
        data: weekCourseList
      })
      callback(weekCourseList)
    }
  })
}

function getWeekCourse(week, callback) {
  getWeekCourseList((weekCourseList) => {
    let courseIds = weekCourseList.courseWeek[week]
    let courses = []
    getCourseList((courseList) => {
      for (let i in courseIds) {
        courses.push(courseList[courseIds[i]])
      }
      callback(courses)
    })
  })
}

function setWeekCourse(courseId, beginWeek, endWeek, callback) {
  getWeekCourseList((weekCourseList) => {
    if (courseId in weekCourseList.courses) {
      let oldWeekCourse = weekCourseList.courses[courseId]
      for (let i = oldWeekCourse[0]; i <= oldWeekCourse[1]; i++) {
        let courseWeek = weekCourseList.courseWeek[i]
        courseWeek.splice(courseWeek.indexOf(courseId), 1)
        weekCourseList.courseWeek[i] = courseWeek
      }
    }

    if (beginWeek != undefined && endWeek != undefined) {
      for (let i = beginWeek; i <= endWeek; i++) {
        let courseWeek = weekCourseList.courseWeek[i]
        if (!courseWeek) {
          courseWeek = []
        }
        courseWeek.push(courseId)
        weekCourseList.courseWeek[i] = courseWeek
      }
      weekCourseList.courses[courseId] = [beginWeek, endWeek]
    }
    else {
      delete weekCourseList.courses[courseId]
    }

    wx.setStorage({
      key: 'weekCourse',
      data: weekCourseList,
      success(res) {
        callback(res.data)
      }
    })
  })
}

function getTodoList(callback) {
  wx.getStorage({
    key: 'todo',
    success(res) {
      callback(res.data)
    },
    fail() {
      let todo = {}
      wx.setStorage({
        key: 'todo',
        data: todo
      })
      callback(todo)
    }
  })
}

function getTodo(todoId, callback) {
  getTodoList((todoList) => {
    callback(todoList[todoId])
  })
}

function addTodo(todo, callback) {
  getInfo((info)=>{
    let todoId = info.nextTodoId
    todo['id'] = todoId
    getTodoList((todos) => {
      todos[todoId] = todo
      wx.setStorage({
        key: 'todo',
        data: todos,
        success(res) {
          setInfo(undefined, todoId + 1, ()=>{})
          setTodoStatus(todoId, false, ()=>{callback(res.data)})
        }
      })
    })
  })
}

function setTodo(todoId, todo, callback) {
  todo['id'] = todoId
  getTodoList((todos) => {
    todos[todoId] = todo
    wx.setStorage({
      key: 'todo',
      data: todos,
      success(res) {
        callback(res.data)
      }
    })
  })
}

function deleteTodo(todoId, callback) {
  getTodoList((todos) => {
    if(todoId in todos) {
      delete todos[todoId]
      wx.setStorage({
        key: 'todo',
        data: todos,
        success(res) {
          setTodoStatus(todoId, undefined, ()=>{callback(res.data)})
        }
      })
    }
  })
}

function getTodoStatus(callback) {
  wx.getStorage({
    key: 'todoStatus',
    success(res) {
      callback(res.data)
    },
    fail() {
      let todoStatus = {completed: [], uncompleted: []}
      wx.setStorage({
        key: 'todoStatus',
        data: todoStatus
      })
      callback(todoStatus)
    }
  })
}

function getTodoStatusList(callback) {
  getTodoStatus((todoStatus) => {
    let todoStatusList = {completed: [], uncompleted: []}
    getTodoList((todos) => {
      for (let i = 0; i < todoStatus.completed.length; i++) {
        todoStatusList.completed.push(todos[todoStatus.completed[i]])
      }
      for (let i = 0; i < todoStatus.uncompleted.length; i++) {
        todoStatusList.uncompleted.push(todos[todoStatus.uncompleted[i]])
      }
      callback(todoStatusList)
    })
  })
}

function setTodoStatus(todoId, isCompoleted, callback) {
  if (isCompoleted == undefined) {
    getTodoStatus((todoStatus) => {
      todoStatus.completed.splice(todoStatus.completed.indexOf(todoId), 1)
      todoStatus.uncompleted.splice(todoStatus.uncompleted.indexOf(todoId), 1)
      wx.setStorage({
        key: 'todoStatus',
        data: todoStatus,
        success(res) {
          callback(res.data)
        }
      })
    })
    return
  }
  getTodo(todoId, (todo) => {
    todo.completed = isCompoleted
    setTodo(todoId, todo, () => {})
    getTodoStatus((todoStatus) => {
      if (isCompoleted == true) {
        todoStatus.completed.push(todoId)
        todoStatus.uncompleted.splice(todoStatus.uncompleted.indexOf(todoId), 1)
      }
      else if(isCompoleted == false) {
        todoStatus.uncompleted.push(todoId)
        todoStatus.completed.splice(todoStatus.completed.indexOf(todoId), 1)
      }
      wx.setStorage({
        key: 'todoStatus',
        data: todoStatus,
        success(res) {
          callback(res.data)
        }
      })
    })
  })
}

module.exports = {
  getScheduleInfo,
  setScheduleInfo,
  getCourse,
  addCourse,
  setCourse,
  deleteCourse,
  getWeekCourse,
  setWeekCourse,
  getTodoList,
  addTodo,
  deleteTodo,
  getTodoStatusList,
  setTodoStatus,
}