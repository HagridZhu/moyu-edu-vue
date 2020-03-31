<template>
  <div>
    <div class="title-div"><span class="title-nav">试卷管理</span></div>
    <div id="paper-search">
      <span class="input-serach">
        <el-input
        placeholder="请输入试卷名称"
        prefix-icon="el-icon-search"
        v-model="paperName"
        clearable>
      </el-input>
      </span>
      <el-button class="left" type="primary" icon="el-icon-search" @click="search" >搜索</el-button>
      <div class="right">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPaper()">新增试卷</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="paper-table">
      <el-table  :data="paperList" border stripe  style="width: 100%">
        <el-table-column prop="paperId"  label="编号" width="70px" ></el-table-column>
        <el-table-column prop="paperName"  label="试卷名" ></el-table-column>
        <el-table-column prop="paperCode"  label="考试码"></el-table-column>
        <el-table-column prop="duration"  label="考试时长(分钟)" ></el-table-column>
        <el-table-column prop="paperScore"  label="总分"></el-table-column>
        <el-table-column prop="createBy"  label="创建人" width="80px" ></el-table-column>
        <el-table-column prop="createDate"  label="创建时间" width="151px" :formatter="formatDate"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="addPaperQuestion(scope.row)" type="text" size="small">添加试题</el-button>
            <el-button @click="todo(scope.row)" type="text" size="small">编辑</el-button>
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
    <!-- 新增试卷 -->
    <my-paper-form  ref="myPaperForm"></my-paper-form>
  </div>
</template>
<script>
import moment from 'moment'
import myPaperForm from '@/view/paper/paper-form'
export default {
  components: {myPaperForm},
  data () {
    return {
      paperName: '',
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      paperList: []
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
    search () {
      var params = {
        paperName: this.paperName,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.$axios.get('exam/paper', {params: params}).then(res => {
        this.paperList = res.data.data.records
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
    addPaper () {
      this.$refs.myPaperForm.show()
    },
    addPaperQuestion (row) {
      this.$router.push({
        path: './paperDetail',
        query: {
          paperId: row.paperId
        }
      })
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
