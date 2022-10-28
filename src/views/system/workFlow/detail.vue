<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="流程名称" prop="name">
            {{ model.name }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="24">
          <el-form-item label="流程预览">
            <el-steps align-center :space="400">
              <el-step v-for="(item,index) in flowDatas" :key="index" :title="item.name" :description="item.checkerName">
                <div slot="description">
                  <div>
                    {{ item.checkerName }}
                    <span v-if="item.username != null">({{ item.username }})</span>
                  </div>
                </div>
              </el-step>
            </el-steps>
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
    const curModels = models.system.workFlow
    const curApi = api.system.workFlow
    return {
      ...getDefaultDetailViewData(), ...curModels, curApi,
      ...{
        dialogTitle: '流程详情',
        model: curModels.detail,
        flowDatas: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    // 初始化数据之后 row：行绑定数据；data：接口返回数据
    async initDetailAfter(row, data) {
      this.model = data
      console.log(this.model.id)
      this.getFlowNode(this.model.id)
    },
    getFlowNode(id) {
      this.loading = true
      return api.system.workFlow.getFlows(id).then(res => {
        this.flowDatas = res.data
        this.loading = false
      }).catch(reject => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
