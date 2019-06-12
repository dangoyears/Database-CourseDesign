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
        <el-table :data="collegeInfos" show-summary summary-method>
          <el-table-column prop="college" label="学院" width="300"></el-table-column>
          <el-table-column prop="specialty" label="专业"></el-table-column>
          <el-table-column prop="grade" label="入学年份"></el-table-column>
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
      <el-form :model="form" ref="form">
        <el-form-item label="学院" label-width="50px" prop="college" :rules="rules.collegeName">
          <el-input v-model="form.college" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业" label-width="50px" prop="specialty" :rules="rules.collegeName">
          <el-input v-model="form.specialty" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级" label-width="50px" prop="grade" :rules="rules.number">
          <el-input v-model="form.grade" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" label-width="50px" prop="class" :rules="rules.number">
          <el-input v-model="form.class" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="submitCollegeInfo">确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import api from '../../api/index'
  import rules from '../../base/rules'

  export default {
    props: ["formatCollegeInfos", "collegeInfos", "token"],
    data() {
      return {
        dialogVisible: false,
        rules: rules,
        // 弹出框的表单信息
        form: {
          college: '',
          specialty: '',
          grade: '',
          class: '',
          token: this.token
        }
      }
    },
    methods: {
      // 打开弹出框并初始化表单信息
      openCollegeInfo() {
        this.dialogVisible = true;
        this.$nextTick(() => {
            this.$refs['form'].clearValidate();
        })
      },
      // 提交表单信息
      submitCollegeInfo() {
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
        api.uploadCollegeInfo(this.form);
        this.dialogVisible = false;
        this.$message({
          message: '信息创建成功',
          type: 'success',
          duration: 1000,
          showClose: true
        });
        this.form = {};
      },
      // 删除学院数据
      deleteCollegeInfo(info) {
        console.log(info);
        this.$confirm('是否确定要删除该条数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        })
        .catch(() => {});
      },
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
  .labelStyle {
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>