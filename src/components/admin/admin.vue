<template>
  <div>
    <header class="admin-header">
      <el-menu mode="horizontal" @select="handleSelect" default-active="colleges">
        <el-menu-item index="colleges">学院信息</el-menu-item>
        <el-menu-item index="teachers">教师信息</el-menu-item>
        <el-menu-item index="students">学生信息</el-menu-item>
        <el-menu-item index="course">课程信息</el-menu-item>
        <el-menu-item class="user-tab">
          <span class="user">Hello, {{userName}}</span>
        </el-menu-item>
        <el-menu-item class="user-tab" @click="switchUser">
          <img src="../../assets/switch1.png" alt="切换账号">
        </el-menu-item>
      </el-menu>
    </header>
    <component 
      :is="componentId" 
      :collegeInfos.sync="collegeInfos" 
      :token="token"
      style="margin-top: 60px;" 
    ></component>
  </div>
</template>

<script>
  import adminColleges from './admin-college'
  import adminTeachers from './admin-teachers'
  import adminStudents from './admin-students'
  import api from '../../api/index'
  import adminCourse from './admin-course'

  export default {
    // 获取学院信息
    created() {
      // 将用户名和token存进sessionStorge里，刷新页面后仍能保持登陆状态
      let sessionData = JSON.parse(sessionStorage.getItem("DBcourse-login"));
      this.userName = sessionData.user;
      this.token = sessionData.token;
      api.getCollegeInfo((response) => {
        if(!response)  return;
        this.collegeInfos = response.slice(0);
      }, this.token);
    },
    data() {
      return {
        userName: '',
        token: '',
        collegeInfos: [],
        componentId: "admin-colleges"
      }
    },
    components: {
      'admin-colleges': adminColleges,
      'admin-teachers': adminTeachers,
      'admin-students': adminStudents,
      'admin-course': adminCourse
    },
    methods: {
      handleSelect(key) {
        if(!key)  return;
        this.componentId = `admin-${key}`;
      },
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

<style scoped lang="less">
  .admin-header {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 2;
  }
  .user-tab {
    position: absolute;
    right: 0;
    top: 0;
  }
  .user {
    background: url('../../assets/user1.png') no-repeat;
    display: inline-block;
    height: 0x;
    line-height: 30px;
    padding-left: 35px;
    margin-right: 50px;
  }
  /deep/ .addIcon {
    width: 40px;
    height: 40px;
    position: fixed;
    right: 4vw;
    bottom: 8vh;
    border-radius: 50%;
  }
  /deep/ .addIcon:hover {
    transform: scale(1.2, 1.2) rotate(180deg);
    transition: all linear .2s; 
  }
</style>