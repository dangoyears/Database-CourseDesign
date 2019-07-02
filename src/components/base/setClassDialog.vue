<template>
  <el-dialog width="60%" title="开设课程信息" :visible="dialogVisible" v-on:update:visible="$emit('update:dialogVisible')">
    <el-form :model="form" inline ref="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程名称" required prop="name" :rules="rules.userName">
            <el-input placeholder="课程名称" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="课程编号" required prop="id" :rules="rules.numberId">
            <el-input placeholder="课程编号" v-model="form.id" :disabled="this.isEditClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程性质" required prop="nature" :rules="rules.empty">
            <el-select v-model="form.nature" placeholder="课程的性质">
              <el-option value="专业必修课"></el-option>
              <el-option value="专业选修课"></el-option>
              <el-option value="通识性选修课"></el-option>
              <el-option value="体育选修课"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学分" required prop="credit" :rules="rules.number">
            <el-input v-model="form.credit" placeholder="课程的学分"></el-input>
          </el-form-item>
        </el-col>
      </el-row >
        <el-col :span="12">
          <el-form-item label="上课班级">
            <el-cascader
              v-model="tempClass"
              :props="{expandTrigger: 'hover', multiple: 'true'}"
              :options="classOptions"
              separator=""
              clearable
              :show-all-levels="false"
              @change="classHandler"
              placeholder="若是选修课则可不填"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="容纳人数" prop="accommodate" :rules="accommodateRule">
            <el-input v-model="form.accommodate" placeholder="课程最大可容纳人数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="任课教师" required prop="teachers" :rules="rules.empty">
            <el-select v-model="form.teachers" placeholder="请选择任课教师" multiple clearable @change="teachersHandler">
              <el-option v-for="val in teacherList" :key="val.jobId" :value="val.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="课程组长" required prop="courseLeader" :rules="rules.empty">
            <el-select v-model="form.courseLeader" placeholder="请选择课程组长">
              <el-option v-for="val in form.teachers" :key="val" :value="val"></el-option>
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
               placeholder="请选择上课地点"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="$emit('update:dialogVisible')">取消</el-button>
      <el-button type="primary" @click="submitClassInfos">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import data from '../../base/data'
  import rules from '../../base/rules'
  import api from '../../api/index'

  export default {
    mounted() {
      this.formattingCollegeInfo();
      this.getClassOptions();
      this.getTeacherInfo();
    },
    props: {
      dialogVisible:  {
        type: Boolean,
        required: true,
      },
      collegeInfos: {
        type: Array,
        required: true,
      },
      token: {
        type: String
      },
      isEditClass: {
        type: Boolean
      },
      editClassInfo: {
        type: Object
      }
    },
    data() {
      return {
        form: {
          name: '',
          id: '',
          credit: '',
          weekStart: '',
          weekEnd: '',
          sectionStart: '',
          sectionEnd: '',
          time: '',
          class: [],
          nature: '',
          teachers: [],
          courseLeader: '',
          accommodate: '',
          selectedSum: '',
          address: ''
        },
        tempClass: [],
        // 上课地点的级联信息
        addressOptions: data.addressOptions,
        formatCollegeInfos: {},
        // 班级数组
        classOptions: [],
        // 教师列表
        teacherList: [],
        rules: rules,
        accommodateRule: [
          {
            required: true,
            message: '输入不能为空',
            trigger: ['blur']
          },
          {
            pattern: /[0-9]/,
            message: '输入要求是数字',
            trigger: ['blur', 'change']
          }
        ],
      }
    },
    methods: {
      // 获取教师列表
      getTeacherInfo() {
        api.getTeacherInfo((response) => {
          this.teacherList = response;
        }, this.token);
      },
      // 提交表单信息
      submitClassInfos() {
        this.formattingAddress();
        this.formattingTime();
        this.computedSum();
        // 确保所有数据都为string类型
        for(let [key, val] of Object.entries(this.form)) {
          if(key === 'class' || key === 'teachers')  {
            this.form[key] = JSON.stringify(this.form[key]);
            this.form[key] = this.form[key].replace(/\"/g, "'");
            continue;
          }
          this.form[key] = val + "";
        }
        console.log("要提交的form");
        console.log(this.form);
        // 校验表单中的数据
        let res;
        this.$refs['form'].validate(valid => res = valid);
        if(!res) {
          this.$message({
            message: '填写的信息有误，请修正后再提交',
            type: 'error',
            duration: 1000
          });
          return;
        }
        api.uploadClassInfo(this.form, this.token, () => {
          // 通知父组件更新课程信息
          this.$emit('updateClassInfo');
          this.$emit('update:dialogVisible');
        });
        this.form = {};
        this.$message({
          message: '操作成功。',
          type: 'success',
          duration: 1000
        });
      },
      // 格式化上课地点
      // 原本格式为："理科南教学楼", "理科南教学楼+6", "理科南教学楼+6+06"
      formattingAddress(arr) {
        if(!this.form.address)  return;
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
      },
      // 格式化上课时间
      formattingTime() {
        this.form.time = `第${this.form.weekStart}-${this.form.weekEnd}周,第${this.form.sectionStart}-${this.form.sectionEnd}节`;
      },
      // 格式化班级信息
      formattingCollegeInfo() {
        this.formatCollegeInfos = {};
        this.collegeInfos.forEach((val) => {
          // 若是第一次新创建学院/专业，对象/数组会为undefined
          if(!this.formatCollegeInfos[val.college])  this.formatCollegeInfos[val.college] = {};
          let college = this.formatCollegeInfos[val.college];
          if(!college[val.specialty])  college[val.specialty] = [];
          college[val.specialty].push(`${val.grade}${val.class}`);
        })
      },
      // 级联学院专业班级
      getClassOptions() {
        setTimeout(() => {
          for(let key in this.formatCollegeInfos) {
            let college = this.formatCollegeInfos[key];
            let collegeOption = {
              value: key,
              label: key,
              children: []
            };
            for(let key1 in college) {
              for(let i=0, len=college[key1].length; i<len; i++) {
                let classes = {
                  value: `${key1}-${college[key1][i]}`,
                  label: `${key1}${college[key1][i]}`
                };
                collegeOption.children.push(classes);
              }
            }
            this.classOptions.push(collegeOption);
          }
        }, 1000)
      },
      // 将未格式化的tempClass格式化后存进form.class里，便于向后端传送参数
      classHandler(value) {
        this.form.class = [];
        value.forEach((val, index) => {
          this.form.class[index] = val[0] + "-" + val[1];
        })
      },
      // 改变任课教师时，判断课程组长是否还再任课教师的行列，不在的话则清空课程组长
      teachersHandler(val) {
        if(!val.includes(this.form.courseLeader))  this.form.courseLeader = '';
      },
      // 计算选中班级的总人数
      computedSum() {
        if(this.form.class.length === 0)  {
          this.form.selectedSum = this.form.accommodate;
          return;
        }
        this.form.class.forEach(val => {
          let s = 0;
          let arr = val.split('-');
          // 找到对应班级的人数
          for(let i=0, len=this.collegeInfos.length; i<len; i++) {
            if(this.collegeInfos[i].college === arr[0] && this.collegeInfos[i].specialty === arr[1]) {
              if(this.collegeInfos[i].grade + this.collegeInfos[i].class === arr[2]) {
                s += this.collegeInfos[i].sum;
              }
            }
          }
          this.form.selectedSum = s + "";
        })
      },
      // 启用编辑功能时，将表单信息恢复为原始格式，才可以在dialog中显示出数据值
      recoverInfo() {
        this.form = Object.assign({}, JSON.parse(JSON.stringify(this.editClassInfo)));      
        // 恢复上课地点在级联选择器的数据格式
        // ["理科南教学楼", "理科南教学楼+4", "理科南教学楼+4+05"];
        let addressArr = [];
        addressArr[0] = this.form.address.match(/^[\u4e00-\u9fa5]+/) + "";
        addressArr[1] = addressArr[0] + "+" + this.form.address.match(/[0-9]{1}/);
        addressArr[2] = addressArr[1] + "+" + this.form.address.match(/[0-9]{2}$/);
        this.form.address = JSON.parse(JSON.stringify(addressArr));
        // 恢复上课班级在级联选择器的数据格式
        // [["计算机科学与网络工程学院","软件工程-171"]]
        this.tempClass = [];
        this.form.class.split(",").forEach((val, index) => {
          let temp = [];
          temp.push(val.match(/^[\u4e00-\u9fa5]+/) + "");
          temp.push(val.replace(/^[\u4e00-\u9fa5]+\-/, "") + "");
          this.tempClass.push(temp);
        })
        // 恢复上课时间
        // 第1-16周,第5-6节
        this.form.weekStart = this.form.time.match(/\d+/) + "";
        this.form.weekEnd = this.form.time.replace(/[\u4e00-\u9fa50-9]+\-/, "").match(/\d+/) + "";
        this.form.sectionStart = this.form.time.replace(/[\u4e00-\u9fa50-9-]+\,[\u4e00-\u9fa5]/, "").match(/\d+/) + "";
        this.form.sectionEnd = this.form.time.replace(/[\u4e00-\u9fa50-9-]+\,[\u4e00-\u9fa50-9]+\-/, "").match(/\d+/) + "";
      }
    },
    watch: {
      // 重新打开弹框时清空提示信息
      dialogVisible() {
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].clearValidate();
        }
        if(this.isEditClass) {
          this.recoverInfo();
        }
        else {
          this.tempClass = [];
          this.form = {};
        }
      }
    }
  }
</script>

<style scoped></style>