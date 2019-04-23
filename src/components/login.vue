<template>
  <div class="main">
    <div class="container">
      <img src="../assets/GZHU.png" class="logo">
      <div v-for="(item, index) in identity" :key="index" class="login-item">
        <p>{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        identity: ['管理员', '教师', '学生']
      }
    }
  }
</script>

<style lang="less" scoped>
  @container_width: 400px;
  @container_height: 500px;
  .main {
    background: #fff url('../assets/bg.png') 50% 50% no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .container {
    border: 1px solid #eee;
    width: @container_width;
    height: @container_height;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 20px;
    .logo {
      position: relative;
      top: -50px;
      transform: scale(0.7, 0.7);
      margin-bottom: -50px;
    }
    .login-item {
      width: 90%;
      height: 40px;
      line-height: 40px;
      border: 1px solid #fff;
      border-radius: 50px;
      text-align: center;
      margin: -20px 0;
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
  @media screen and (max-width: 500px) {
    .container {
      border: 0;
      width: 100vw;
    }
  }
</style>
