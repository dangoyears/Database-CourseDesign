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
      <el-form :model="form" :inline="true" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="学院" label-width="40px">
              <el-select v-model="form.college" placeholder="请选择学院">
                <el-option v-for="val in collegeArr" :key="val" :label="val" :value="val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业" width="40px">
              <el-select v-model="form.specialty" placeholder="请选择专业" class="create-form-item">
                <el-option v-for="val in specialtyArr" :key="val" :label="val" :value="val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年级" label-width="40px">
              <el-select v-model.number="form.grade" placeholder="请选择入学年份">
                <el-option v-for="val in gradeArr" :key="val" :label="val" :value="val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级" label-width="40px">
              <el-select v-model.number="form.class" placeholder="请选择班级">
                <el-option v-for="val in classArr" :key="val" :label="val" :value="val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" label-width="40px">
              <el-input placeholder="请输入学生姓名" v-model.number="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学号" label-width="40px">
              <el-input placeholder="请输入学生学号" v-model="form.studentId"></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        <el-form-item label="性别" label-width="40px">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" label-width="50px" prop="age" :rules="rules.number">
          <el-input placeholder="请输入学生年龄" v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="学历" label-width="40px">
          <el-select v-model="form.sex" placeholder="请选择学历">
            <el-option label="在读本科" value="在读本科"></el-option>
            <el-option label="在读研究生" value="在读研究生"></el-option>
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
    props: ["formatCollegeInfos", "collegeInfos"],
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
          status: '',
          sex: '',
          age: ''
        },
        studentInfo: [
          {
            "college": "计算机科学与网络工程学院",
            "specialty": "软件工程",
            "grade": "17",
            "class": "1",
            "name": "夏侯瑾轩",
            "studentId": "1706300032",
            "status": "在读本科"
          }
        ],
        rules: {
          number: [
            {required: true, message: '输入不能为空', trigger: ['blur', 'change']},
            {type: 'number', message: '输入值必须为数字', trigger: ['blur', 'change']}
          ]
        }
      }
    },
    methods: {
      createStudentInfo() {
        this.dialogVisible = true;
      }
    },
    computed: {
      collegeArr() {
        let arr = this.collegeInfos.map(val => {
          return val.college;
        })
        return Array.from(new Set(arr));
      },
      specialtyArr() {
        let arr = this.collegeInfos.map(val => {
          if(val.college === this.form.college)  return val.specialty;
        })
        return Array.from(new Set(arr.filter(val => val)));
      },
      gradeArr() {
        let arr = this.collegeInfos.map(val => {
          if(val.specialty === this.form.specialty)  return val.grade;
        })
        return Array.from(new Set(arr.filter(val => val)));
      },
      classArr() {
        let arr = this.collegeInfos.map(val => {
          if(val.grade === this.form.grade)  return val.class;
        })
        return Array.from(new Set(arr.filter(val => val)));
      }
    },
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
  .create-form-item {
    /* width: 40%; */
    /* float: left; */
    /* display: inline-block; */
  }
</style>