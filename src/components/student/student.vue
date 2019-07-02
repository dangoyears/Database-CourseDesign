<template>
  <div class="container">
    <header class="student-header">
      <label class="student-label">学生个人信息：</label>
      <label class="student-name">{{studentInfo.name}}</label>
      <div  class="user-tab">
        <span class="user-name">Hello, {{studentInfo.name}}</span>
        <img src="../../assets/switch1.png" alt="切换账号" @click="switchUser">
      </div>
    </header>
    <table class="student-table">
      <tr>
        <td class="column">姓名</td>
        <td>{{studentInfo.name}}</td>
        <td class="column">性别</td>
        <td>{{studentInfo.sex}}</td>
      </tr>
      <tr>
        <td class="column">学号</td>
        <td>{{studentInfo.studentId}}</td>
         <td class="column">身份证</td>
        <td>{{studentInfo.idCard}}</td>
      </tr>
      <tr>
        <td class="column">学院</td>
        <td>{{studentInfo.college}}</td>
        <td class="column">专业</td>
        <td>{{studentInfo.specialty}}</td>
      </tr>
      <tr>
        <td class="column">年级</td>
        <td>{{studentInfo.grade}}</td>
        <td class="column">班级</td>
        <td>{{studentInfo.class}}</td>
      </tr>
      <tr>
        <td class="column">出生日期</td>
        <td>{{studentInfo.birthday}}</td>
        <td class="column">年龄</td>
        <td>{{studentInfo.age}}</td>
      </tr>
      <tr>
        <td class="column">状态</td>
        <td>{{studentInfo.status}}</td>
        <td class="column">学年制</td>
        <td>{{studentInfo.yearSystem}}</td>
      </tr>
      <div class="portrait"></div>
    </table>
    <el-tabs v-model="activeTag" style="padding: 4px 10px">
      <el-tab-pane label="课表信息" name="schedule">
        <student-schedule></student-schedule>
      </el-tab-pane>
      <el-tab-pane label="自主选课" name="selectCourse">
        <student-select-course></student-select-course>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import api from '../../api/index'
  import classDialog from '../base/setClassDialog'
  import studentSchedule from './student-schedule'
  import studentSelectCourse from './student-selectCourse'

  export default {
    created() {
      // 将用户名和token存进sessionStorge里，刷新页面后仍能保持登陆状态
      let sessionData = JSON.parse(sessionStorage.getItem("DBcourse-login"));
      api.getStudent((response) => {
        this.studentInfo = response;
      }, sessionData.user, sessionData.token); 
    },
    components: {
      'class-dialog': classDialog,
      'student-schedule': studentSchedule,
      'student-select-course': studentSelectCourse
    },
    data() {
      return {
        studentInfo: {},
        activeTag: 'schedule',
      }
    },
    methods: {
      switchUser() {
        this.$confirm('是否确定要切换账号？', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({name: 'login'})
        }).catch(() => {})
      },
    }
  }
</script>

<style scoped>
  .portrait {
    width: 200px;
    height: 245px; 
    background: #eee url('../../assets/student1.png') no-repeat center 120%;
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 60px;
  }
  .student-header {
    height: 40px;
    line-height: 40px;
    padding: 10px;
    background-color: rgb(242, 245, 237); 
  }
  .student-label {
    font-size: 0.85rem;
  }
  .student-name {
    font-size: 1.2rem;
    color: #71787E;
  }
  .student-table tr td {
    border:1px solid #E6EAEE;
  }
  .student-table {
    width: calc(100% - 200px);
    font-size: 0.9rem; 
    color: #71787E;
  }
  tr td {
    height: 0;
    line-height: 45px; 
    box-sizing: border-box; 
    padding: 0 10px; 
    width: 30%;
  }
  .column {
    background-color: #EFF3F6;
    color: #393C3E;
    width: 20%;
  }
  .user-tab {
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
  }
  .user-name {
    background: url('../../assets/student.png') no-repeat;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding-left: 35px;
    margin-right: 15px;
    color: #71787E;
  }
</style>