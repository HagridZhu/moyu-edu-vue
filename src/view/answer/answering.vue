<template>
<div>
<el-container class="nav">
  <el-header>
    <my-header /><!-- 头部 -->
  </el-header>
  <el-main>
    <div class="background">
      <div class="content">
        <div>{{paperName}}</div>
        <div>
          <span>考试时间: {{duration}}分钟</span>
          <span>试卷总分：{{paperScore}}分</span>
        </div>
        <el-form :model="paperAnswer" >
          <template v-if="singleSelectList.length" >
            <div class="q-type"><b>单选题</b></div>
            <my-question-answering :questionList='questionVoList' type='0'></my-question-answering>
          </template>
          <template v-if="multiSelectList.length" >
            <div class="q-type"><b>多选题</b></div>
            <my-question-answering :questionList='questionVoList' type='1'></my-question-answering>
          </template>
          <template v-if="booleanList.length">
            <div class="q-type"><b>判断题</b></div>
            <my-question-answering :questionList='questionVoList' type='2'></my-question-answering>
          </template>
          <template v-if="wirteList.length">
            <div class="q-type"><b>填空题</b></div>
            <my-question-answering :questionList='questionVoList' type='3'></my-question-answering>
          </template>
        </el-form>
      </div>
    </div>
  </el-main>
</el-container>
</div>
</template>

<script>
import myHeader from '@/view/home/header'
import myQuestionAnswering from '@/view/question/question-answering'
export default {
  components: {myHeader, myQuestionAnswering},
  data () {
    return {
      msg: '',
      paperId: '',
      paperName: '',
      paperCode: '',
      duration: '',
      paperScore: '',
      questionVoList: [],
      examPaperAnswerList: [],
      singleSelectList: [],
      multiSelectList: [],
      booleanList: [],
      wirteList: [],
      paperAnswer: {}
    }
  },
  methods: {
    queryPaper () {
      this.$axios.get('/exam/paper/detail/' + this.paperId).then(res => {
        var data = res.data.data
        this.paperId = data.paperId
        this.paperName = data.paperName
        this.duration = data.duration
        this.paperScore = data.paperScore
        this.examPaperAnswerList = data.questionVoList
        this.questionVoList = data.questionVoList.map(e => {
          e.answer = ''
          return e
        })
        console.log(this.questionVoList)
        this.singleSelectList = data.questionVoList.filter(e => e.type === 0)
        this.multiSelectList = data.questionVoList.filter(e => e.type === 1)
        this.booleanList = data.questionVoList.filter(e => e.type === 2)
        this.wirteList = data.questionVoList.filter(e => e.type === 3)
      })
    }
  },
  created () {
    this.paperId = this.$route.query.paperId
    this.queryPaper()
  }
}
</script>

<style lang="scss" scoped>
.backagroud {
  background-color: gray;
}
.content {
  background-color: white;
  width: 600px;
}
</style>
