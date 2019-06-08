<template>
  <el-container class="outer-container">
    <el-aside width="200px">
      <el-menu>
        <el-submenu index="1" v-for="(item, college) in formatCollegeInfos" :key="college">
          <template slot="title">{{college}}</template>
          <el-submenu index="1-1" v-for="(item1, specialty) in item" :key="specialty">
            <template slot="title">{{specialty}}</template>
            <el-menu-item index="1-1-1" v-for="(val, index) in item1" :key="index">{{val}}</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
      <el-menu>
        <el-menu-item class="manager-add" @click="openCollegeInfo"><i class="el-icon-circle-plus-outline"></i></el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <el-table :data="collegeInfos">
          <el-table-column prop="college" label="学院" width=""></el-table-column>
          <el-table-column prop="specialty" label="专业" width=""></el-table-column>
          <el-table-column prop="grade" label="年级"></el-table-column>
          <el-table-column prop="class" label="班级"></el-table-column>
          <el-table-column prop="sum" label="人数"></el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-dialog title="新建学院信息" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="学院" label-width="40px">
          <el-input v-model="form.college" autocomplete="off" @input="testFormInfo"></el-input>
          <p class="dialog-prompt">{{prompt.college}}</p>
        </el-form-item>
        <el-form-item label="专业" label-width="40px">
          <el-input v-model="form.specialty" autocomplete="off" @input="testFormInfo"></el-input>
          <p class="dialog-prompt">{{prompt.specialty}}</p>
        </el-form-item>
        <el-form-item label="年级" label-width="40px">
          <el-input v-model="form.grade" autocomplete="off" @input="testFormInfo"></el-input>
          <p class="dialog-prompt">{{prompt.grade}}</p>
        </el-form-item>
        <el-form-item label="班级" label-width="40px">
          <el-input v-model="form.class" autocomplete="off" @input="testFormInfo"></el-input>
          <p class="dialog-prompt">{{prompt.class}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCollegeInfo">确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import api from '../../api/index'
  export default {
    created() {
      console.log("created");
      api.getCollegeInfo((response) => {
        this.collegeInfos = response.slice(0);
        this.formatingCollegeInfo();
      });
    },
    data() {
      return {
        obj: {a: 1, b: 2},
        collegeInfos: [],
        formatCollegeInfos: {},
        dialogVisible: false,
        // 输入框的提示信息
        prompt: {
          college: '',
          specialty: '',
          grade: '',
          class: ''
        },
        // 弹出框的表单信息
        form: {
          college: '',
          specialty: '',
          grade: '',
          class: ''
        },
      }
    },
    methods: {
      // 打开弹出框并初始化表单信息
      openCollegeInfo() {
        for(let key in this.prompt) {
          this.prompt[key] = "";
          this.form[key] = "";
        }
        this.dialogVisible = true;
      },
      // 校验表单信息是否符合规则
      testFormInfo() {
        for(let key in this.form) {
          if(!this.testLength(this.form[key], 20)) {
            this.prompt[key] = "输入的字数不能超过20个";
            return false;
          }
          else if((key === "college" || key === "specialty") && !this.testChar(this.form[key], "chinese")) {
            let temp = (key === "college") ? "学院名称" : "专业名称"; 
            this.prompt[key] = `${temp}只能包含中文`;
            return false;
          }
          else if((key === "grade" || key === "class") && !this.testChar(this.form[key], "number")) {
            let temp = (key === "grade") ? "年级" : "班级"; 
            this.prompt[key] = `${temp}只能包含数字`;
            return false;
          }
          else {
            this.prompt[key] = "";
          }
        }
        return true;
      },
      // 提交表单信息
      submitCollegeInfo() {
        let mark = false;
        for(let key in this.form) {
          if(this.form[key].length === 0) {
            this.prompt[key] = `输入信息不能为空`;
            mark = true;
          }
        }
        if(mark)  return;
        if(!this.testFormInfo())  return;
        api.uploadCollegeInfo(this.form);
        this.dialogVisible = false;
        this.$message({
          message: '信息创建成功',
          type: 'success',
          duration: 1000,
          showClose: true
        });
      },
      formatingCollegeInfo() {
        // let specialtyArr = [];
        // let classArr = [];
        this.collegeInfos.forEach((val) => {
          if(!this.formatCollegeInfos[val.college])  this.formatCollegeInfos[val.college] = {};
          console.log(this.formatCollegeInfos[val.college]);
          if(!this.formatCollegeInfos[val.college][val.specialty]) this.formatCollegeInfos[val.college][val.specialty] = [];
          console.log(this.formatCollegeInfos[val.college][val.specialty]);
          this.formatCollegeInfos[val.college][val.specialty].push(val.grade + val.class + "");
        })
        console.log(this.formatCollegeInfos);
      }
    },
    computed: {

    }
  }
</script>

<style scoped>
  .outer-container {
    height: calc(100vh - 60px);
    overflow: hidden;
  }
  .manager-add:hover {
    background-color: #eee;
  }
  .manager-add {
    text-align: center;
  }
  .dialog-prompt {
    color: rgb(204, 10, 10);
    font-size: 0.8rem;
    margin-bottom: -25px;

  }
</style>