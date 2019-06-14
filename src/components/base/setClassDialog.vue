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
              :props="{expandTrigger: 'hover', value: 'value', label: 'label', children: 'children'}"
              separator=""
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
              <el-option value="无限制"></el-option>
              <el-option v-for="key in collegeArr" :key="key" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="专业" required>
            <el-select v-model="form.specialty" aria-placeholder="要开设课程的专业">
              <el-option value="无限制"></el-option>
              <el-option v-for="key in specialtyArr" :key="key" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
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
  export default {
    created() {
      console.log(data.addressOptions);
    },
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
          address: []
        },
        // 上课地点的级联信息
        addressOptions: data.addressOptions
        // addressOptions: [{
        //   value: 'zhinan',
        //   label: '指南',
        //   children: [{
        //     value: 'shejiyuanze',
        //     label: '设计原则',
        //     children: [{
        //       value: 'yizhi',
        //       label: '一致'
        //     }, {
        //       value: 'fankui',
        //       label: '反馈'
        //     }, {
        //       value: 'xiaolv',
        //       label: '效率'
        //     }, {
        //       value: 'kekong',
        //       label: '可控'
        //     }]
        //   }, {
        //     value: 'daohang',
        //     label: '导航',
        //     children: [{
        //       value: 'cexiangdaohang',
        //       label: '侧向导航'
        //     }, {
        //       value: 'dingbudaohang',
        //       label: '顶部导航'
        //     }]
        //   }]
        // }, {
        //   value: 'zujian',
        //   label: '组件',
        //   children: [{
        //     value: 'basic',
        //     label: 'Basic',
        //     children: [{
        //       value: 'layout',
        //       label: 'Layout 布局'
        //     }, {
        //       value: 'color',
        //       label: 'Color 色彩'
        //     }, {
        //       value: 'typography',
        //       label: 'Typography 字体'
        //     }, {
        //       value: 'icon',
        //       label: 'Icon 图标'
        //     }, {
        //       value: 'button',
        //       label: 'Button 按钮'
        //     }]
        //   }, {
        //     value: 'form',
        //     label: 'Form',
        //     children: [{
        //       value: 'radio',
        //       label: 'Radio 单选框'
        //     }, {
        //       value: 'checkbox',
        //       label: 'Checkbox 多选框'
        //     }, {
        //       value: 'input',
        //       label: 'Input 输入框'
        //     }, {
        //       value: 'input-number',
        //       label: 'InputNumber 计数器'
        //     }, {
        //       value: 'select',
        //       label: 'Select 选择器'
        //     }, {
        //       value: 'cascader',
        //       label: 'Cascader 级联选择器'
        //     }, {
        //       value: 'switch',
        //       label: 'Switch 开关'
        //     }, {
        //       value: 'slider',
        //       label: 'Slider 滑块'
        //     }, {
        //       value: 'time-picker',
        //       label: 'TimePicker 时间选择器'
        //     }, {
        //       value: 'date-picker',
        //       label: 'DatePicker 日期选择器'
        //     }, {
        //       value: 'datetime-picker',
        //       label: 'DateTimePicker 日期时间选择器'
        //     }, {
        //       value: 'upload',
        //       label: 'Upload 上传'
        //     }, {
        //       value: 'rate',
        //       label: 'Rate 评分'
        //     }, {
        //       value: 'form',
        //       label: 'Form 表单'
        //     }]
        //   }, {
        //     value: 'data',
        //     label: 'Data',
        //     children: [{
        //       value: 'table',
        //       label: 'Table 表格'
        //     }, {
        //       value: 'tag',
        //       label: 'Tag 标签'
        //     }, {
        //       value: 'progress',
        //       label: 'Progress 进度条'
        //     }, {
        //       value: 'tree',
        //       label: 'Tree 树形控件'
        //     }, {
        //       value: 'pagination',
        //       label: 'Pagination 分页'
        //     }, {
        //       value: 'badge',
        //       label: 'Badge 标记'
        //     }]
        //   }, {
        //     value: 'notice',
        //     label: 'Notice',
        //     children: [{
        //       value: 'alert',
        //       label: 'Alert 警告'
        //     }, {
        //       value: 'loading',
        //       label: 'Loading 加载'
        //     }, {
        //       value: 'message',
        //       label: 'Message 消息提示'
        //     }, {
        //       value: 'message-box',
        //       label: 'MessageBox 弹框'
        //     }, {
        //       value: 'notification',
        //       label: 'Notification 通知'
        //     }]
        //   }, {
        //     value: 'navigation',
        //     label: 'Navigation',
        //     children: [{
        //       value: 'menu',
        //       label: 'NavMenu 导航菜单'
        //     }, {
        //       value: 'tabs',
        //       label: 'Tabs 标签页'
        //     }, {
        //       value: 'breadcrumb',
        //       label: 'Breadcrumb 面包屑'
        //     }, {
        //       value: 'dropdown',
        //       label: 'Dropdown 下拉菜单'
        //     }, {
        //       value: 'steps',
        //       label: 'Steps 步骤条'
        //     }]
        //   }, {
        //     value: 'others',
        //     label: 'Others',
        //     children: [{
        //       value: 'dialog',
        //       label: 'Dialog 对话框'
        //     }, {
        //       value: 'tooltip',
        //       label: 'Tooltip 文字提示'
        //     }, {
        //       value: 'popover',
        //       label: 'Popover 弹出框'
        //     }, {
        //       value: 'card',
        //       label: 'Card 卡片'
        //     }, {
        //       value: 'carousel',
        //       label: 'Carousel 走马灯'
        //     }, {
        //       value: 'collapse',
        //       label: 'Collapse 折叠面板'
        //     }]
        //   }]
        // }, {
        //   value: 'ziyuan',
        //   label: '资源',
        //   children: [{
        //     value: 'axure',
        //     label: 'Axure Components'
        //   }, {
        //     value: 'sketch',
        //     label: 'Sketch Templates'
        //   }, {
        //     value: 'jiaohu',
        //     label: '组件交互文档'
        //   }]
        // }]
      }
    },
    methods: {
     submitClassInfos() {
      console.log(this.form);
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