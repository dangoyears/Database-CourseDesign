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
        <el-menu-item class="manager-add" @click="dialogFormVisible=true"><i class="el-icon-circle-plus-outline"></i></el-menu-item>
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

    <el-dialog title="新建学院信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="学院" label-width="40px">
          <el-input v-model="form.college" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业" label-width="40px">
          <el-input v-model="form.specialty" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级" label-width="40px">
          <el-input v-model="form.grade" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" label-width="40px">
          <el-input v-model="form.class" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible=false">确定</el-button>
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
        dialogTableVisible: true,
        dialogFormVisible: true,
        form: {
          college: '',
          specialty: '',
          grade: '',
          class: ''
        },
      }
    },
    methods: {

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
</style>