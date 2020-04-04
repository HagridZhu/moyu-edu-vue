<template>
  <div id="paper-detail">
    <div class="title-div"><span class="title-nav">添加试题</span></div>
    <div>
      <div>
        <el-form label-position="right" label-width="auto">
          <el-form-item label="试卷编号" hidden>{{this.$route.query.paperId}}</el-form-item>
          <el-form-item class="overview" label="试卷名:" prop="userName">{{paperName}}</el-form-item>
          <el-form-item class="overview" label="考试时长:" prop="duration">{{duration}}分钟</el-form-item>
          <el-form-item class="overview" label="总分:" prop="paperScore">{{paperScore}}分</el-form-item>
          <div class="q-type"><b>单选题</b></div>
          <my-question-view :questionList='singleSelectList' type='0' ></my-question-view>
          <div class="q-type"><b>多选题</b></div>
          <my-question-view :questionList='multiSelectList' type='1' ></my-question-view>
          <div class="q-type"><b>判断题</b></div>
          <my-question-view :questionList='booleanList' type='2' ></my-question-view>
          <div class="q-type"><b>填空题</b></div>
          <my-question-view :questionList='wirteList' type='3' ></my-question-view>
        </el-form>
      </div>
    </div>
    <my-question-form ref="myQuestionForm"></my-question-form>
  </div>
</template>
<script>
import myQuestionForm from '@/view/question/question-form'
import myQuestionView from '@/view/question/question-view'
export default {
  components: {myQuestionForm, myQuestionView},
  data () {
    return {
      paperName: '',
      paperId: '',
      paperCode: '',
      duration: '',
      paperScore: '',
      singleSelectList: [],
      multiSelectList: [],
      booleanList: [],
      wirteList: [],
      singleSelectList1: []
    }
  },
  methods: {
    removeSingleSelect (index) {
      this.singleSelectList.splice(index, 1)
    },
    addSingleSelect (e) {
      e.paperId = this.paperId
      e.num = e.questionNum
      this.$refs.myQuestionForm.show(e)
    },
    search () {
      this.$axios.get('exam/paper/detail/' + this.$route.query.paperId).then(res => {
        let data = res.data.data
        this.paperName = data.paperName
        this.paperCode = data.paperCode
        this.duration = data.duration
        this.paperScore = data.paperScore
        this.paperId = data.paperId
        this.singleSelectList = data.questionVoList.filter(e => e.type === 0)
        this.multiSelectList = data.questionVoList.filter(e => e.type === 1)
        this.booleanList = data.questionVoList.filter(e => e.type === 2)
        this.wirteList = data.questionVoList.filter(e => e.type === 3)
      })
    }
  },
  created () {
    this.search()
  }
}
</script>

<style lang="scss" scoped>
.title-nav {
  height: 50px;
  float: left;
  font-weight: 500;
  font-size: 22px;
}
.title-div {
  display: block;
  height: 50px;
}
#paper-detail {
  text-align: left;
}
.overview {
  margin-bottom: 0px;
}
.q-type {
  font-size: 20px;
  font-weight: 800px;
  margin-top: 15px;
  margin-bottom: 15px;
}

</style>
