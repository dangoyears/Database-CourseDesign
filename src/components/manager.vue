<template>
  <div>
    <el-menu :default-active="activeIndex" mode="horizontal">
      <el-menu-item index="1">1</el-menu-item>
      <el-submenu index="2">
        <template slot="title">2</template>
        <el-menu-item index="2-1">2-1</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">3</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
    
      }
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>

<style scoped>

</style>