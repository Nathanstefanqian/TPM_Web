<template>
  <el-upload
    class="upload-demo"
    :data="{type:fileType}"
    :action="uploadUrl"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :on-success="handleUploadSuccess"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
