<template>
  <el-container>
    <el-main>
      <el-table :data="teacherInfo">
        <el-table-column prop="college" label="学院" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
        <el-table-column prop="jobId" label="工号" width="140" sortable></el-table-column>
        <el-table-column prop="sex" label="性别" width="100" sortable></el-table-column>
        <el-table-column prop="education" label="学历" width="100" sortable></el-table-column>
        <el-table-column prop="graduation" label="毕业学校" width="150" sortable></el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="140" sortable></el-table-column>
        <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
        <el-table-column prop="idCard" label="身份证" sortable></el-table-column>
        <el-table-column prop="position" label="状态" width="120" sortable></el-table-column>
        <el-table-column width="60">
          <template slot-scope="scope">
            <el-button type="mini" @click="editTeacherInfo(scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteTeacherInfo(scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog title="教师个人信息" :visible.sync="dialogVisible" width="50%">
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
            <el-form-item label="姓名" label-width="50px" required :rules="rules.userName" prop="name">
              <el-input placeholder="请输入教师姓名" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工号" label-width="50px" required :rules="rules.numberId" prop="jobId" sortable>
              <el-input placeholder="请输入教师工号" v-model="form.jobId" :disabled="editingDialog"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" label-width="50px" prop="sex" :rules="rules.empty" required>
              <el-radio v-model="form.sex" label="男">男</el-radio>
              <el-radio v-model="form.sex" label="女">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学历" label-width="50px" prop="education" :rules="rules.empty" required>
              <el-select v-model="form.education" placeholder="请选择教师的学历">
                <el-option value="硕士"></el-option>
                <el-option value="博士"></el-option>
                <el-option value="博士后"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="毕业学校" label-width="80px" required :rules="rules.userName" prop="graduation">
              <el-input placeholder="请输入教师的毕业学校" v-model="form.graduation"></el-input>
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
          <el-col :span="12">
            <el-form-item label="身份证" label-width="65px" prop="idCard" :rules="rules.idCard" required>
              <el-input v-model="form.idCard" placeholder="请输入身份证证件号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限" label-width="50px" prop="position" :rules="rules.empty" required sortable>
              <el-radio-group v-model="form.position">
                <el-radio-button label="教务办主任">教务办主任</el-radio-button>
                <el-radio-button label="普通教师">普通教师</el-radio-button>
                <el-radio-button label="已离职">已离职</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="submitTeacherInfos">确定</el-button>
      </div>
    </el-dialog>
    <img src="../../assets/add.png" class="addIcon" @click="createTeacherInfos">
  </el-container>
</template>

<script>
  import rules from '../../base/rules'
  import api from '../../api/index'

  export default {
    created() {
      api.getTeacherInfo((response) => {
        console.log(response);
      }, this.token);
    },
    props: ["collegeInfos", "token"],
    data() {
      return {
        dialogVisible: false,
        editingDialog: false,
        form: {
          college: '',
          name: '',
          jobId: '',
          sex: '',
          education: '',
          graduaction: '',
          birthday: '',
          age: '',
          idCard: '',
          password: '',
          position: ""
        },
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
        ],
        // 表单的校验规则
        rules: rules
      }
    },
    methods: {
      // 打开弹框
      createTeacherInfos() {
        if(this.editingDialog) {
          this.form = {};
          this.$nextTick(() => {
            this.$refs['form'].clearValidate();
          })
        }
        this.dialogVisible = true;
        // 增加和编辑同用一个弹框，第一次弹出 this.$refs['form'] 会是undefined，或是用 $nextTick
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].clearValidate();
        }
      },
      submitTeacherInfos() {
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
        api.uploadTeacherInfo(this.form, this.token);
        console.log("return data");
        api.getTeacherInfo((response) => {
          console.log(response);
        }, this.token);
        this.$message({
          message: '创建成功。',
          type: 'success',
          duration: 1000
        });
      },
      editTeacherInfo(item) {
        // 需要深拷贝一份，否则编辑时会马上修改到表格中
        this.form = JSON.parse(JSON.stringify(item));
        this.editingDialog = true;
        this.dialogVisible = true;
      },
      deleteTeacherInfo(item) {
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

<style scoped></style>