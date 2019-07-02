<template>
  <el-table :data="schedule">
    <el-table-column prop="name" label="课程名称" width="220"></el-table-column>
    <el-table-column prop="credit" label="学分" width="120" sortable></el-table-column>
    <el-table-column prop="nature" label="课程性质" width="150"></el-table-column>
    <el-table-column prop="time" label="时间" width="250"></el-table-column>
    <el-table-column prop="address" label="教室" width="250"></el-table-column>
    <el-table-column prop="teachers" label="任课教师" width="250" show-overflow-tooltip>
      <template slot-scope="scope">
        <label>{{formattingTeachers(scope.row.teachers)}}</label>
      </template>
    </el-table-column>
    <el-table-column label="容纳人数">
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
      api.getClassInfo((response) => {
        console.log(response);
      })
    },
    data() {
      return {
        schedule: [
          {
            name: "数据结构",
            credit: "2",
            nature: "专业必修课",
            time: "第7-14周,第4-6节",
            teachers: ["龙应台", "周国平", "东野圭吾", "村上春树"],
            address: "理科南教学楼710",
            accommodate: "50",
            selectedSum: "50"
          }
        ]
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
    }
  }
</script>

<style scoped></style>