<template>
  <div class="container">
    <header class="teacher-header">
        <label class="teacher-label">教师个人信息：</label>
        <label class="teacher-name">{{teacherInfo.name}}</label>
        <div  class="user-tab">
          <span class="user-name">Hello, {{teacherInfo.name}}</span>
          <img src="../../assets/switch1.png" alt="切换账号" @click="switchUser">
        </div>
    </header>
    <table class="teacher-table">
      <tr>
        <td class="column">姓名</td>
        <td>{{teacherInfo.name}}</td>
        <td class="column">性别</td>
        <td>{{teacherInfo.sex}}</td>
      </tr>
      <tr>
        <td class="column">所属学院</td>
        <td>{{teacherInfo.college}}</td>
        <td class="column">工号</td>
        <td>{{teacherInfo.jobId}}</td>
      </tr>
      <tr>
        <td class="column">学历</td>
        <td>{{teacherInfo.education}}</td>
        <td class="column">毕业学校</td>
        <td>{{teacherInfo.graduation}}</td>
      </tr>
      <tr>
        <td class="column">出生日期</td>
        <td>{{teacherInfo.birthday}}</td>
        <td class="column">年龄</td>
        <td>{{teacherInfo.age}}</td>
      </tr>
      <tr>
        <td class="column">身份证</td>
        <td>{{teacherInfo.idCard}}</td>
        <td class="column">状态</td>
        <td>{{teacherInfo.position}}</td>
      </tr>
      <div class="portrait"></div>
    </table>
    <img src="../../assets/add.png" class="addIcon" @click="createClassInfos">
    <teacher-course></teacher-course>
    <class-dialog 
      :dialogVisible="setClassInfoVisible"
      :collegeInfos="collegeInfos"
      v-on:update:dialogVisible="changeClassDialogVisible"
    ></class-dialog>
  </div>

</template>

<script>
  import api from '../../api/index'
  import classDialog from '../base/setClassDialog'
  import teacherCourse from './teacher-course'

  export default {
    components: {
      'class-dialog': classDialog,
      'teacher-course': teacherCourse
    },
    data() {
      return {
        teacherInfo: {
          "college": "计算机科学与网络工程学院",
          "name": "夏侯瑾轩",
          "jobId": "1706300032",
          "sex": "男",
          "education": '硕士',
          "graduation": '南开大学',
          "birthday": "1998-09-06",
          "age": "21",
          "idCard": "440582199708310612",
          "position": "教务办主任"
        },
        setClassInfoVisible: false,
        collegeInfos: []
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
      createClassInfos() {
        this.setClassInfoVisible = true;
      },
      changeClassDialogVisible() {
        this.setClassInfoVisible = false;
      }
    },
    computed: {
    }
  }
</script>

<style scoped>
  .portrait {
    width: 200px;
    height: 245px; 
    background: #eee url('../../assets/teacher1.png') no-repeat center 120%;
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 60px;
  }
  .teacher-header {
    height: 40px;
    line-height: 40px;
    padding: 10px;
    background-color: rgb(242, 245, 237); 
  }
  .teacher-label {
    font-size: 0.85rem;
  }
  .teacher-name {
    font-size: 1.2rem;
    color: #71787E;
  }
  .teacher-table tr td {
    border:1px solid #E6EAEE;
  }
  .teacher-table {
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
  .addIcon {
    width: 40px;
    height: 40px;
    position: fixed;
    right: 4vw;
    bottom: 8vh;
    border-radius: 50%;
  }
  .addIcon:hover {
    transform: scale(1.2, 1.2) rotate(180deg);
    transition: all linear .2s; 
  }
  .user-tab {
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
  }
  .user-name {
    background: url('../../assets/teacher.png') no-repeat;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding-left: 35px;
    margin-right: 15px;
    color: #71787E;
  }
</style>