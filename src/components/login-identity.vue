<template>
  <div class="identity-main">
    <div v-for="(item, index) in identityList" :key="index" class="login-item" @click="change(item)">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['identityList'],
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
  }
</style>