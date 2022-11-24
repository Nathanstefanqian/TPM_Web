<template>
  <el-upload
    class="upload-demo"
    :data="{ type: fileType }"
    :action="uploadUrl"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="5"
    :on-exceed="handleExceed"
    :on-success="handleUploadSuccess"
  >
    <el-button icon="el-icon-upload" size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  name: 'MultipleFile',
  props: {
    fileType: {
      type: String,
      required: true
    },
    fileList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + '/file/uploadSingleFile'
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleUploadSuccess(res, file) {
      this.fileList.unshift(
        {
          name: file.name,
          url: file.response.data.url
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
