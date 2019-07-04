<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app",
    components: {},
    methods: {
      // 防止直接输入url跳过用户登陆
      checkLogin() {
        let sessionData = sessionStorage.getItem("DBcourse-login");
        if(!sessionData) {
          this.$router.push('login');
        }
      }
    },
    created() {
      this.checkLogin();
    },
  };
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
</style>
