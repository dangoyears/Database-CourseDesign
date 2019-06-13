<template>
  <el-dialog title="开设课程信息" :visible="dialogVisible"
   v-on:update:visible="$emit('update:dialogVisible')"
   >
    <el-form :model="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程名称">
            <el-input placeholder="请输入要开设的课程名称" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      dialogVisible:  {
        type: Boolean,
        required: true
      },
    },
    data() {
      return {
        form: {
          name: ''
        }
      }
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>

<style scoped></style>