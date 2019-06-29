<template>
  <div class="outer">
    <div class="input-main">
      <input type="text" class="login-item user-item" :placeholder="prompt" v-model="form.user" @input="testData">
      <p class="wrong-prompt">{{userPrompt}}</p>
      <input type="password" class="login-item psd-item" placeholder="请输入登陆密码"  v-model="form.psd" @focus="psdPrompt=''" @keydown.enter="signIn">
      <p class="wrong-prompt">{{psdPrompt}}</p>
      <button type="submit" class="login-item" @click="signIn">登陆</button>
    </div>
    <img src="../../assets/switch.png" class="switch" @click="change">
  </div>
</template>

<script>
  import api from '../../api/index'
  export default {
    props: ['identity'],
    data() {
      return {
        psdPrompt: "",
        userPrompt: "",
        form: {
          user: "",
          psd: "",
        }
      }
    },
    methods: {
      // 切换账号
      change() {
        this.$emit("change");
      },
      // 检验输入是否合法
      testData() {
        if(!this.testLength(this.form.user, 10)) {
          this.userPrompt = "用户ID不能超过十个字符";
          return false;
        }
        else if(this.identity === '管理员' && !this.testChar(this.form.user, "english")) {
          this.userPrompt = "管理员ID只能包含英文字母";
          return false;
        }
        else if(this.identity !== '管理员' && !this.testChar(this.form.user, "number")) {
          this.userPrompt = "用户ID只能包含数字";
          return false;
        }
        else {
          this.userPrompt = "";
          return true;
        }
      },
      signIn() {
        if(this.form.user === "") {
          this.userPrompt = "用户ID不能为空";
          return;
        }
        if(this.form.psd === "") {
          this.psdPrompt = "密码不能为空";
          return;
        }
        if(!this.testData())  return;
        let typeData;
        if(this.identity === "管理员")  typeData = "admin";
        else if(this.identity === "教师")  typeData = "teacher";
        else if(this.identity === "学生")  typeData = "student";
        let obj = {
          "user": this.form.user,
          "pass": this.form.psd,
          "type": typeData
        }
        api.checkUser((data) => {
          if(data) {
            let obj = {
              user: this.form.user,
              token: data
            }
            sessionStorage.setItem("DBcourse-login", JSON.stringify(obj));
            this.psdPrompt = "";
            this.$router.push({
              name: typeData,
              params: {
                userName: this.form.user,
                token: data
              }
            });
          }
          else {
            this.psdPrompt = "账号或密码错误，请重新输入";
          }
        }, obj);
      }
    },
    computed: {
      prompt() {
        return `请输入${this.identity}的ID`;
      },
    }
  }
</script>

<style lang="less" scoped>
  .outer {
    position: relative;
  }
  .input-main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }
  .user-item {
    background: url('../../assets/user.png') no-repeat 20px center;
    padding-left: 60px;
    box-sizing: border-box;
    cursor: text !important;
  }
  .psd-item {
    background: url('../../assets/psd.png') no-repeat 20px center;
    padding-left: 60px;
    box-sizing: border-box;
    cursor: text !important;
  }
  .login-item:focus {
    box-shadow: 0 0 18px lightgreen; 
    -webkit-box-shadow: 0 0 18px lightgreen;
    transition: box-shadow linear .2s; 
    -webkit-transition: box-shadow linear .2s; 
  }
  .switch {
    position: absolute;
    right: 10%;
    cursor: pointer;
  }
  .wrong-prompt {
    color: rgb(212, 45, 45);
    font-size: 0.8rem;
    position: relative;
    left: -40%;
    transform: translateX(50%);
  }
</style>