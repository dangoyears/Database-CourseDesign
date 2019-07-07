<template>
  <el-table :data="scheduleArr">
    <el-table-column prop="name" label="课程名称" width="180" show-overflow-tooltip></el-table-column>
    <el-table-column prop="credit" label="学分" width="120"></el-table-column>
    <el-table-column prop="nature" label="课程性质" width="150"></el-table-column>
    <el-table-column prop="time" label="上课时间" width="150"></el-table-column>
    <el-table-column prop="address" label="上课地点" width="150"></el-table-column>
    <el-table-column prop="teachers" label="任课教师" width="200" show-overflow-tooltip>
      <template slot-scope="scope">
        <label>{{formattingTeachers(scope.row.teachers)}}</label>
      </template>
    </el-table-column>
    <el-table-column prop="score" label="分数" sortable></el-table-column>
  </el-table>
</template>

<script>
  import api from '../../api/index'
  export default {
    created() {
      this.getSchedule();
    },
    data() {
      return {
        scheduleArr: []
      }
    },
    methods: {
      // 获取课表信息
      getSchedule() {
        let sessionData = JSON.parse(sessionStorage.getItem("DBcourse-login"));
        api.getStudent((response) => {
          if(response.schedule) {
            this.scheduleArr = response.schedule.slice(0);
          }
        }, sessionData.user, sessionData.token); 
      },
      // 将任课教师数组格式化成字符串
      formattingTeachers(arr) {
        let str = "";
        arr.forEach((val, index) => {
          str += (index !== arr.length-1) ? `${val}, ` : val;
        })
        return str;
      }
    }
  }
</script>

<style scoped></style>