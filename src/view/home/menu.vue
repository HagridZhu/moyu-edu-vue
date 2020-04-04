<template>
  <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
    <div class="my-logo">
      <img class="logo-img" src="../../assets/logo-2.png" />
      <span>摸渔教育</span>
    </div>
    <el-menu :default-openeds="[]"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>试卷管理</template>
        <router-link to="/home/paper"><el-menu-item index="1-1" > 试卷列表</el-menu-item></router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>考试管理</template>
          <router-link :to="{path:'/home/paper/answer',query:{paperStatus:1}}"><el-menu-item index="2-1">考试记录</el-menu-item></router-link>
          <router-link :to="{path:'/home/paper/answer',query:{paperStatus: 0}}"><el-menu-item index="2-2">待考试卷</el-menu-item></router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>个人中心</template>
        <el-menu-item index="3-1">个人信息</el-menu-item>
        <el-menu-item index="3-2">我的班级</el-menu-item>
        <el-menu-item index="3-3">班级排名</el-menu-item>
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
  a {
  text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
