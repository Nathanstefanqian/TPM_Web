<template>
  <div>
    <el-popover
      placement="right"
      :width="width"
      :trigger="trigger"
      @getEqRepairApplyFile="getEqRepairApplyFile"
    >
      <el-table
        :data="fileList"
        stripe
        max-height="300"
      >
        <el-table-column width="150" property="fileName" label="附件名" align="center">
          <template slot-scope="scope">
            <el-image
              v-if="isImage(scope.row.fileName)"
              ref="myImg"
              :src="'http://localhost:8889/api/v1' +(scope.row.filePath)"
              :preview-src-list="srcList"
            />
            <el-link v-else @click="getFileList(scope.row.filePath)">
              <template>{{ scope.row.fileName }}</template>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column width="100" label="类型" align="center">
          <template slot-scope="scope">
            <el-tag v-if="isImage(scope.row.fileName)" type="success">图片</el-tag>
            <el-tag v-else type="primary">文件</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="100" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="isImage(scope.row.fileName)"
              size="mini"
              type="primary"
              @click="doPreviewImg()"
            >预览
            </el-button>
            <el-button v-else size="mini" type="primary"
                       @click="getFileList(scope.row.filePath, scope.row.fileName)">下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-link slot="reference" @click="getEqRepairApplyFile">查看附件</el-link>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "CheckFile",
  props: {
    width: {
      type: Number,
      default: 400
    },
    trigger: {
      type: String,
      default: 'click'
    },
    fileList: {
      type: Array,
      default: []
    },
    srcList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {}
  },
  methods: {
    // 判断是否是图片
    isImage(str) {
      const reg = /.(png|jpg|gif|jpeg|webp|svg)$/
      return reg.test(str)
    },
    // 下载附件
    getFileList(url, fileName) {
      window.open(process.env.VUE_APP_BASE_API + url)
    },
    // 图片预览
    doPreviewImg() {
      this.$refs.myImg.showViewer = true
    },
    // 获取附件数据
    getEqRepairApplyFile() {
      this.$emit('getEqRepairApplyFile')
    },
  }
}
</script>

<style scoped>

</style>
