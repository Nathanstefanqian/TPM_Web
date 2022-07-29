<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :model="model" :label-width="labelWidth||'120px'">
      <el-row v-if="user.roleType<=2">
        <el-col>
          <el-form-item label="角色类型">
            {{ model.role.typeText }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="model.role.type>=3&&user.roleType<=2">
        <el-col>
          <el-form-item label="所属企业">
            {{ model.role.company.name }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用户角色">
            {{ model.role.name }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用户名">
            {{ model.userName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="姓名">
            {{ model.userName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="用户状态">
            {{ model.stateText }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="备注">
            {{ model.remark }}
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
    const curModels = models.system.user
    const curApi = api.system.user
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
