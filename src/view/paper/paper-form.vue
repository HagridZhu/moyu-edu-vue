<template>
  <el-dialog
    title="新增试卷"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="paper" :model="paper" label-width="80px">
      <el-form-item label="试卷名称">
        <el-input v-model="paper.paperName"></el-input>
      </el-form-item>
      <el-form-item label="考试时长">
        <el-input v-model="paper.duration" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
      </el-form-item>
      <el-form-item label="试卷总分">
        <el-input v-model="paper.paperScore" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
      </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      paper: {
        paperName: '',
        duration: '',
        paperScore: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认取消新增试卷？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    show () {
      this.dialogVisible = true
    },
    onSubmit () {
      this.$axios.post('exam/paper', this.paper).then(res => {
        this.$message.success('创建成功')
      })
      this.dialogVisible = false
      this.$parent.search()
    }
  }
}
</script>
