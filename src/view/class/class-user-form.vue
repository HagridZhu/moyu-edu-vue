<template>
  <el-dialog
    :title="type + '学生'"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="paper" :model="entity" label-width="80px">
      <el-form-item label="班级id" style="display: none">
        <el-input v-model="entity.classId" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="entity.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="entity.password" clearable></el-input>
      </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">立即{{type}}</el-button>
  </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      type: '',
      entity: {
        classId: '',
        userName: '',
        password: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认取消' + this.type + '学生')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    show (type, entity) {
      this.dialogVisible = true
      this.type = type
      this.entity = entity || {
        classId: null,
        school: '',
        grade: '',
        classNum: ''
      }
    },
    onSubmit () {
      if (this.type === '新增') {
        this.$axios.post('exam/class/user', this.entity).then(res => {
          this.$message.success(this.type + '成功')
        })
      } else {
        this.$axios.put('exam/class/user', this.entity).then(res => {
          this.$message.success(this.type + '成功')
        })
      }
      this.dialogVisible = false
      this.$parent.search()
    }
  }
}
</script>
<style lang="scss" scoped>
.class-select {
  text-align: left;
}
</style>
