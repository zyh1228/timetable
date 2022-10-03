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

function getCourse(callback) {
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

function addCourse(course, callback) {
  getInfo((info)=>{
    let nextCourseId = info.nextCourseId
    course['id'] = nextCourseId
    getCourse((courses) => {
      courses[nextCourseId] = course
      wx.setStorage({
        key: 'course',
        data: courses,
        success(res) {
          setInfo(nextCourseId + 1, ()=>{callback(res.data)})

        }
      })
    })
  })
}

function setCourse(courseId, course, callback) {
  course['id'] = courseId
  getCourse((courses) => {
    courses[courseId] = course
    wx.setStorage({
      key: 'course',
      data: courses,
      success(res) {callback(res.data)}
    })
  })
}

function deleteCourse(courseId, callback) {
  getCourse((courses) => {
    if(courses.hasKey(courseId)) {
      courses.splice(courses.indexOf(courseId), 1)
      wx.setStorage({
        key: 'course',
        data: courses,
        success(res) {callback(res.data)}
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

function setWeekCourse(beginWeek, endWeek, courseId, callback) {
  getWeekCourseList((weekCourseList) => {
    if (weekCourseList.courses.hasKey(courseId)) {
      let oldWeekCourse = weekCourseList.courses[courseId]
      for (let i = oldWeekCourse[0]; i <= oldWeekCourse[1]; i++) {
        let courseWeek = weekCourseList.courseWeek[i]
        courseWeek.splice(courseWeek.indexOf(courseId), 1)
      }
    }

    for (let i = beginWeek; i <= endWeek; i++) {
      let courseWeek = weekCourseList.courseWeek[i]
      if (!courseWeek) {
        courseWeek = []
      }
      courseWeek.push(courseId)
      weekCourseList.courseWeek[i] = courseWeek
      weekCourseList.courses[courseId] = [beginWeek, endWeek]
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

module.exports = {
  getCourse,
  addCourse,
  setCourse,
  deleteCourse,
  getWeekCourseList,
  setWeekCourse,
}