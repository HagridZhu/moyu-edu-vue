<template>
  <el-dialog
    title="添加试题"
    :visible.sync="dialogVisible"
    width="55%"
    :before-close="handleClose">
    <el-form ref="questionForm" :model="questionForm" label-width="80px">
      <el-form-item label="试卷编号" hidden ><el-input v-model="questionForm.paperId" ></el-input></el-form-item>
      <el-form-item label="题型">
        <el-select v-model="questionForm.type" :disabled="qfDisabled">
          <el-option label="单选题" :value="0"></el-option>
          <el-option label="多选题" :value="1"></el-option>
          <el-option label="判断题" :value="2"></el-option>
          <el-option label="填空题" :value="3"></el-option>
          <el-option label="简答题" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题号"><el-input v-model="questionForm.questionNum" disabled></el-input></el-form-item>
      <el-form-item label="题干"><el-input v-model="questionForm.content" placeholder="请输入题目" type="textarea" autosize ></el-input></el-form-item>
      <template v-if="[0,1].indexOf(questionForm.type) > -1">
        <el-form-item label="选项A"><el-input v-model="questionForm.optionA" placeholder="请输入选项A"></el-input></el-form-item>
        <el-form-item label="选项B"><el-input v-model="questionForm.optionB" placeholder="请输入选项B"></el-input></el-form-item>
        <el-form-item label="选项C"><el-input v-model="questionForm.optionC" placeholder="请输入选项C"></el-input></el-form-item>
        <el-form-item label="选项D"><el-input v-model="questionForm.optionD" placeholder="请输入选项D"></el-input></el-form-item>
      </template>
      <el-form-item label="答案">
        <template v-if="questionForm.type === 2">
          <el-select v-model="questionForm.questionAnswer">
            <el-option label="正确" :value="1"></el-option>
            <el-option label="错误" :value="0"></el-option>
          </el-select>
        </template>
        <template v-if="questionForm.type !== 2">
          <el-input  v-model="questionForm.questionAnswer" placeholder="请输入答案"></el-input>
        </template>
      </el-form-item>
      <el-form-item label="解析"><el-input v-model="questionForm.explanation" placeholder="请输入解析" type="textarea" autosize ></el-input></el-form-item>
      <el-form-item label="分值"><el-input v-model="questionForm.defaultScore" placeholder="请输入分值" oninput="value=value.replace(/[^\d]/g,'')" ></el-input></el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button type="warning" @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit" :loading="createBtnLoading">{{createBtnMsg}}</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      questionForm: {
        paperId: null,
        type: null,
        questionNum: null,
        questionScore: null
      },
      qfDisabled: true,
      dialogVisible: false,
      createBtnLoading: false,
      createBtnMsg: '立即创建'
    }
  },
  methods: {
    show (e) {
      this.questionForm.paperId = e.paperId
      this.questionForm.questionNum = e.questionNum + 1
      if (e.questionNum === 0) {
        this.questionForm.questionNum = 0
      }
      this.questionForm.type = Number.parseInt(e.type)
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认取消新增试题？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async onSubmit () {
      this.createBtnLoading = true
      this.createBtnMsg = '创建中'
      await this.$axios.post('exam/paper/question', this.questionForm).then(res => {
        this.$message.success('添加成功')
      })
      this.createBtnLoading = false
      this.createBtnMsg = '立即创建'
      this.dialogVisible = false
      this.$parent.search()
    }
  }
}
</script>
