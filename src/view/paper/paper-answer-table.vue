<template>
  <div>
    <div v-if="this.$route.query.paperStatus === 1" class="title-div"><span class="title-nav">考试记录</span></div>
    <div v-if="this.$route.query.paperStatus === 0" class="title-div"><span class="title-nav">待考试卷</span></div>
    <div id="paper-search">
      <span class="input-serach">
        <el-input
        placeholder="请输入试卷名称"
        prefix-icon="el-icon-search"
        v-model="paperName"
        size="medium"
        clearable>
      </el-input>
      </span>
      <el-button class="left" type="primary" size="medium" icon="el-icon-search" @click="search" >搜索</el-button>
    </div>
    <!-- 表格 -->
    <div class="paper-table">
      <el-table  :data="paperList" border stripe  style="width: 100%">
        <el-table-column prop="paperStatus"  label="状态" width="70px" :formatter="formatStatus"></el-table-column>
        <el-table-column prop="paperUserId"  label="考试记录编号" width="110px" ></el-table-column>
        <el-table-column prop="paperId"  label="试卷编号" width="80px" ></el-table-column>
        <el-table-column prop="paperName"  label="试卷名" ></el-table-column>
        <el-table-column prop="paperCode"  label="考试码"></el-table-column>
        <el-table-column prop="duration"  label="考试时长(分钟)" ></el-table-column>
        <el-table-column prop="paperScore"  label="试卷总分"></el-table-column>
        <el-table-column prop="userScore"  label="我的总分"></el-table-column>
        <el-table-column prop="createDate"  label="创建时间" width="151px" :formatter="formatDate"></el-table-column>
        <el-table-column fixed="right" label="操作" width="75">
          <template slot-scope="scope">
            <el-button v-if="scope.row.paperStatus == 0" @click="startPaperAnswer(scope.row)" type="text" size="small">开始考试</el-button>
            <el-button v-if="scope.row.paperStatus == 1" @click="viewPaperAnswered(scope.row)" type="text" size="small">查看详情</el-button>
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
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      paperName: null,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      paperStatus: null,
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
    formatStatus (row, column) {
      var paperStatus = row[column.property]
      if (paperStatus === undefined) {
        return ''
      }
      if (paperStatus === 0) {
        return '待考'
      }
      if (paperStatus === 1) {
        return '已考'
      }
      return paperStatus
    },
    search () {
      var params = {
        paperName: this.paperName,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        paperStatus: this.$route.query.paperStatus
      }
      this.$axios.get('exam/paper/answer', {params: params}).then(res => {
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
    startPaperAnswer (row) {
      this.$router.push({
        path: '/paper/answering',
        query: {
          paperId: row.paperId,
          paperUserId: row.paperUserId
        }
      })
    },
    viewPaperAnswered (row) {
      this.$router.push({
        path: '/paper/answered',
        query: {
          paperId: row.paperId,
          paperUserId: row.paperUserId
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
  watch: {
    $route () {
      this.paperStatus = this.$route.query.paperStatus
    },
    paperStatus () {
      this.search()
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
