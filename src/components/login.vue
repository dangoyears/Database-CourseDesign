<template>
  <div class="main">
    <div class="container">
      <img src="../assets/GZHU.png" class="logo">
      <component :is="componentId" :identityList="identityList" @change="changeLogin"></component>
      <!-- <login-identity :data="propsData" @changeLogin="changeLogin"></login-identity> -->
      <!-- <img src="../assets/GZHU.png" class="logo">
      <div v-for="(item, index) in identity" :key="index" class="login-item" v-show="!loginDetail" @click="login">
        <p>{{ item }}</p>
      </div> -->
      <!-- <dangosky-input v-show="loginDetail" @changeIdentity="changeIdentity"></dangosky-input> -->
    </div>
  </div>
</template>

<script>
  import loginInput from './login-input.vue'
  import loginIdentity from './login-identity.vue'
  export default {
    data() {
      return {
        identityList: ['管理员', '教师', '学生'],
        componentId: loginIdentity
      }
    }, 
    components: {
      'login-input': loginInput,
      'login-identity': loginIdentity
    },
    methods: {
      changeLogin(...name) {
        if(name.length === 0) {
          this.componentId = loginIdentity;
        }
        else {
          this.componentId = loginInput;
        }
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
    text-align: center;
    margin: 10px 0;
    background-color: rgba(255, 255, 255, 0.7);
    outline: none;
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
    top: -50px;
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
