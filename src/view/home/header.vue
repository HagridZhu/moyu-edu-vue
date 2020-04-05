<template>
  <div class="header" @click="goHome" title="回到主页" >
   <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{userName}}</span>
  </div>
</template>

<script>
export default {
  name: 'my-header',
  data () {
    return {
      userName: '王小虎'
    }
  },
  methods: {
    goHome () {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    text-align: right;
    font-size: 12px;
    cursor: pointer;
  }
</style>
