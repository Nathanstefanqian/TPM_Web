<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col>
          <el-form-item label="点检内容">
            <el-table :data="useList" style="width: 100%">
              <el-table-column label="序号" type="index" align="center" width="65" fixed />
              <el-table-column label="点检内容" prop="content" align="center" show-overflow-tooltip />
              <el-table-column label="是否绑定扫码" prop="isBind" align="center" :formatter="formatterBind" show-overflow-tooltip />
              <el-table-column label="是否输入数据" prop="needInput" align="center" :formatter="formatterInput" show-overflow-tooltip />
              <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="{row}">
                  <el-tooltip transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">
                    <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <dialog-update ref="dialogUpdate" :maintain-id="maintainId" @getContentInfo="getContentInfo"/>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultDetailViewData from '@/utils/viewData/detail'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  components: {
    DialogUpdate: () => import('./updateContent')
  },
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
      maintainId: null
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    async initDetailAfter(row, data){
      this.model = data
      this.maintainId = this.model.id
      this.getContentInfo(this.model.id)
    },
    getContentInfo(id) {
      this.loading = true
      return api.maintain.plan.getContentList(id).then(res => {
        this.useList = res.data.items
        this.loading = false
      }).catch(reject => {
        this.loading = false
      })
    },
    // 是否绑定扫码
    formatterBind(rows, column) {
      return rows.isBind === null || rows.isBind === '0' ? '-' : '✔'
    },
    // 是否输入数据
    formatterInput(rows, column) {
      return rows.needInput === null || rows.needInput === '0' ? '-' : '✔'
    }

    // getContent(){
    //   this.getContentInfo()
    // },
    // async getContentInfo(){
    //   const a = await this.curApi.getContentList(this.model.id)
    //   this.contentList = a.data.items
    //   for (var i = 0; i < this.contentList.length; i++) {
    //     if (this.contentList[i].maintainId === this.model.id) {
    //       this.useList.push(this.contentList[i])
    //     }
    //   }
    //   this.useList.sort((a,b) => (a.content > b.content) ? 1 : ((b.content > a.content) ? -1 : 0))
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
