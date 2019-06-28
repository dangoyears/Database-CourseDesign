<template>
  <el-container>
    <el-main>
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
    </el-main>
    <class-dialog 
      :dialogVisible="classInfoVisible"
      :collegeInfos="collegeInfos"
      :token="token"
      v-on:update:dialogVisible="changeClassDialogVisible"
      @updateClassInfo="updateClassInfo"
      ></class-dialog>
    <img src="../../assets/add.png" class="addIcon" @click="setClassInfo">
  </el-container>
</template>

<script>
  import classDialog from '../base/setClassDialog'
  import api from '../../api/index'

  export default {
    created() {
      this.updateClassInfo();
    },
    components: {
      'class-dialog': classDialog
    },
    props: ["collegeInfos", "token"],
    data() {
      return {
        classInfoVisible: false,
        dialogVisible: false,
        courseInfo: []
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
      // 创建课程信息后重新请求数据
      updateClassInfo() {
        api.getClassInfo((response) => {
          this.courseInfo = response;
        }, this.token);
      },
      // 格式化后端返回的班级信息，只显示出专业和班级
      formattingClass(str) {
        let arr = str.split(',');
        let res = "";
        arr.forEach((val, index) => {
          let temp = val.replace(/^[\u4E00-\u9FA5]+\-/, '').replace(/\-/, '');
          res += temp + "，";
        })
        return res.substr(0, res.length-1);
      }
    }
  }
</script>

<style scoped>

</style>