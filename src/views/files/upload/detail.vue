<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :model="model" :label-width="labelWidth||'120px'">

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
    const curModels = models.fileManagement.upload
    const curApi = api.fileManagement.upload
    return {
      ...getDefaultDetailViewData(), ...curModels, curApi,
      ...{
        dialogTitle: '详情信息',
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
