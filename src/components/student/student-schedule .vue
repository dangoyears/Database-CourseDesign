<template>
  <el-table :data="schedule">
    <el-table-column prop="name" label="课程名称" width="220"></el-table-column>
    <el-table-column prop="credit" label="学分" width="120"></el-table-column>
    <el-table-column prop="nature" label="课程性质" width="200"></el-table-column>
    <el-table-column prop="time" label="时间" width="250"></el-table-column>
    <el-table-column prop="address" label="教室" width="250"></el-table-column>
    <el-table-column prop="teachers" label="任课教师" width="300"></el-table-column>
    <el-table-column prop="score" label="分数" sortable></el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        schedule: [
          {
            name: "数据结构",
            credit: "2",
            nature: "专业必修课",
            time: "第7-14周,第4-6节",
            teachers: "xxx, yyy",
            address: "理科南教学楼710",
            score: "90"
          }
        ]
      }
    },
    methods: {
    
    }
  }
</script>

<style scoped></style>