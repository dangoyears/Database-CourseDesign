<template>
  <el-container>
    <el-main>
      <el-table :data="courseInfo">
        <el-table-column prop="class" label="学院" width="200" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <label>{{scope.row.class[0].match(/^[\u4E00-\u9FA5]+/)[0]}}</label>
          </template>
        </el-table-column>
        <el-table-column prop="class" label="班级" width="140" sortable>
          <template slot-scope="scope">
            <label>{{scope.row.class[0].replace(/^[\u4E00-\u9FA5]+\-/, '').replace(/\-/g, '')}}</label>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="课程名称" width="170" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="credit" label="学分" width="110" sortable></el-table-column>
        <el-table-column prop="nature" label="课程性质" width="150" sortable></el-table-column>
        <el-table-column prop="time" label="上课时间" width="150" sortable></el-table-column>
        <el-table-column prop="address" label="上课地点" width="150" sortable></el-table-column>
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
    </el-main>
    <class-dialog 
      :dialogVisible="classInfoVisible"
      :collegeInfos="collegeInfos"
      v-on:update:dialogVisible="changeClassDialogVisible"
      ></class-dialog>
    <img src="../../assets/add.png" class="addIcon" @click="setClassInfo">
  </el-container>
</template>

<script>
  import classDialog from '../base/setClassDialog'

  export default {
    components: {
      'class-dialog': classDialog
    },
    props: ["collegeInfos", "token"],
    data() {
      return {
        classInfoVisible: false,
        dialogVisible: false,
        courseInfo: [
          {
            name: "数据结构",
            credit: "2",
            nature: "专业必修课",
            accommodate: "50",
            selectedSum: "50",
            time: "第7-14周,第4-6节",
            teachers: ["龙应台", "周国平", "东野圭吾", "村上春树"],
            courseLeader: "yyy",
            address: "理科南教学楼710",
            class: ['计算机科学与网络学院-软件工程-171']
          }
        ]
      }
    },
    methods: {
      editCourseInfo() {
        
      },
      deleteCourseInfo() {

      },
      // 打开弹出框并初始化表单信息
      openCollegeInfo() {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs['form'].clearValidate();
        })
      },
      // 将任课教师数组格式化成字符串
      formattingTeachers(arr) {
        let str = "";
        arr.forEach((val, index) => {
          str += (index !== arr.length-1) ? `${val}, ` : val;
        })
        return str;
      },
      // 打开开设课程的弹框
      setClassInfo() {
        this.classInfoVisible = true;
      },
      changeClassDialogVisible() {
        this.classInfoVisible = false;
      },
    }
  }
</script>

<style scoped>

</style>