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
      delete courses[courseId];
      wx.setStorage({
        key: 'course',
        data: courses,
        success(res) {callback(res.data)}
      })
   }
  })
}

module.exports = {
  getCourse,
  addCourse,
  setCourse,
  deleteCourse
}