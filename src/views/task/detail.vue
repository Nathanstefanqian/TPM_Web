<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :model="model" :label-width="'140px'">
      <el-row v-if="user.roleType<=2">
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属企业">
            {{ model.companyName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="任务名称">
            {{ model.name }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="任务开始时间">
            {{ model.beginTime }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="任务结束时间">
            {{ model.endTime }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sl="24">
          <el-form-item label="备注">
            {{ model.remark }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="浮标配置" />
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="formBuoys" :inline="true" class="buoy">
      <el-row v-for="taskBuoy in model.taskBuoys" :key="taskBuoy.id">
        <el-col>
          <el-form-item label="浮标IMEI：">
            {{ taskBuoy.imei }}
          </el-form-item>
          <el-form-item label="浮标编号：">
            {{ taskBuoy.buoy.code }}
          </el-form-item>
          <el-form-item label="深度：">
            {{ taskBuoy.depth }}米
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
    const curModels = models.task
    const curApi = api.task
    return {
      ...getDefaultDetailViewData(), ...curModels, curApi,
      ...{
        dialogTitle: '任务信息',
        model: curModels.detail
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud
  }
}
</script>

<style lang="scss" scoped>
.buoy {
  padding-left: 120px;

  .el-form-item {
    padding-right: 30px;
  }
}
</style>
