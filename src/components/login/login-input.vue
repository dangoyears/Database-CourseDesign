<template>
  <div class="outer">
    <div class="input-main">
      <input type="text" class="login-item user-item" :placeholder="prompt" ref="userItem" @input="testData">
      <p class="wrong-prompt">{{userPrompt}}</p>
      <input type="password" class="login-item psd-item" placeholder="请输入登陆密码" ref="psdItem" @focus="psdPrompt=''">
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
        userPrompt: ""
      }
    },
    methods: {
      // 切换账号
      change() {
        this.$emit("change");
      },
      // 检验输入是否合法
      testData(e) {
        e = e || window.event;
        let str = (e.target.value || e.srcElement.value) + "";
        if(!this.testLength(str, 10)) {
          this.userPrompt = "用户ID不能超过十个字符";
        }
        else if(this.identity === '管理员' && !this.testChar(str, "english")) {
          this.userPrompt = "管理员ID只能包含英文字母";
        }
        else if(this.identity !== '管理员' && !this.testChar(str, "number")) {
          this.userPrompt = "用户ID只能包含数字";
        }
        else {
          this.userPrompt = "";
        }
      },
      signIn() {
        let userData = this.$refs.userItem.value;
        let psdData = this.$refs.psdItem.value;
        if(userData === "") {
          this.userPrompt = "用户ID不能为空";
          return;
        }
        let obj = {
          "user": userData,
          "pass": psdData
        }
        api.checkUser((data) => {
          if(data) {
            this.psdPrompt = "";
            this.$router.push({
              name: 'manager',
              params: {
                userName: userData
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