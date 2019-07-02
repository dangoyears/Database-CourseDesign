<template>
  <el-container>
    <el-main>
      <el-table :data="courseInfo">
        <el-table-column prop="class" label="班级" width="250" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <label>{{formattingClass(scope.row.class)}}</label>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="课程名称" width="160" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="id" label="课程编号" width="130" sortable></el-table-column>
        <el-table-column prop="credit" label="学分" width="80" sortable></el-table-column>
        <el-table-column prop="nature" label="课程性质" width="120" sortable></el-table-column>
        <el-table-column prop="time" label="上课时间" width="170" sortable></el-table-column>
        <el-table-column prop="address" label="上课地点" width="160" sortable></el-table-column>
        <el-table-column prop="teachers" label="任课教师" width="120" show-overflow-tooltip sortable>
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
      v-on:update:dialogVisible="closeClassDialogVisible"
      @updateClassInfo="updateClassInfo"
      :editClassInfo="editClassInfo"
      :isEditClass="isEditClass"
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
        courseInfo: [],
        isEditClass: false,
        editClassInfo: {}
      }
    },
    methods: {
      editCourseInfo(item) {
        this.isEditClass = true;
        this.editClassInfo = JSON.parse(JSON.stringify(item));
        this.classInfoVisible = true;
      },
      // 删除课程，并及时更新课程信息
      deleteCourseInfo(item) {
        this.$confirm(`是否确定要永久删除${item.name}课程?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          api.deleteCourse(item.id, this.token, () => {
            this.updateClassInfo();
          });
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          })
        })
        .catch(() => {});
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
      closeClassDialogVisible() {
        this.classInfoVisible = false;
        this.isEditClass = false;
      },
      // 创建课程信息后重新请求数据
      updateClassInfo() {
        api.getClassInfo((response) => {
          this.courseInfo = response;
        }, this.token);
      },
      // 格式化后端返回的班级信息，只显示出专业和班级
      formattingClass(str) {
        str = str.replace(/[\[\]\']/g, '');
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