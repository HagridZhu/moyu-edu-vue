<template>
  <div>
    <div class="question"
      v-for="(e) in questionList"
      :key="e.paperQuestionId">
      <template v-if="e.type == type">
        <div><span class="font-score">{{e.questionNum}}.({{e.questionScore}}分)</span>{{e.content}}</div>
        <div v-if="e.pictureUrl">
          <span v-for="(url,i) in e.pictureUrl.split(',')" :key="i">
            <img :src="url" >
          </span>
        </div>
        <el-radio-group v-if="e.type == 0" v-model="e.answer">
          <div><el-radio v-if="e.optionA" v-model="e.answer" label="A">A. {{e.optionA}}</el-radio></div>
          <div><el-radio v-if="e.optionB" v-model="e.answer" label="B">B. {{e.optionB}}</el-radio></div>
          <div><el-radio v-if="e.optionC" v-model="e.answer" label="C">C. {{e.optionC}}</el-radio></div>
          <div><el-radio v-if="e.optionD" v-model="e.answer" label="D">D. {{e.optionD}}</el-radio></div>
        </el-radio-group>
        <el-checkbox-group v-if="e.type == 1" v-model="e.answer">
          <div><el-checkbox v-if="e.optionA" label="A">A. {{e.optionA}}</el-checkbox></div>
          <div><el-checkbox v-if="e.optionB" label="B">B. {{e.optionB}}</el-checkbox></div>
          <div><el-checkbox v-if="e.optionC" label="C">C. {{e.optionC}}</el-checkbox></div>
          <div><el-checkbox v-if="e.optionD" label="D">D. {{e.optionD}}</el-checkbox></div>
        </el-checkbox-group>
        <el-input v-if="[0, 1].indexOf(e.type) < 0" v-model="e.answer" ></el-input>
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
</style>
