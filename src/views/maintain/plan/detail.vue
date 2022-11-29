<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col>
          <el-form-item label="点检内容">
            <el-table :data="useList" style="width: 100%">
              <el-table-column label="序号" type="index" align="center" width="65" fixed />
              <el-table-column label="点检内容" prop="content" align="center" show-overflow-tooltip />
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultDetailViewData from '@/utils/viewData/detail'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  data() {
    const curModels = models.maintian.plan
    const curApi = api.maintain.plan
    return {
      ...getDefaultDetailViewData(), ...curModels, curApi,
      ...{
        dialogTitle: '详情信息',
        model: curModels.detail,
        functions: []
      },
      contentList: [],
      useList:[],
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    initDetailBefore(){
      this.useList=[]
    },
    initDetailAfter(){
      this.getContent()
    },
    getContent(){
      this.getContentInfo()
    },
    async getContentInfo(){
      const a = await this.curApi.getContentList()
      this.contentList=a.data.items
      for (var i = 0; i < this.contentList.length; i++) {
        if (this.contentList[i].maintainId === this.model.id) {
          this.useList.push(this.contentList[i])
        }
      }
      this.useList.sort((a,b) => (a.content > b.content) ? 1 : ((b.content > a.content) ? -1 : 0))
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
