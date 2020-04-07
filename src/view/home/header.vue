<template>
  <div class="header" @click="goHome" title="回到主页" >
    <!-- <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <span id="username">
      <span>{{nick}}</span>
    </span>
    <el-dropdown class="header-item">
      <span >
        <el-avatar id="avatar" size="medium" fit="fill" src="https://empty" @error="errorHandler">
            <img src="../../assets/avatar-default.jpg"/>
        </el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="showAvatarDialog" ><i class="el-icon-edit" />修改头像</el-dropdown-item>
        <el-dropdown-item @click.native="showPwdDialog"><i class="el-icon-edit" />修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="quit"><i class="el-icon-right" />退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 修改密码弹窗 -->
    <el-dialog style="text-align: center"
      title="修改密码"
      :visible.sync="pwdDialog"
      width="30%"
      :before-close="handleClose">
      <el-form :model="pwdForm" label-width="80px">
        <el-form-item label="新密码">
          <el-input v-model="pwdForm.password" clearable type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="pwdForm.newpassword" clearable type="password" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pwdDialog = false">取 消</el-button>
        <el-button type="primary" @click="updatePwd" :loading="updatePwdBtn">立即修改</el-button>
      </span>
    </el-dialog>
    <!-- 修改头像弹窗 -->
    <el-dialog style="text-align: center"
      title="修改头像"
      :visible.sync="avatarDialog"
      width="30%"
      :before-close="handleClose">
      <el-form :model="avatarForm" label-width="80px">
        <el-form-item label="头像">
          <!-- <el-input v-model="avatarForm.avatar" clearable type="password" show-password></el-input> -->
          <my-upload ref="myUpload" :maxSize="maxSize" :limit="limit"></my-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="avatarDialog = false">取 消</el-button>
        <el-button type="primary" @click="updatePwd" :loading="updateAvatarBtn">立即修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myUpload from '@/view/common/upload'

export default {
  name: 'my-header',
  components: {myUpload},
  data () {
    return {
      maxSize: 2,
      limit: 1,
      nick: '未登录',
      avatar: '',
      defaultAvatar: '../../assets/avatar-default.jpg',
      pwdForm: {},
      avatarForm: {},
      pwdDialog: false,
      avatarDialog: false,
      updatePwdBtn: false,
      updateAvatarBtn: false
    }
  },
  methods: {
    goHome () {
      if (this.$route.path === '/home') {
        return
      }
      this.$router.push({
        path: '/home'
      })
    },
    showPwdDialog () {
      this.pwdDialog = true
    },
    showAvatarDialog () {
      this.avatarDialog = true
    },
    errorHandler () {
      return true
    },
    updatePwd () {
      if (this.pwdForm.password !== this.pwdForm.newpassword) {
        this.$message.warning('两次密码不一致')
        return
      }
      this.updatePwdBtn = true
      this.$axios.put('exam/user', this.pwdForm).then(res => {
        this.$message.success('更新成功')
        this.pwdDialog = false
        this.pwdForm = {}
        setTimeout(() => {
          this.quit()
        }, 2000)
      })
    },
    updateAvatar () {
      var fileList = this.$refs.myUpload.getFileList()
      var avatar = fileList[0]
      this.$axios.put('exam/user', {avatar: avatar}).then(res => {
        this.$message.success('更新成功')
        this.avatarDialog = false
        localStorage.setItem('avatar', avatar)
        this.avatar = avatar
      })
    },
    quit () {
      // 退出之后把当前用户的token,头像，昵称清空
      localStorage.removeItem('Authorization')
      localStorage.removeItem('avatar')
      localStorage.removeItem('nick')
      this.$router.push('/login')
    },
    handleClose (done) {
      this.$confirm('确认取消？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    refreshUserInfo () {
      this.userName = '未登录'
      this.avatar = this.defaultAvatar
      // 从localStorage中获取用户头像和昵称
      var token = localStorage.getItem('Authorization')
      if (token) {
        var nick = localStorage.getItem('nick')
        if (nick) {
          this.nick = nick
        }
      }
      var avatar = localStorage.getItem('avatar')
      if (avatar) {
        this.avatar = avatar
      }
    }
  },
  created () {
    this.refreshUserInfo()
  }
}
</script>

<style lang="scss" scoped>
  .header {
    text-align: right;
    font-size: 12px;
    height: 60px; /*can be anything*/
    cursor: pointer;
  }
  .header-item {
    display: inline-block;
    height: 60px; /*can be anything*/
    width: 60px; /*can be anything*/
  }
  #avatar {
      width: 45px;
      height: 45px;
      margin-top: 7px;
      display: inline-block;
  }
  #username {
    vertical-align:middle;
    display: inline-block;
    height: 96px;
  }
</style>
