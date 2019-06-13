<template>
  <el-dialog title="开设课程信息" :visible="dialogVisible" v-on:update:visible="$emit('update:dialogVisible')">
    <el-form :model="form" inline>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程名称">
            <el-input placeholder="请输入要开设的课程名称" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学分">
            <el-select v-model="form.credit" placeholder="请选择该课程的学分">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row tag="span">
        <el-col :span="6" style="border: 1px solid black">
          <el-form-item>
            <el-col :span="9">课程时间</el-col>
            <el-col :span="15" style="border: 1px solid red">
              <el-select v-model="form.weekStart" placeholder="开始周数">
                <el-option v-for="val in 16" :key="val" :label="val" :value="val"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="transform: translate(0, 10px); border: 1px solid green">—</el-col>
        <el-col :span="4" style="border: 1px solid blue">
          <el-form-item>
            <el-select v-model="form.weekStart" placeholder="开始周数">
              <el-option v-for="val in 16" :key="val" :label="val" :value="val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="1" style="transform: translate(0, 10px); border: 1px solid green">,</el-col>    

        <el-col :span="6" style="border: 1px solid black">
          <el-form-item>
            <el-col :span="9">课程时间</el-col>
            <el-col :span="15" style="border: 1px solid red">
              <el-select v-model="form.weekStart" placeholder="开始周数">
                <el-option v-for="val in 16" :key="val" :label="val" :value="val"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="transform: translate(0, 10px); border: 1px solid green">—</el-col>
        <el-col :span="4" style="border: 1px solid blue">
          <el-form-item>
            <el-select v-model="form.weekStart" placeholder="开始周数">
              <el-option v-for="val in 16" :key="val" :label="val" :value="val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">

        </el-col>
        <el-col :span="12">
          
        </el-col>
      </el-row> -->
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      dialogVisible:  {
        type: Boolean,
        required: true,
      },
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
            value1: [[1, 2, 3], [1,2,3]],
            // value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],

        }
      }
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>

<style scoped>
  .test {
    width: 20%;
    display: inline-block;
  }
</style>