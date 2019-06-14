<template>
  <el-dialog width="60%" title="开设课程信息" :visible="dialogVisible" v-on:update:visible="$emit('update:dialogVisible')">
    <el-form :model="form" inline>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程名称" required prop="name" :rules="rules.userName">
            <el-input placeholder="课程名称" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学分" required>
            <el-select v-model="form.credit" placeholder="课程的学分" prop="credit" :rules="rules.empty">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程性质" required prop="nature" :rules="rules.empty">
            <el-select v-model="form.nature" placeholder="课程的性质">
              <el-option value="专业必修课"></el-option>
              <el-option value="专业选修课"></el-option>
              <el-option value="通识课"></el-option>
              <el-option value="实验课"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任课教师" required prop="teacher" :rules="rules.empty">
            <el-select v-model="form.teacher" placeholder="请选择任课教师">
              <el-option value="xxx"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="weekStart" :rules="rules.empty">
          <el-col :span="8">课程时间</el-col>
          <el-col :span="16">
            <el-select v-model="form.weekStart" placeholder="第几周">
              <el-option v-for="val in 16" :key="val" :label="val" :value="val"></el-option>
            </el-select>
          </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="transform: translate(18%, 10px)">—</el-col>
        <el-col :span="4">
          <el-form-item prop="weekEnd" :rules="rules.empty">
            <el-select v-model="form.weekEnd" placeholder="第几周">
              <el-option v-for="val in 16" :key="val" :label="val" :value="val" :disabled="val < form.weekStart"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="transform: translate(30%, 10px)">|</el-col>    
        <el-col :span="4">
          <el-form-item prop="sectionStart" :rules="rules.empty">
            <el-select v-model="form.sectionStart" placeholder="第几节">
              <el-option v-for="val in 11" :key="val" :label="val" :value="val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="transform: translate(18%, 10px);">—</el-col>
        <el-col :span="4">
          <el-form-item prop="sectionEnd" :rules="rules.empty">
            <el-select v-model="form.sectionEnd" placeholder="第几节">
              <el-option v-for="val in 11" :key="val" :label="val" :value="val" :disabled="val < form.sectionStart"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上课地点" required prop="address" :rules="rules.empty">
            <el-cascader
              v-model="form.address"
              :options="addressOptions"
              :props="{expandTrigger: 'hover'}"
              separator=""
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="容纳人数" required prop="accommodate" :rules="accommodateRule">
            <el-input v-model="form.accommodate" placeholder="课程最大可容纳人数"></el-input>
          </el-form-item>
        </el-col>
      </el-row >
      <el-row>
        <el-col :span="12">
          <el-form-item label="学院" required>
            <el-select v-model="form.college" placeholder="要开设课程的学院">
              <el-option value="无限制"></el-option>
              <el-option v-for="key in collegeArr" :key="key" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业" required>
            <el-select v-model="form.specialty" aria-placeholder="要开设课程的专业">
              <el-option value="无限制"></el-option>
              <el-option v-for="key in specialtyArr" :key="key" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="班级" required>
            <el-select v-model="form.class" placeholder="要开设课程的班级">
              <el-option value="无限制"></el-option>
              <el-option v-for="key in classArr" :key="key" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
     
      <!-- <el-row>
        <el-col :span="12">

        </el-col>
        <el-col :span="12">
          
        </el-col>
      </el-row > -->
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClassInfos">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import data from '../../base/data'
  import rules from '../../base/rules'
  export default {
    props: {
      dialogVisible:  {
        type: Boolean,
        required: true,
      },
      collegeInfos: {
        type: Array,
        required: true,
      }
    },
    data() {
      return {
        form: {
          name: '',
          credit: '',
          weekStart: '',
          weekEnd: '',
          sectionStart: '',
          sectionEnd: '',
          college: '',
          specialty: '',
          class: '',
          nature: '',
          teacher: '',
          accommodate: '',
          address: ''
        },
        // 上课地点的级联信息
        addressOptions: data.addressOptions,
        rules: rules,
        accommodateRule: [
          {
            required: true,
            message: '输入不能为空',
            trigger: ['blur', 'change']
          },
          {
            pattern: /[0-9]/,
            message: '输入要求是数字',
            trigger: ['blur', 'change']
          },
          {
            validator: function(rule, value, callback) {
              if(value >=1 && value <= 200)  callback();
              else  callback(new Error("可容纳人数的范围在1-200之间"));
            },
            trigger: ['blur', 'change']
          }
        ]  
      }
    },
    methods: {
      // 提交表单信息
      submitClassInfos() {
        this.formattingAddress();
        console.log(this.form);
        console.log(this.form.address);
      },
      // 格式化上课地点
      // 原本格式为："理科南教学楼", "理科南教学楼+6", "理科南教学楼+6+06"
      formattingAddress(arr) {
        let str = "";
        this.form.address.forEach((val, index) => {
          if(index === 0)  str += val;
          else if(index === 1) {
            str += val.replace(/^[\u4e00-\u9fa5]+\+/g, '');
          }
          else if(index === 2) { 
            str += val.replace(/^[\u4e00-\u9fa5]+\+[0-9]+\+/g, '');
          }
        })
        this.form.address = str;
      }
    },
    computed: {
      // 集成所有的学院
      collegeArr() {
        let arr = this.collegeInfos.map(val => {
          return val.college;
        })
        return Array.from(new Set(arr));
      },
      // 根据所选的学院集成它所包含的专业
      specialtyArr() {
        let arr = this.collegeInfos.map(val => {
          if(val.college === this.form.college)  return val.specialty;
        })
        return Array.from(new Set(arr.filter(val => val)));
      },
      // 根据所选的专业集成它所包含的班级
      classArr() {
        let arr = this.collegeInfos.map(val => {
          if(val.specialty === this.form.specialty)  return val.grade + val.class;
        })
        return Array.from(new Set(arr.filter(val => val)));
      }
    }
  }
</script>

<style scoped></style>