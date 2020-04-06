<template>
  <div>
    <el-upload
      action=""
      :limit="limitSize"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :http-request="uploadFile"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-List="fileList">
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    maxSize: Number,
    limit: Number
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      file: '',
      fileList: [],
      fileUrlList: [],
      limitSize: ''
    }
  },
  methods: {
    handleRemove (file, fileList) {
      // 把fileUrlList也删除对应的文件链接
      for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].uid === file.uid) {
          this.fileUrlList.splice(i, 1)
          break
        }
      }
    },
    handleChange (file) {
      this.file = file.raw
      this.fileList.push(file.raw)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < this.maxSize
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 ' + this.maxSize + 'MB!')
        return false
      }
    },
    uploadFile () {
      var formData = new FormData()
      formData.append('file', this.file)
      let headers = {headers: {'Content-Type': 'multipart/form-data'}}
      this.$axios.post('exam/file/upload', formData, headers).then(res => {
        this.fileUrlList.push(res.data.data.urlList[0])
      })
    },
    getFileList () {
      return this.fileUrlList
    }
  },
  created () {
    console.log(this.limit)
    this.limitSize = this.limit || 10
    console.log(this.limitSize)
  }
}
</script>
