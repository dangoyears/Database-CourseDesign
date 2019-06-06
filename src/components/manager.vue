<template>
  <div>
    <header>
      <el-menu mode="horizontal" @select="handleSelect">
        <el-menu-item index="colleges">学院信息</el-menu-item>
        <el-menu-item index="teachers">教师信息</el-menu-item>
        <el-menu-item index="students">学生信息</el-menu-item>
        <el-menu-item class="user-tab">
          <span class="user">用户名，待获取</span>
        </el-menu-item>
        <el-menu-item class="user-tab" @click="switchUser">
          <img src="../assets/switch1.png" alt="切换账号">
        </el-menu-item>
      </el-menu>
      <div class="user-tab">
      </div>
    </header>
    <component :is="componentId"></component>
  </div>
</template>

<script>
  import managerColleges from './manager-college'
  import managerTeachers from './manager-teachers'
  import managerStudents from './manager-students'

  export default {
    data() {
      return {
        componentId: "manager-colleges",
      }
    },
    components: {
      'manager-colleges': managerColleges,
      'manager-teachers': managerTeachers,
      'manager-students': managerStudents
    },
    methods: {
      handleSelect(key) {
        if(!key)  return;
        this.componentId = `manager-${key}`;
      },
      switchUser() {
        this.$confirm('是否确定要切换账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({name: 'login'})
        })
      }
    },
    computed: {

    }
  }
</script>

<style scoped>
  .user-tab {
    position: absolute;
    right: 0;
    top: 0;
  }
  .user {
    background: url('../assets/user1.png') no-repeat;
    display: inline-block;
    height: 0x;
    line-height: 30px;
    padding-left: 35px;
    margin-right: 50px;
  }
</style>