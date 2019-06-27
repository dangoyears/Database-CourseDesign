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
            <el-menu-item :index="val" v-for="val in item1" :key="collegeName + specialtyName + val">{{val}}</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
      <el-menu>
        <el-menu-item class="admin-add" @click="openCollegeInfo"><i class="el-icon-circle-plus-outline"></i></el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <el-table :data="collegeInfos" show-summary :summary-method="summaryCompute" :default-sort="{prop: 'college', order: 'ascending'}">
          <el-table-column prop="college" label="学院" width="300" sortable
            :filters="filterCollegeArr"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column prop="specialty" label="专业" sortable
            :filters="filterSpecialtyArr"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column prop="grade" label="入学年份" sortable
            :filters="filterGradeArr"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column prop="class" label="班级" sortable></el-table-column>
          <el-table-column prop="sum" label="人数" sortable></el-table-column>
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
    mounted() {
      // 不知道为什么，对于默认的子组件，props中的对象会是一个Observer，无法获取到里面的数据。使用nextTick也没用，只能在切换组件或等一段时间之后才能恢复成正常的对象格式（更诡异的是如果我在代码前面加两句console.log打印prop中的值就不会出现这个问题了...Orz）
      // 所以不使用computed来计算filterCollege。采用在mounted中使用定时器读取数据。
      setTimeout(() => {
        let gradeTemp = Object.keys(this.formatCollegeInfos);
        // 集成所有的学院名
        let collegeTemp = Object.keys(this.formatCollegeInfos);
        collegeTemp.forEach((val) => {
          this.filterCollegeArr.push({text: val, value: val});
        })
        // 集成所有的专业名
        collegeTemp.forEach((val) => {
          for(let key in this.formatCollegeInfos[val]) {
            this.filterSpecialtyArr.push({text: key, value: key});
          }
        })
        // 集成所有的入学年份
        let temp = [];
        this.collegeInfos.forEach((val) => {
          temp.push(val.grade);
        })
        temp.sort();
        Array.from(new Set(temp)).forEach((val) => {
          this.filterGradeArr.push({text: val, value: val});
        })
      }, 1000)
    },
    props: ["collegeInfos", "token"],
    data() {
      return {
        formatCollegeInfos: {},   // 格式化后的数据
        dialogVisible: false,
        rules: rules,
        search: '',
        filterCollegeArr: [],
        filterSpecialtyArr: [],
        filterGradeArr: [],
        // 弹出框的表单信息
        form: {
          college: '',
          specialty: '',
          grade: '',
          class: ''
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
        api.uploadCollegeInfo(this.form, this.token);
        // 把新创建的班级信息添加到collegeInfos，这样不重新请求数据就可以及时显示新数据
        let temp = Object.assign(this.form, {sum: 0});
        this.collegeInfos.push(temp);
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
        // 确保所有数据都为string类型
        for(let [key, val] of Object.entries(info)) {
          info[key] = val + "";
        }
        this.$confirm('是否确定要删除该条数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          // 删除后修改collegeInfos，这样不重新请求数据就可以及时显示新数据
          for(let i=0; i<this.collegeInfos.length; i++) {
            if(JSON.stringify(this.collegeInfos[i]) === JSON.stringify(info)) {
              this.collegeInfos.splice(i, 1);
              break;
            }
          }
          api.deleteCollegeInfo(info, this.token);
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        })
        .catch(() => {});
      },
      // 设置学院表单的合计信息
      summaryCompute(param) {
        let {columns, data} = param;
        let res = {};
        let collegeArr = [];
        let specialtyArr = [];
        let gradeArr = [];
        for(let i=0, len=data.length; i<len; i++) {
          collegeArr.push(data[i].college);
          specialtyArr.push(data[i].specialty);
          gradeArr.push(data[i].grade);
          res.class = res.class + 1 || 1;
          res.sum = res.sum + Number(data[i].sum) || Number(data[i].sum);
        }
        res.college = `总共有 ${[...new Set(collegeArr)].length} 个学院`;
        res.specialty = `设有 ${[...new Set(specialtyArr)].length} 个专业`;
        res.grade = `已有 ${[...new Set(gradeArr)].length} 届学生`;
        res.class = `总共有 ${res.class} 个班级`;
        res.sum = `总共有 ${res.sum} 名学生`;
        const sums = [];
        columns.forEach((val, index) => {
          sums.push(res[val.property]);
        })
        return sums;
      },
      // 筛选学院
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    },
    watch: {
      // 格式化后端返回的数据，用于左侧边栏显示
      /* 
        {
          college: {
            specialty: {
              class: []
            }
          }
        }
      */
      collegeInfos() {
        this.formatCollegeInfos = {};
        this.collegeInfos.forEach((val) => {
          // 若是第一次新创建学院/专业，对象/数组会为undefined
          if(!this.formatCollegeInfos[val.college])  this.formatCollegeInfos[val.college] = {};
          let college = this.formatCollegeInfos[val.college];
          if(!college[val.specialty])  college[val.specialty] = [];
          college[val.specialty].push(`${val.grade}${val.class}`);
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
  .admin-add:hover {
    background-color: #eee;
  }
  .admin-add {
    text-align: center;
  }
  .labelStyle {
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>