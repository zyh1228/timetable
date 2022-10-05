function getInfo(callback) {
  wx.getStorage({
    key: 'info',
    success(res) {
      callback(res.data)
    },
    fail() {
      let info = {nextCourseId: 1}
      wx.setStorage({
        key: 'info',
        data: info
      })
      callback(info)
    }
  })
}

function setInfo(nextCourseId, callback=null) {
  getInfo((info)=>{
    info['nextCourseId'] = nextCourseId
    wx.setStorage({
      key: 'info',
      data: info,
      success(res) {}
    })
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
          setInfo(courseId + 1, ()=>{})
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
      courses.splice(courses.indexOf(courseId), 1)
      wx.setStorage({
        key: 'course',
        data: courses,
        success(res) {
          setWeekCourse(courseId, undefined, undefined, ()=>{})
          callback(res.data)
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
      console.log(courseIds)
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

    if (beginWeek == undefined, endWeek == undefined) {
      return
    }

    for (let i = beginWeek; i <= endWeek; i++) {
      let courseWeek = weekCourseList.courseWeek[i]
      if (!courseWeek) {
        courseWeek = []
      }
      courseWeek.push(courseId)
      weekCourseList.courseWeek[i] = courseWeek
    }
    weekCourseList.courses[courseId] = [beginWeek, endWeek]

    wx.setStorage({
      key: 'weekCourse',
      data: weekCourseList,
      success(res) {
        callback(res.data)
      }
    })
  })
}

module.exports = {
  getCourseList,
  getCourse,
  addCourse,
  setCourse,
  deleteCourse,
  getWeekCourse,
  setWeekCourse,
}