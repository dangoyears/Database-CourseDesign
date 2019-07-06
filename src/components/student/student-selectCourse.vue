<template>
  <el-table :data="schedule">
    <el-table-column prop="name" label="课程名称" width="180" show-overflow-tooltip></el-table-column>
    <el-table-column prop="credit" label="学分" width="120" sortable></el-table-column>
    <el-table-column prop="nature" label="课程性质" width="150"></el-table-column>
    <el-table-column prop="time" label="上课时间" width="150"></el-table-column>
    <el-table-column prop="address" label="上课地点" width="150"></el-table-column>
    <el-table-column prop="teachers" label="任课教师" width="200" show-overflow-tooltip>
      <template slot-scope="scope">
        <label>{{formattingTeachers(scope.row.teachers)}}</label>
      </template>
    </el-table-column>
    <el-table-column label="容纳人数" width="150">
      <template slot-scope="scope">
        <label>{{scope.row.selectedSum}} / {{scope.row.accommodate}}</label>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button 
          :type="scope.row.status === '选课' ? 'primary' : 'danger'"
          size="small"
          plain
          @click="handlerCourse(scope.row)"
        >{{scope.row.status}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import api from '../../api/index'
  export default {
    created() {
      let token = JSON.parse(sessionStorage.getItem("DBcourse-login")).token;
      api.getClassInfo((response) => {
        if(response) {
          // 过滤掉必修课，只显示没有指定上课班级的课程
          this. schedule = response.filter(val => {
            if(val.class === "[]")  return true;
          })
          this.filterSchedule();
        }
      }, token)
    },
    data() {
      return {
        schedule: [],
      }
    },
    props: ['ownSchedule'],
    methods: {
      // 将任课教师数组格式化成字符串
      formattingTeachers(arr) {
        let str = "";
        arr.forEach((val, index) => {
          str += (index !== arr.length-1) ? `${val}, ` : val;
        })
        return str;
      },
      // 给课程增加status属性，以此来选择显示是选课还是退选
      filterSchedule() {
        let len = this.schedule.length;
        //先给所有选修课增加一个status属性，表示该学生是否已经选择了该课，初始化为“选课”即没有选择该课。
        this.schedule.forEach((val, index) => {
          this.$set(this.schedule[index],'status','选课')
        })
        // 将该学生课表中的课对应到schedule中，把相应课程的status置为“退选”即该课程已选。
        setTimeout(() => {
          this.ownSchedule.forEach((val, index) => {
            for(let i=0; i<len; i++) {
              // 根据课程编号判断两课程是否一致
              if(val.id === this.schedule[i].id) {
                this.schedule[i].status = '退选';
                break;
              }
            }
          })
        }, 0)
      },
      // 选课 or 退选后及时修改该课程的状态
      changeCourseStatus(courseId, curStatus) {
        for(let i=0, len=this.schedule.length; i<len; i++) {
          if(this.schedule[i].id = courseId) {
            console.log("要修改的id是");
            console.log(courseId);
            this.schedule[i].status = curStatus;
            console.log(this.schedule[i].status);
            console.log(this.schedule);
            return;
          }
        }
      },
      // 选课 or 退选
      handlerCourse(item) {
        console.log("要进行操作的id是");
        console.log(item.id);
        let sessionData = JSON.parse(sessionStorage.getItem("DBcourse-login"));
        let {user, token} = sessionData;
        if(item.status === '选课') {
          console.log("xuan");
          api.selectCourse(item.id, user, token, () => {
            this.changeCourseStatus(item.id, '退选');
            // console.log(item.status);
          });
        }
        else {
          console.log("tui");
          api.cancelCourse(item.id, user, token, () => {
            this.changeCourseStatus(item.id, '选课');
            // console.log(item.status);
          });
        }
      }
    }
  }
</script>

<style scoped></style>