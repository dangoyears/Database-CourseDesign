<template>
  <el-table :data="filterSchedule">
    <el-table-column prop="name" label="课程名称" width="180" show-overflow-tooltip></el-table-column>
    <el-table-column prop="credit" label="学分" width="120" sortable></el-table-column>
    <el-table-column prop="nature" label="课程性质" width="150"></el-table-column>
    <el-table-column prop="time" label="上课时间" width="150"></el-table-column>
    <el-table-column prop="address" label="上课地点" width="150"></el-table-column>
    <el-table-column prop="teachers" label="任课教师" width="200" show-overflow-tooltip>
      <template slot-scope="scope">
        <label>{{formattingTeachers(scope.row.teachers)}}</label>
      </template>
    </el-table-column>
    <el-table-column label="容纳人数" width="200">
      <template slot-scope="scope">
        <label>{{scope.row.selectedSum}} / {{scope.row.accommodate}}</label>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button type="primary" size="small" plain>选课</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import api from '../../api/index'
  export default {
    created() {
      let token = JSON.parse(sessionStorage.getItem("DBcourse-login")).token;
      api.getClassInfo((response) => {
        if(response) {
          this.schedule = response.slice(0);
        }
      }, token)
    },
    data() {
      return {
        schedule: [],
        // filterSchedule: []
      }
    },
    methods: {
      // 将任课教师数组格式化成字符串
      formattingTeachers(arr) {
        let str = "";
        arr.forEach((val, index) => {
          str += (index !== arr.length-1) ? `${val}, ` : val;
        })
        return str;
      }
    },
    computed: {
      filterSchedule() {
        let arr = this.schedule.filter(val => {
          if(val.class === "[]")  return true;
        })
        return arr;
      }
    }
  }
</script>

<style scoped></style>