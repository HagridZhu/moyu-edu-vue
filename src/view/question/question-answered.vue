<template>
  <div>
    <div class="question"
      v-for="(e) in questionList"
      :key="e.paperQuestionId">
      <template v-if="e.type == type">
        <div><span class="font-score">{{e.questionNum}}.({{e.questionScore}}分)</span>{{e.content}}</div>
        <div v-if="e.pictureUrl">
          <img :src="e.pictureUrl">
        </div>
        <div class="option" v-if="e.type == 0">
          <div v-if="e.optionA">A. {{e.optionA}}</div>
          <div v-if="e.optionB">B. {{e.optionB}}</div>
          <div v-if="e.optionC">C. {{e.optionC}}</div>
          <div v-if="e.optionD">D. {{e.optionD}}</div>
        </div>
        <div class="option" v-if="e.type == 1">
          <div v-if="e.optionA">A. {{e.optionA}}</div>
          <div v-if="e.optionB">B. {{e.optionB}}</div>
          <div v-if="e.optionC">C. {{e.optionC}}</div>
          <div v-if="e.optionD">D. {{e.optionD}}</div>
        </div>
        <div>
          【你的答案】{{e.answer}}
          <el-button type="success" id="rightIcon" size="mini" icon="el-icon-check" circle disabled v-if="e.answerStatus == 0"></el-button>
          <el-button type="danger"  id="wrongIcon" size="mini" icon="el-icon-close" circle disabled v-if="e.answerStatus == 1"></el-button>
        </div>
        <div>【正确答案】{{e.questionAnswer}}</div>
        <div>【解析】{{e.explanation}}</div>
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
el-radio {
  display: block;
}
#rightIcon {
  color: green
}
</style>
