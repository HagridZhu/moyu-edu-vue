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
            <my-question-answering :questionList='questionVoList' type=0 ></my-question-answering>
          </template>
          <template v-if="multiSelectList.length" >
            <div class="q-type"><b>多选题</b></div>
            <my-question-answering :questionList='questionVoList' type=1 ></my-question-answering>
          </template>
          <template v-if="booleanList.length">
            <div class="q-type"><b>判断题</b></div>
            <my-question-answering :questionList='questionVoList' type=2 ></my-question-answering>
          </template>
          <template v-if="wirteList.length">
            <div class="q-type"><b>填空题</b></div>
            <my-question-answering :questionList='questionVoList' type=3 ></my-question-answering>
          </template>
          <div clsss="center"><el-button id="submitBtn" @click="answer">提交</el-button></div>
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
      paperUserId: null,
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
          if (e.type === 1) {
            this.$set(e, 'answer', [])
            return e
          }
          this.$set(e, 'answer', '')
          return e
        })
        this.singleSelectList = data.questionVoList.filter(e => e.type === 0)
        this.multiSelectList = data.questionVoList.filter(e => e.type === 1)
        this.booleanList = data.questionVoList.filter(e => e.type === 2)
        this.wirteList = data.questionVoList.filter(e => e.type === 3)
      })
    },
    answer () {
      var param = {
        paperId: this.paperId,
        paperUserId: this.paperUserId,
        examPaperAnswerList: this.questionVoList.map(e => {
          if (Array.isArray(e.answer)) {
            e.answer = e.answer.join('')
          }
          return e
        })
      }
      this.$axios.post('/exam/paper/answer', param).then(res => {
        this.$message.success('提交成功')
        var data = res.data.data
        this.paperUserId = data.paperUserId
        // 跳转页面
        this.$router.replace({
          path: '/paper/answered',
          query: {
            paperUserId: this.paperUserId
          }
        })
      })
    }
  },
  created () {
    this.paperId = this.$route.query.paperId
    if (this.$route.query.paperUserId) {
      this.paperUserId = this.$route.query.paperUserId
    }
    this.queryPaper()
  }
}
</script>

<style lang="scss" scoped>
.answering-main{
  background-color: rgba(240, 238, 238, 0.904);//rgba(44, 30, 30, 0.904);
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
  display: block;
  margin: 0 auto;
}

</style>
