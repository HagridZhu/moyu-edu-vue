<template>
<div>
<el-container class="nav">
  <el-header>
    <my-header /><!-- 头部 -->
  </el-header>
  <el-main class="answering-main">
    <div class="backgroud">
      <div class="content">
        <div class="center" id = "paperName">{{paperName}}</div>
        <div class="center" id = "description">
          <span>考试时间: {{duration}}分钟</span>
          <span>试卷总分：{{paperScore}}分</span>
        </div>
        <el-form >
          <template v-if="singleSelectList.length" >
            <div class="q-type"><b>单选题</b></div>
            <my-question-answered :questionList='answerVoList' type="0" ></my-question-answered>
          </template>
          <template v-if="multiSelectList.length" >
            <div class="q-type"><b>多选题</b></div>
            <my-question-answered :questionList='answerVoList' type="1" ></my-question-answered>
          </template>
          <template v-if="booleanList.length">
            <div class="q-type"><b>判断题</b></div>
            <my-question-answered :questionList='answerVoList' type="2" ></my-question-answered>
          </template>
          <template v-if="wirteList.length">
            <div class="q-type"><b>填空题</b></div>
            <my-question-answered :questionList='answerVoList' type="3" ></my-question-answered>
          </template>
          <div clsss="center"><div id="submitBtn">你的总分：<span id="userScore">{{userScore}}</span></div></div>
        </el-form>
      </div>
    </div>
  </el-main>
</el-container>
</div>
</template>

<script>
import myHeader from '@/view/home/header'
import myQuestionAnswered from '@/view/question/question-answered'
export default {
  components: {myHeader, myQuestionAnswered},
  data () {
    return {
      msg: '',
      paperUserId: '',
      paperId: '',
      paperName: '',
      paperCode: '',
      duration: '',
      paperScore: '',
      userScore: '',
      questionVoList: [],
      singleSelectList: [],
      multiSelectList: [],
      booleanList: [],
      wirteList: [],
      paperAnswer: {}
    }
  },
  methods: {
    queryPaper () {
      this.$axios.get('/exam/paper/answer/detail', {params: {paperUserId: this.paperUserId}}).then(res => {
        var data = res.data.data
        this.paperId = data.paperId
        this.paperName = data.paperName
        this.duration = data.duration
        this.paperScore = data.paperScore
        this.userScore = data.userScore
        this.answerVoList = data.answerVoList
        this.singleSelectList = data.answerVoList.filter(e => e.type === 0)
        this.multiSelectList = data.answerVoList.filter(e => e.type === 1)
        this.booleanList = data.answerVoList.filter(e => e.type === 2)
        this.wirteList = data.answerVoList.filter(e => e.type === 3)
      })
    }
  },
  created () {
    this.paperId = this.$route.query.paperId
    this.paperUserId = this.$route.query.paperUserId
    this.queryPaper()
  }
}
</script>

<style lang="scss" scoped>
.answering-main{
  background-color: rgba(240, 238, 238, 0.904);
  min-height: 1400px;
}
.backgroud {
  width: 750px;
  margin: 0 auto;
}
.content {
  border-radius:12px;
  background-color: white;
  padding: 40px 80px;
  text-align: left;
  font-family: "宋体";
  font-size: 5;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.center {
  text-align: center;
}
#paperName {
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 20px;
}
.q-type {
  margin-top: 10px;
  font-family: "黑体";
  font-size: 21px;
}
#description {
  margin-bottom: 20px;
}
#submitBtn {
  text-align: center;
}
#userScore{
  font-weight: 900;
  font-size: 1.5em;
}
</style>
