<template>
  <el-table :data="scheduleArr">
    <el-table-column prop="name" label="课程名称" width="180" show-overflow-tooltip></el-table-column>
    <el-table-column prop="nature" label="课程性质" width="150"></el-table-column>
    <el-table-column prop="credit" label="学分" width="120"></el-table-column>
    <el-table-column prop="time" label="上课时间" width="150"></el-table-column>
    <el-table-column prop="address" label="上课地点" width="150"></el-table-column>
    <el-table-column prop="courseLeader" label="任课组长" width="150"></el-table-column>
    <el-table-column label="课程容量">
      <template slot-scope="scope">
        <label>{{scope.row.students.length}} / {{scope.row.accommodate}}</label>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import api from '../../api/index'
  export default {
    created() {
      let sessionData = JSON.parse(sessionStorage.getItem("DBcourse-login"));
      api.getTeacher((response) => {
        if(response.schedule) {
          this.scheduleArr = response.schedule.slice(0);
        }
      }, sessionData.user, sessionData.token); 
    },
    data() {
      return {
        scheduleArr: []
      }
    }
  }
</script>