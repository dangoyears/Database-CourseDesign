<template>
  <div class="outer">
    <div class="input-main">
      <input type="text" class="login-item">
      <input type="text" class="login-item">
      <button type="submit" class="submit">登陆</button>
    </div>
    <img src="../assets/switch.png" class="switch" @click="change">
  </div>
</template>

<script>
  export default {
    methods: {
      change() {
        this.$emit("change");
      }
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
  .submit {
    width: 90%;
    height: 40px;
    line-height: 40px;
    border: 1px solid rgb(124, 114, 114);
    border-radius: 50px;
    text-align: center;
    margin: 10px 0;
    outline: none;
    background-color: rgba(255, 255, 255, 0.7);
  }
  .switch {
    position: absolute;
    right: 10%;
    font-size: 0.9rem;
  }
</style>