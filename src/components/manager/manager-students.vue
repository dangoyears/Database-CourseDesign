<template>
  <el-container>
    <el-main>
      <el-table :data="studentInfo">
        <el-table-column prop="college" label="学院" show-overflow-tooltip></el-table-column>
        <el-table-column prop="specialty" label="专业" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="grade" label="年级" width="80"></el-table-column>
        <el-table-column prop="class" label="班级" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="110"></el-table-column>
        <el-table-column prop="studentId" label="学号" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="status" label="状态" width="110"></el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="120"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="idCard" label="身份证"></el-table-column>
        <el-table-column width="60">
          <template slot-scope="scope">
            <el-button type="mini" @click="editStudentInfo(scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
          </template>
        </el-table-column>
         <el-table-column width="70">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteStudentInfo(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog title="学生个人信息" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" ref="form" inline>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学院" label-width="50px" prop="college" :rules="rules.empty" required>
              <el-select v-model="form.college" placeholder="请选择学院">
                <el-option v-for="val in collegeArr" :key="val" :value="val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业" label-width="50px" prop="specialty" :rules="rules.empty" required>
              <el-select v-model="form.specialty" placeholder="请选择专业">
                <el-option v-for="val in specialtyArr" :key="val" :value="val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年级" label-width="50px" prop="grade" :rules="rules.empty" required>
              <el-select v-model="form.grade" placeholder="请选择入学年份">
                <el-option v-for="val in gradeArr" :key="val" :value="val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级" label-width="50px" prop="class" :rules="rules.empty" required>
              <el-select v-model="form.class" placeholder="请选择班级">
                <el-option v-for="val in classArr" :key="val" :value="val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" label-width="50px" required :rules="rules.userName" prop="name">
              <el-input placeholder="请输入学生姓名" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学号" label-width="50px" required :rules="rules.numberId" prop="studentId">
              <el-input placeholder="请输入学生学号" v-model="form.studentId" :disabled="editingDialog"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" label-width="50px" prop="sex" :rules="rules.empty" required>
              <el-radio v-model="form.sex" label="男">男</el-radio>
              <el-radio v-model="form.sex" label="女">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历" label-width="50px" prop="status" :rules="rules.empty" required>
              <el-radio-group v-model="form.status">
                <el-radio-button label="在读本科生">在读本科生</el-radio-button>
                <el-radio-button label="在读研究生">在读研究生</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生日期" label-width="80px" prop="birthday" :rules="rules.birthday" required>
              <el-date-picker type="date" v-model="form.birthday" placeholder="请选择出生日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" label-width="50px">
              <el-input disabled :placeholder="computeAge"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="身份证" label-width="65px" prop="idCard" :rules="rules.idCard" required>
            <el-input v-model="form.idCard" placeholder="请输入身份证证件号"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="submitStudentInfos">确定</el-button>
      </div>
    </el-dialog>
    <img src="../../assets/add.png" class="addIcon" @click="createStudentInfo">
  </el-container>
</template>

<script>
  import rules from '../../base/rules'
  export default {
    props: ["formatCollegeInfos", "collegeInfos"],
    data() {
      return {
        dialogVisible: false,
        editingDialog: false,
        form: {
          college: '',
          specialty: '',
          grade: '',
          class: '',
          name: '',
          studentId: '',
          status: '',
          sex: '',
          birthday: '',
          age: '',
          idCard: '',
          password: ''
        },
        studentInfo: [
          {
            "college": "计算机科学与网络工程学院",
            "specialty": "软件工程",
            "grade": "17",
            "class": "1",
            "name": "夏侯瑾轩",
            "studentId": "1706300032",
            "sex": "男",
            "status": "在读本科生",
            "birthday": "1998-09-06",
            "age": "21",
            "idCard": "440582199708310612"
          }
        ],
        // 表单的校验规则
        rules: rules
      }
    },
    methods: {
      createStudentInfo() {
        if(this.editingDialog) {
          this.form = {};
          this.$nextTick(() => {
            this.$refs['form'].clearValidate();
          })
        }
        this.dialogVisible = true;
        this.editingDialog = false;
        // 增加和编辑同用一个弹框，第一次弹出 this.$refs['form'] 会是undefined，或是用 $nextTick
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].clearValidate();
        }
      },
      submitStudentInfos() {
        let res;
        // 校验表单中的数据
        this.$refs['form'].validate(valid => res = valid);
        if(!res) {
          this.$message({
            message: '填写的信息有误，请修正后再提交',
            type: 'error',
            duration: 1000
          });
          return;
        }
        // 学生账号登陆密码为身份证后六位
        this.form.password = this.form.idCard.slice(-6);
        this.$message({
          message: '创建成功。',
          type: 'success',
          duration: 1000
        });
      },
      editStudentInfo(item) {
        // 需要深拷贝一份，否则编辑时会马上修改到表格中
        this.form = JSON.parse(JSON.stringify(item));
        this.editingDialog = true;
        this.dialogVisible = true;
      },
      deleteStudentInfo(item) {
        this.$confirm(`是否确定要永久删除${item.name}的个人信息?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          })
        })
        .catch(() => {});
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
      },
      computeAge() {
        // 如果是编辑信息，需要将出生日期转换为时间戳的形式，才好计算年龄
        if(this.editingDialog) {
          this.form.birthday = new Date(this.form.birthday);
        }
        if(!this.form.birthday)  return '';
        // 根据天数计算年龄
        let total = new Date().getTime() - Number(this.form.birthday);
        let days = parseInt(total / 1000 / 86400);
        let age = Math.ceil(days / 365);
        this.form.age = age;
        // 格式化出生年月日，如 "xxxx-xx-xx"
        let temp = new Date(this.form.birthday);
        let year =  temp.getFullYear() + "";
        let month = temp.getMonth() + 1;
        month = month >= 10 ? month + "" : "0" + month;
        let day = temp.getDate();
        day = day >= 10 ? day + "" : "0" + day;
        this.form.birthday = year + '-' + month + '-' + day;
        return (days <= 0) ? '' : age;
      }
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
</style>