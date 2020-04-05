<template>
  <el-dialog
    :title="type + '班级'"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="paper" :model="entity" label-width="80px">
      <el-form-item label="班级id" style="display: none">
        <el-input v-model="entity.paperId" clearable></el-input>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="entity.school" clearable></el-input>
      </el-form-item>
      <el-form-item label="年级" class="class-select">
        <el-select v-model="entity.grade" clearable placeholder="请选择年级">
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班别">
        <el-input v-model="entity.classNum" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
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
        school: '',
        grade: '',
        classNum: ''
      },
      dialogVisible: false,
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
      ]
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认取消' + this.type + '班级？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    show (type, entity) {
      this.dialogVisible = true
      this.type = type
      this.entity = entity || {
        classId: null,
        school: '',
        grade: '',
        classNum: ''
      }
    },
    onSubmit () {
      if (this.type === '新增') {
        this.$axios.post('exam/class', this.entity).then(res => {
          this.$message.success(this.type + '成功')
        })
      } else {
        this.$axios.put('exam/class', this.entity).then(res => {
          this.$message.success(this.type + '成功')
        })
      }
      this.dialogVisible = false
      this.$parent.search()
    }
  }
}
</script>
<style lang="scss" scoped>
.class-select {
  text-align: left;
}
</style>
