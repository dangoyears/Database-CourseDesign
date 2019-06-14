<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-table :data="teacherInfo">
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="所属学院" prop="college"></el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <div class="portrait"></div>
      </el-col>
      <!-- <el-table :data="teacherInfo"> -->
       <!-- <el-table-column label="工号" prop="jobId"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
         <el-table-column label="学历" prop="education"></el-table-column>
        <el-table-column label="毕业学校" prop="graduation"></el-table-column>
        <el-table-column label="出生日期" prop="birthday"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="身份证" prop="idCard"></el-table-column>
        <el-table-column label="状态" prop="position"></el-table-column> -->

      <!-- </el-table> -->
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        teacherInfo: [
          {
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
          }
        ]
      }
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>

<style scoped>
  .portrait {
    border: 1px solid red;
    width: 150px;
    height: 100%;
  }
</style>