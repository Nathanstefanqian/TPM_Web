<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" label-width="150px">

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitUpdate">提交</el-button>
      <el-button @click="resetUpdate">重置</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultUpdateViewData from '@/utils/viewData/update'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  data() {
    const curModels = models.fileManagement.upload
    const curApi = api.fileManagement.upload
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '编辑信息',
        model: curModels.update,
        roleTypes: [],
        departs: [],
        users: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    // 初始化数据之前 row：行绑定数据
    async initUpdateBefore(row) {
      // this.roleTypes = this.$parent.roleTypes
      // this.companies = this.$parent.companies
      // if (this.user.roleType === 3) {
      //   this.model.roleType = 4
      //   this.model.companyId = this.user.companyId
      // }
    },
    // 初始化数据之后 row：行绑定数据；data：接口返回数据
    initUpdateAfter(row, data) {
      this.model = data
      // this.model.roleType = data.role.type
      // this.model.companyId = data.role.company.id
      // return this.getParentDeparts(this.model.roleType, this.model.companyId)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
