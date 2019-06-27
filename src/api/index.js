import axios from 'axios';
export default {
  // 验证账号密码
  checkUser(callback, obj) {
    axios.get('https://dbcd.qfstudio.net/login', {
      params: obj
    })
    .then(function(response) {
      callback(response.data.token);
    })
    .catch(function(error) {
      alert(error);
    })
  },
  // 上传学院信息
  uploadCollegeInfo(obj) {
    axios.post(`https://dbcd.qfstudio.net/write/college?token=${obj.token}`, obj)
    .catch(function(error) {
      alert(error);
    })
  },
  // 上传学生信息
  uploadStudentInfo(obj, token) {
    axios.post(`https://dbcd.qfstudio.net/write/student?token=${token}`, obj)
    .then(function(response) {
      console.log("success");
      console.log(response);
    })
    .catch(function(error) {
      alert(error);
    })
  },
  // 获取学院信息
  getCollegeInfo(callback, token) {
    axios.get(`https://dbcd.qfstudio.net/read/college?token=${token}`)
    .then(function(response) {
      callback(response.data.data);
    })
    .catch(function(error) {
      alert(error);
    })
  },
  // 获取所有教师信息
  getTeacherInfo(callback, token) {
    axios.get(`https://dbcd.qfstudio.net/read/teacher?token=${token}`)
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      alert(error);
    })
  },
  // 获取所有学生信息
  getStudentInfo(callback, token) {
    axios.get(`https://dbcd.qfstudio.net/read/student?token=${token}`)
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      alert(error);
    })
  },
  // 删除学院信息
  deleteCollegeInfo(obj) {
    axios.get('https://dbcd.qfstudio.net/delete/class', {
      params: obj
    })
    .catch(function(error) {
      alert(error);
    })
  }
}