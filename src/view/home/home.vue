<template>
  <el-container class="nav">
    <my-menu></my-menu><!-- 左侧导航栏 -->
  <el-container>
  <el-header>
    <my-header /><!-- 头部 -->
  </el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
  </el-container>
</el-container>
</template>
<script>
import myMenu from '@/view/home/menu'
import myHeader from '@/view/home/header'
import myPaper from '@/view/paper/paper'
export default {
  components: {myMenu, myHeader, myPaper},
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .nav {
    min-height: 1080px;
  }
</style>
