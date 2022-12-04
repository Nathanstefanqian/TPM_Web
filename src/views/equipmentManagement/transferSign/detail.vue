<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :model="model" :label-width="labelWidth||'120px'">
      <el-row >
        <el-col>
          <el-form-item label="单号">
            {{ model.transferNo }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col>
          <el-form-item label="申请单位">
            {{ model.applyDeptName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col>
          <el-form-item label="制造编号">
            {{ model.productCode }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="设备型号">
            {{ model.deviceNo }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="作业信息">
            {{ model.opInfo }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="职系">
            {{ model. zhixi }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="厂区">
            {{ model.factory }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="加工部">
            {{ model.processDeptName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="作业说明">
            {{ model.opDescription }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="申请人姓名">
            {{ model.applyPersonName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="申请时间">
            {{ model.applyTime }}
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
    const curModels = models.equipmentManagement.transfer
    const curApi = api.equipmentManagement.transfer
    return {
      ...getDefaultDetailViewData(), ...curModels, curApi,
      ...{
        dialogTitle: '用户信息',
        model: curModels.detail,
        functions: []
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
</style>
