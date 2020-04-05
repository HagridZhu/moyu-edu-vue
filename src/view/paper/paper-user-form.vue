<template>
  <el-dialog
    title="发起考试"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="paper" :model="entity" label-width="80px">
      <el-form-item label="试卷id" style="display: none">
        <el-input v-model="entity.paperId" clearable></el-input>
      </el-form-item>
      <el-form-item label="班级" class="class-select">
        <el-select v-model="entity.classId" clearable placeholder="请选择班级">
          <el-option
            v-for="item in classList"
            :key="item.value"
            :label="item.label"
            :value="item.classId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">立即{{type}}</el-button>
  </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      type: '',
      entity: {
        classId: '',
        paperId: ''
      },
      classList: [],
      gradeList: [
        {
          value: 1,
          label: '一年级'
        },
        {
          value: 2,
          label: '二年级'
        },
        {
          value: 3,
          label: '三年级'
        },
        {
          value: 4,
          label: '四年级'
        },
        {
          value: 5,
          label: '五年级'
        },
        {
          value: 6,
          label: '六年级'
        },
        {
          value: 7,
          label: '初一'
        },
        {
          value: 8,
          label: '初二'
        },
        {
          value: 9,
          label: '初三'
        },
        {
          value: 10,
          label: '高一'
        },
        {
          value: 11,
          label: '高二'
        },
        {
          value: 12,
          label: '高三'
        }
      ],
      dialogVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认取消发起考试？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    show (type, paperId) {
      this.dialogVisible = true
      this.type = type
      this.entity.paperId = paperId
      this.$axios.get('exam/class', {params: {pageSize: 20}}).then(res => {
        this.classList = res.data.data.records.map(e => {
          this.$set(e, 'label', this.getGradeName(e.grade) + '(' + e.classNum + ')班')
          return e
        })
      })
    },
    getGradeName (grade) {
      for (var i in this.gradeList) {
        if (this.gradeList[i].value === grade) {
          return this.gradeList[i].label
        }
      }
    },
    onSubmit () {
      this.$axios.post('exam/paper/user/class', this.entity).then(res => {
        this.$message.success(this.type + '成功')
      })
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.class-select {
  text-align: left;
}
</style>
