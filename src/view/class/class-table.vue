<template>
  <div>
    <div class="title-div"><span class="title-nav">班级管理</span></div>
    <div id="paper-search">
      <span class="input-serach">
        <el-select v-model="grade" clearable size="medium" placeholder="请选择年级">
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
      <el-button class="left" type="primary" size="medium" icon="el-icon-search" @click="search" >搜索</el-button>
      <div class="right">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="addClass()">新增班级</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="paper-table">
      <el-table  :data="list" border stripe  style="width: 100%">
        <el-table-column prop="classId"  label="编号" width="70px" ></el-table-column>
        <el-table-column prop="school"  label="学校" ></el-table-column>
        <el-table-column prop="grade"  label="年级" :formatter="formatGrade"></el-table-column>
        <el-table-column prop="classNum"  label="班别" ></el-table-column>
        <el-table-column prop="createBy"  label="创建人" width="80px" ></el-table-column>
        <el-table-column prop="createDate"  label="创建时间" width="151px" :formatter="formatDate"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="addStudent(scope.row)" type="text" size="small">添加学生</el-button>
            <el-button @click="editClass(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="paper-table right"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        layout="total, sizes, prev, pager, next"
        :page-sizes="[1, 10, 20, 50]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <!-- 新增班级 -->
    <my-class-form  ref="myPaperForm"></my-class-form>
    <!-- 新增学生 -->
    <my-class-user-form  ref="myClassUserForm"></my-class-user-form>
  </div>
</template>
<script>
import moment from 'moment'
import myClassForm from '@/view/class/class-form'
import myClassUserForm from '@/view/class/class-user-form'
export default {
  components: {myClassForm, myClassUserForm},
  data () {
    return {
      grade: '',
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
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      list: []
    }
  },
  methods: {
    formatDate (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    formatGrade (row, column) {
      var grade = row[column.property]
      if (grade === undefined) {
        return ''
      }
      for (var i in this.gradeList) {
        if (this.gradeList[i].value === grade) {
          return this.gradeList[i].label
        }
      }
    },
    search () {
      var params = {
        grade: this.grade,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.$axios.get('exam/class', {params: params}).then(res => {
        this.list = res.data.data.records
        this.total = res.data.data.total
      })
    },
    sizeChange (currentSize) {
      this.pageSize = currentSize
      this.search()
    },
    currentChange (currentIndex) {
      this.pageIndex = currentIndex
      this.search()
    },
    addClass () {
      this.$refs.myPaperForm.show('新增')
    },
    editClass (entity) {
      var param = {
        classId: entity.classId,
        school: entity.school,
        grade: entity.grade,
        classNum: entity.classNum
      }
      this.$refs.myPaperForm.show('更新', param)
    },
    addStudent (entity) {
      var param = {
        classId: entity.classId,
        school: entity.school,
        grade: entity.grade,
        classNum: entity.classNum
      }
      this.$refs.myClassUserForm.show('新增', param)
    },
    todo (row) {
      this.$message({
        message: '还在开发中，敬请期待',
        type: 'warning',
        duration: 1.5 * 1000
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
  .input-serach {
    float: left;
    margin-right: 10px;
  }
  .paper-table {
    margin-top: 20px;
  }
  .right {
    float: right;
  }
  .left {
    float: left;
  }
  #paper-search {
    height: 40px;
  }
</style>
