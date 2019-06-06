<template>
  <div class="outer">
    <div class="input-main">
      <input type="text" class="login-item user-item" :placeholder="prompt">
      <input type="text" class="login-item psd-item" placeholder="请输入登陆密码">
      <button type="submit" class="login-item" @click="signIn">登陆</button>
    </div>
    <img src="../assets/switch.png" class="switch" @click="change">
  </div>
</template>

<script>
  export default {
    props: ['identity'],
    methods: {
      change() {
        this.$emit("change");
      },
      signIn() {
        // 待补充账号密码的相关判断，合理性和正确与否
        this.$router.push({name: 'manager'});
      }
    },
    computed: {
      prompt() {
        return `请输入${this.identity}的 ID`;
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
    background: url('../assets/user.png') no-repeat 20px center;
    padding-left: 60px;
    box-sizing: border-box;
    cursor: text !important;
  }
  .psd-item {
    background: url('../assets/psd.png') no-repeat 20px center;
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
</style>