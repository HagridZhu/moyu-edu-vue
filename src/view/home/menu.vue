<template>
  <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
    <div class="my-logo">
      <img class="logo-img" src="../../assets/logo-2.png" />
      <span>摸渔教育</span>
    </div>
    <el-menu :default-openeds="['1', '3']"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>

</template>
<script>
export default {
  name: 'myMenu',
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      msg: 'Welcome to Your Vue2.js App'
    }
  },
  methods: {
    test () {
      console.log('---test')
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-logo {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: #2b2f3a;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
  .my-logo image {
    height: 110px;
  }
  .my-logo span {
    color: whitesmoke;
    font-weight: 700;
    padding-left: 20px;
    font-size: 23px;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
