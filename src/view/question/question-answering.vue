<template>
  <div>
    <div class="question"
      v-for="(e) in questionList"
      :key="e.paperQuestionId">
      <template v-if="e.type == type">
        <div>{{e.questionNum}}.({{e.questionScore}}分){{e.content}}</div>
        <div v-if="e.pictureUrl">
          <img :src="e.pictureUrl">
        </div>
        <el-radio-group v-if="e.type == 0" v-model="e.answer">
          <el-radio v-if="e.optionA" label="A">A. {{e.optionA}}</el-radio>
          <el-radio v-if="e.optionB" label="C">B. {{e.optionB}}</el-radio>
          <el-radio v-if="e.optionC" label="C">C. {{e.optionC}}</el-radio>
          <el-radio v-if="e.optionD" label="D">D. {{e.optionD}}</el-radio>
        </el-radio-group>
        <el-checkbox-group v-if="e.type == 1" v-model="e.answer">
          <el-checkbox v-if="e.optionA" label="A">A. {{e.optionA}}</el-checkbox>
          <el-checkbox v-if="e.optionB" label="B">B. {{e.optionB}}</el-checkbox>
          <el-checkbox v-if="e.optionC" label="C">C. {{e.optionC}}</el-checkbox>
          <el-checkbox v-if="e.optionD" label="D">D. {{e.optionD}}</el-checkbox>
        </el-checkbox-group>
        <el-input v-model="e.questionNum"></el-input>
        <el-input v-model="e.paperQuestionId"></el-input>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionList: Array,
    type: String,
    answering: Boolean
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
</style>
