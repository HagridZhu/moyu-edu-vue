<template>
  <div>
    <div class="question"
      v-for="(e,i) in questionList"
      :key="i">
      <template v-if="e.type == type">
        <div><span class="font-score">{{e.questionNum}}.({{e.questionScore}}分)</span>{{e.content}}</div>
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
          <template v-if="e.type == 2">【你的答案】{{e.answer == 1 ? '正确' : e.answer == 0 ? 错误 : e.answer}}</template>
          <template v-else>【你的答案】{{e.answer}}</template>
          <el-button type="success" id="rightIcon" size="mini" icon="el-icon-check" circle disabled v-if="e.answerStatus == 1"></el-button>
          <el-button type="danger"  id="wrongIcon" size="mini" icon="el-icon-close" circle disabled v-if="e.answerStatus == 0"></el-button>
        </div>
        <div>
          <template v-if="e.type == 2">【正确答案】{{e.questionAnswer == 1 ? '正确' : e.questionAnswer == 0 ? 错误 : e.questionAnswer}}</template>
          <template v-else>【正确答案】{{e.questionAnswer}}</template>
        </div>
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
.question-img {
  max-width: 120px;
  max-height: 120px;
}
// 图片大小样式
.el-image {
  height: 300px;
  max-width: 400px;
  margin-left: 12px;
}
</style>
