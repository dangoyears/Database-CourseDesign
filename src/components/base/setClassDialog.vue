<template>
  <el-dialog width="60%" title="开设课程信息" :visible="dialogVisible" v-on:update:visible="$emit('update:dialogVisible')">
    <el-form :model="form" inline>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程名称" required>
            <el-input placeholder="课程名称" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学分" required>
            <el-select v-model="form.credit" placeholder="课程的学分">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item>
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
          <el-form-item>
            <el-select v-model="form.weekEnd" placeholder="第几周">
              <el-option v-for="val in 16" :key="val" :label="val" :value="val" :disabled="val < form.weekStart"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="transform: translate(30%, 10px)">|</el-col>    
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="form.sectionStart" placeholder="第几节">
              <el-option v-for="val in 11" :key="val" :label="val" :value="val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="transform: translate(18%, 10px);">—</el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="form.sectionEnd" placeholder="第几节">
              <el-option v-for="val in 11" :key="val" :label="val" :value="val" :disabled="val < form.sectionStart"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上课地点" required>
            <el-cascader
              v-model="form.address"
              :options="addressOptions"
              :props="{expandTrigger: 'hover'}"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="容纳人数" required>
            <el-input v-model="form.accommodate" placeholder="课程最大可容纳人数"></el-input>
          </el-form-item>
        </el-col>
      </el-row >
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程性质" required>
            <el-select v-model="form.nature" placeholder="课程的性质">
              <el-option value="专业必修课"></el-option>
              <el-option value="专业选修课"></el-option>
              <el-option value="通识课"></el-option>
              <el-option value="实验课"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学院" required>
            <el-select v-model="form.college" placeholder="要开设课程的学院">
              <el-option v-for="key in collegeArr" :key="key" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="专业" required>
            <el-select v-model="form.specialty" aria-placeholder="要开设课程的专业">
              <el-option v-for="key in specialtyArr" :key="key" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="班级" required>
            <el-select v-model="form.class" placeholder="要开设课程的班级">
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
  </el-dialog>
</template>

<script>
  import data from '../../base/data'
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
          accommodate: '',
          address: ''
        },
        addressOptions: data.addressOptions
      }
    },
    methods: {
    
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
      classArr() {
        let arr = this.collegeInfos.map(val => {
          if(val.specialty === this.form.specialty)  return val.grade + val.class;
        })
        return Array.from(new Set(arr.filter(val => val)));
      },
    }
  }
</script>

<style scoped>
  .test {
    width: 20%;
    display: inline-block;
  }
</style>