<template>
  <!-- <el-table :data="courses">
    <el-table-column prop="name" label="课程名称" width="220"></el-table-column>
    <el-table-column prop="credit" label="学分" width="120"></el-table-column>
    <el-table-column prop="nature" label="课程性质" width="200"></el-table-column>
    <el-table-column prop="time" label="时间" width="250"></el-table-column>
    <el-table-column prop="address" label="教室" width="250"></el-table-column>
    <el-table-column prop="teachers" label="任课教师" width="250" show-overflow-tooltip>
      <template slot-scope="scope">
        <label>{{formattingTeachers(scope.row.teachers)}}</label>
      </template>
    </el-table-column>
    <el-table-column prop="score" label="分数" sortable></el-table-column>
  </el-table> -->
      <el-table :data="courseInfo">
        <el-table-column prop="class" label="班级" width="300" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <label>{{formattingClass(scope.row.class)}}</label>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="课程名称" width="170" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="credit" label="学分" width="110" sortable></el-table-column>
        <el-table-column prop="nature" label="课程性质" width="150" sortable></el-table-column>
        <el-table-column prop="time" label="上课时间" width="170" sortable></el-table-column>
        <el-table-column prop="address" label="上课地点" width="170" sortable></el-table-column>
        <el-table-column prop="teachers" label="任课教师" width="180" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <label>{{formattingTeachers(scope.row.teachers)}}</label>
          </template>
        </el-table-column>
        <el-table-column prop="courseLeader" label="课程组长" width="100" sortable></el-table-column>
        <el-table-column width="60">
          <template slot-scope="scope">
            <el-button type="mini" @click="editCourseInfo(scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteCourseInfo(scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
</template>

<script>
  export default {
    data() {
      return {
        courses: [
          {
            name: "数据结构",
            credit: "2",
            nature: "专业必修课",
            time: "第7-14周,第4-6节",
            teachers: ["龙应台", "周国平", "东野圭吾", "村上春树"],
            address: "理科南教学楼710",
            score: "90",
            class: [],
            courseLeader: '',
            accommodate: '',
            selectedSum: '',
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
    },
    computed: {
    
    }
  }
</script>

<style scoped>

</style>