<template>
  <div class="identity-main">
    <div v-for="(item, index) in identityList" :key="index" class="login-item" @click="change(item)">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        identityList: ['管理员', '教师', '学生'],
      }
    },
    methods: {
      change(item) {
        this.$emit("change", item);
      }
    }
  }
</script>

<style lang="less" scoped>
  .identity-main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    text-align: center;
  }
  .login-item {
    cursor: pointer;
  }
</style>