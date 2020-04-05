<template>
  <el-dialog
    :title="type + '试卷'"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="paper" :model="paper" label-width="80px">
      <el-form-item label="试卷id" style="display: none">
        <el-input v-model="paper.paperId" clearable></el-input>
      </el-form-item>
      <el-form-item label="试卷名称">
        <el-input v-model="paper.paperName" clearable></el-input>
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
    <el-button type="primary" @click="onSubmit">立即{{type}}</el-button>
  </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      type: '',
      paper: {
        paperName: '',
        duration: '',
        paperScore: '',
        paperId: null
      },
      dialogVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认取消' + this.type + '试卷？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    show (type, paper) {
      this.dialogVisible = true
      this.type = type
      this.paper = paper || {
        paperName: '',
        duration: '',
        paperScore: '',
        paperId: null
      }
    },
    onSubmit () {
      if (this.type === '新增') {
        this.$axios.post('exam/paper', this.paper).then(res => {
          this.$message.success(this.type + '成功')
        })
      } else {
        this.$axios.put('exam/paper', this.paper).then(res => {
          this.$message.success(this.type + '成功')
        })
      }
      this.dialogVisible = false
      this.$parent.search()
    }
  }
}
</script>
