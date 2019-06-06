<template>
  <div class="main">
    <div class="container">
      <img src="../assets/GZHU.png" class="logo">
      <component :is="componentId" :identity="identity" @change="changeLogin"></component>
    </div>
  </div>
</template>

<script>
  import loginInput from './login-input.vue'
  import loginIdentity from './login-identity.vue'
  export default {
    data() {
      return {
        componentId: loginIdentity,
        identity: ""
      }
    }, 
    components: {
      'login-input': loginInput,
      'login-identity': loginIdentity
    },
    methods: {
      changeLogin(key) {
        if(arguments.length === 0) {
          this.componentId = loginIdentity;
          return;
        }
        this.componentId = loginInput;
        this.identity = key;
      },
    },
    computed: {
      propsData() {
        if(this.componentId === 'loginIdentity') {
          return this.identity;
        }
        return this.identity;
      }
    }
  }
</script>

<style lang="less" scoped>
  @container_width: 400px;
  @container_height: 500px;
  // 利用深度作用使子组件都可以使用父组件的样式
  /deep/ .login-item {
    width: 90%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #fff;
    border-radius: 50px;
    margin: 10px 0;
    background-color: rgba(255, 255, 255, 0.7);
    outline: none;
    cursor: pointer;
  }
  .main {
    background: #fff url('../assets/bg.png') 50% 50% no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    border: 1px solid #eee;
    width: @container_width;
    height: @container_height;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
  }
  .logo {
    position: relative;
    top: -30px;
    transform: scale(0.7, 0.7);
    margin-bottom: -50px;
  }
  @media screen and (max-width: 500px) {
    .container {
      border: 0;
      width: 100vw;
    }
  }
</style>
