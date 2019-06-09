<template>
  <el-container class="outer-container">
    <el-aside width="200px">
      <el-menu>
        <el-submenu :index="collegeName" v-for="(item, collegeName) in formatCollegeInfos" :key="collegeName">
          <template slot="title">
            <p class="labelStyle" :title="collegeName">{{collegeName}}</p>
          </template>
          <el-submenu :index="specialtyName" v-for="(item1, specialtyName) in item" :key="specialtyName">
            <template slot="title">
              <p class="labelStyle" :title="specialtyName">{{specialtyName}}</p>
            </template>
            <el-menu-item :index="val" v-for="val in item1" :key="val">{{val}}</el-menu-item>
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
          <el-table-column prop="college" label="学院"></el-table-column>
          <el-table-column prop="specialty" label="专业"></el-table-column>
          <el-table-column prop="grade" label="年级"></el-table-column>
          <el-table-column prop="class" label="班级"></el-table-column>
          <el-table-column prop="sum" label="人数"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteCollegeInfo(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
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
    props: ["formatCollegeInfos", "collegeInfos"],
    data() {
      return {
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
      // 删除学院数据
      deleteCollegeInfo(info) {
        console.log(info);
        this.$confirm('是否确定要删除该条数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        })
      }
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
  .labelStyle {
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>