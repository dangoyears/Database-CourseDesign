<template>
  <el-container class="outer-container">
    <el-aside width="200px">
      <el-menu>
        <el-submenu index="1">
          <template slot="title">导航一</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
      <el-menu>
        <el-menu-item class="manager-add" @click="dialogVisible=true"><i class="el-icon-circle-plus-outline"></i></el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="学院" width=""></el-table-column>
          <el-table-column prop="name" label="专业" width=""></el-table-column>
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
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: 'lxy',
        address: 'xxxxxx'
      };
      return {
        tableData: Array(20).fill(item),
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
      testFormInfo(val) {
        for(let key in this.form) {
          if(!this.testLength(this.form[key], 20)) {
            this.prompt[key] = "输入的字数不能超过20个";
          }
          else if((key === "college" || key === "specialty") && !this.testChar(this.form[key], "chinese")) {
            let temp = (key === "college") ? "学院名称" : "专业名称"; 
            this.prompt[key] = `${temp}只能包含中文`;
          }
          else if((key === "grade" || key === "class") && !this.testChar(this.form[key], "number")) {
            let temp = (key === "grade") ? "年级" : "班级"; 
            this.prompt[key] = `${temp}只能包含数字`;
          }
          else {
            this.prompt[key] = "";
          }
        }
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