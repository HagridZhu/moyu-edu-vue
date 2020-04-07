<template>
<div class="login-form">
    <el-form  label-position="right"
              label-width="auto"
              ref="loginForm"
              :model="loginForm">
        <el-form-item label="账号:" prop="userName">
          <el-input class="i-text" type="text" v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item  label="密码:" prop="password">
          <el-input class="i-text" type="password" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="login()" class="login-form-submit">登录</el-button>
</div>
</template>

<script>
export default {
  name: 'Login',
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
    login () {
      var param = {
        userName: this.loginForm.userName,
        password: this.loginForm.password
      }
      let that = this
      this.$axios.post('/exam/oauth/login', param).then(res => {
        var data = res.data.data
        localStorage.setItem('nick', data.nick)
        localStorage.setItem('avatar', data.avatar)
        localStorage.setItem('roleId', data.roleId)
        that.$store.commit('changeLogin', { Authorization: data.token })
        this.$router.push({name: 'home'})
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .login-form {
    width: 400px;
    padding: 0 40px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #ffffff;
    // &-input {
    //   /*width: 340px;*/
    // }
    &-submit {
      width: 100%;
      /*margin-left: 40px;*/
    }
  }
</style>
