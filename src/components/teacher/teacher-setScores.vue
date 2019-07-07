<template>
  <el-collapse accordion style="margin:0">
    <el-collapse-item 
      v-for="item in courseArr"
      :key="item.id"
      style="width:1050px; overflow:scroll;"
    >
      <template slot="title">
        <span class="collapse-item">{{item.name}}</span>
      </template>
      <el-table :data="item.students">
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="studentId" label="学号" width="150" sortable></el-table-column>
        <el-table-column prop="college" label="学院" width="250" show-overflow-tooltip sortable></el-table-column>
        <el-table-column label="班级" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.specialty}}{{scope.row.grade}}{{scope.row.class}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="150"></el-table-column>
        <el-table-column label="分数" width="150">
          <template slot-scope="scope">
            <el-input></el-input>
            <!--  v-model="studentsScore[scope.row.studentId]" -->
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="mini" style="float:right" v-show="item.students.length !== 0">上传成绩</el-button>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import api from '../../api/index'
  export default {
    created() {
      let sessionData = JSON.parse(sessionStorage.getItem("DBcourse-login"));
      api.getTeacher((response) => {
        if(response.schedule) {
          this.courseArr = response.schedule.slice(0);
        }
      }, sessionData.user, sessionData.token); 
    },
    data() {
      return {
        courseArr: [],
        studentsScore: {}
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .collapse-item {
    color: #71787E;
    font-size: 1rem;
  }
</style>