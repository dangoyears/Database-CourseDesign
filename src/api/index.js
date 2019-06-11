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
    axios.post('https://dbcd.qfstudio.net/write/college', obj)
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