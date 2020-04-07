<template>
  <div>
    <div>
      <el-button @click.prevent="addFirstQuestion()" size="small" type="primary" icon="el-icon-circle-plus-outline" >添加</el-button>
    </div>
    <div class="question"
      v-for="(e, i) in questionList"
      :key="e.paperQuestionId">
      <div>{{e.questionNum}}.({{e.questionScore}}分){{e.content}}</div>
      <div v-if="e.pictureUrl">
        <span v-for="(url,i) in e.pictureUrl.split(',')" :key="i">
          <el-image :src="url" fit="contain">
            <!-- fill / contain / cover / none / scale-down -->
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </span>
      </div>
      <div class="option" v-if="e.optionA" >A. {{e.optionA}}</div>
      <div class="option" v-if="e.optionB">B. {{e.optionB}}</div>
      <div class="option" v-if="e.optionC">C. {{e.optionC}}</div>
      <div class="option" v-if="e.optionD">D. {{e.optionD}}</div>
      <div v-if="e.type !== 2">【答案】{{e.questionAnswer}}</div>
      <div v-if="e.type === 2">【答案】{{e.questionAnswer == '1' ? '正确' : '错误'}}</div>
      <div>【解析】{{e.explanation}}</div>
      <div>
        <el-button @click="addQuestion(e)" size="small" type="primary" icon="el-icon-circle-plus-outline" >添加</el-button>
        <el-button @click="removeQuestion(e.paperQuestionId, i)" size="small" type="danger"  icon="el-icon-delete" >删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionList: Array,
    type: String
  },
  data () {
    return {
      a: []
    }
  },
  methods: {
    removeQuestion (paperQuestionId, index) {
      var params = {
        paperQuestionId: paperQuestionId
      }
      this.$axios.delete('exam/paper/question', {data: params}).then(res => {
        this.$message.success('删除成功')
        this.questionList.splice(index, 1)
        this.$parent.$parent.search()
      })
    },
    addQuestion (e) {
      this.$parent.$parent.addSingleSelect(e)
    },
    addFirstQuestion () {
      var e = {
        questionNum: 0,
        type: Number.parseInt(this.type)
      }
      this.$parent.$parent.addSingleSelect(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.question {
  margin-top: 10px;
}
.question div {
  margin-bottom: 10px;
}
.option {
  margin-left: 20px;
}
// 图片大小样式
.el-image {
  height: 300px;
  max-width: 400px;
  margin-left: 12px;
}
</style>
