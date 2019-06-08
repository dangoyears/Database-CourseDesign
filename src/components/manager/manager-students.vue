<template>
  <el-container>
    <el-main>
      <el-table :data="studentInfo">
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="specialty" label="专业"></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="studentId" label="学号"></el-table-column>
        <el-table-column prop="dormitory" label="宿舍"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column>
          <template>
            <el-button type="mini">
              <i class="el-icon-edit"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog title="学生个人信息" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form">
        <el-form-item label="学院" label-width="40px">
          <el-select v-model="form.college" placeholder="请选择学院">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" label-width="40px">
           <el-select v-model="form.specialty" placeholder="请选择专业">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级" label-width="40px">
           <el-select v-model="form.grade" placeholder="请选择入学年份">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" label-width="40px">
          <el-select v-model="form.class" placeholder="请选择班级">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="">确定</el-button>
      </div>
    </el-dialog>
    <img src="../../assets/add.png" class="addIcon" @click="createStudentInfo">
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: true,
        form: {
          college: '',
          specialty: '',
          grade: '',
          class: '',
          name: '',
          studentId: '',
          dormitory: '',
          status: ''
        },
        studentInfo: [
          {
            "college": "计算机科学与网络工程学院",
            "specialty": "软件工程",
            "grade": "17",
            "class": "1",
            "name": "夏侯瑾轩",
            "studentId": "1706300032",
            "dormitory": "B25-513",
            "status": "在读本科"
          }
        ]
      }
    },
    methods: {
      createStudentInfo() {
        this.dialogVisible = true;
      }
    },
    computed: {
    
    }
  }
</script>

<style scoped>
  .addIcon {
    width: 40px;
    height: 40px;
    position: fixed;
    right: 4vw;
    bottom: 8vh;
    border-radius: 50%;
  }
  .addIcon:hover {
    transform: scale(1.2, 1.2) rotate(180deg);
    transition: all linear .2s; 
  }
  el-form-item {
    display: inline-block;
  }
</style>