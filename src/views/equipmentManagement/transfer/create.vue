<template>
  <el-dialog
    v-loading="loading"
    :custom-class="'dialog-fullscreen dialog-' + dialogClass"
    :title="dialogTitle"
    :visible.sync="visible"
    :modal="false"
    :modal-append-to-body="false"
    @close="resetForm()"
  >
    <el-form
      ref="form"
      label-position="right"
      :rules="rules"
      :model="model"
      :label-width="labelWidth || '120px'"
    >
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="申请部门" prop="applyDeptId">
            <el-select
              v-model="model.applyDeptId"
              class="query-item"
              style="width: 150px"
              placeholder="申请部门"
              clearable
              @clear="handleQuery"
            >
              <el-option
                v-for="item in departs"
                :key="item.key"
                :label="item.text"
                :value="item.key"
                @click.native="onChangeDepart(item.text)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造编号" prop="productCode">
            <el-input v-model="model.productCode" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备编号" prop="deviceNo">
            <el-input v-model="model.deviceNo" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="作业信息" prop="opInfo">
            <el-input v-model="model.opInfo" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="职系" prop="zhixiId">
            <el-select
              v-model="model.zhixiId"
              filterable
              clearable
              @change="changeRoleTypeHandle()"
            >
              <el-option
                v-for="item in zhixis"
                :key="item.key"
                :label="item.text"
                :value="item.key"
                @click.native="onChangeZhixi(item.text)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="厂区" prop="factory">
            <el-select
              v-model="model.factoryId"
              filterable
              clearable
              @change="changeRoleTypeHandle()"
            >
              <el-option
                v-for="item in factories"
                :key="item.key"
                :label="item.text"
                :value="item.key"
                @click.native="onChangeFactory(item.text)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="加工部" prop="eprocessDept">
            <el-select
              v-model="model.processDeptId"
              class="query-item"
              style="width: 150px"
              placeholder="请选择"
              clearable
              @clear="handleQuery"
            >
              <el-option
                v-for="item in processDepts"
                :key="item.key"
                :label="item.text"
                :value="item.key"
                @click.native="onChangePrecessDept(item.text)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="附件" prop="opDescription">
            <MultipleFile file-type="repairApplyFile" :file-list="fileList" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitCreate">提交</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultCreateViewData from '@/utils/viewData/create'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  components: {
    MultipleFile: () => import('@/components/Upload/MultipleFile')
  },
  data() {
    const BASE_URL = process.env.VUE_APP_BASE_API
    const curModels = models.equipmentManagement.transfer
    const curApi = api.equipmentManagement.transfer
    return {
      fileType: 'repairApplyFile',
      uploadUrl: BASE_URL + '/file/uploadSingleFile',
      fileList: [],
      ...getDefaultCreateViewData(),
      ...curModels,
      curApi,
      rules,
      ...{
        dialogTitle: '设备报废转移申请',
        model: curModels.create,
        roleTypes: [],
        companies: [],
        roles: [],
        departs: [],
        zhixis: [],
        factories: [],
        processDepts: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    async initCreateBefore() {
      this.roleTypes = this.$parent.roleTypes
      this.departs = this.$parent.departs
      this.zhixis = this.$parent.zhixis
      this.factories = this.$parent.factories
      this.processDepts = this.$parent.processDepts
      // 页面刷新，丢失数据
      // this.getRoles(this.model.roleType, this.model.companyId)
    },
    onChangeDepart(val) {
      this.model.applyDeptName = val
    },
    onChangeZhixi(val) {
      this.model.zhixi = val
    },
    onChangeFactory(val) {
      this.model.factory = val
    },
    onChangePrecessDept(val) {
      this.model.processDeptName = val
    },
    // 切换角色类型
    changeRoleTypeHandle() {
      // 1、2类角色用户，选择了3、4类角色，验证所属企业下拉框
      this.rules.companyId[0].required =
        this.user.roleType <= 2 && this.model.roleType >= 3
      // 重置模型类
      this.model.companyId = null
      this.roles = []
      this.model.roleId = null
      // 重新获取角色
      if (this.model.roleType === 2) {
        this.getRoles(2, null)
      }
    },
    // 切换企业
    async changeCompanyHandle() {
      this.roles = []
      this.model.roleId = null
      if (this.model.roleType && this.model.companyId) {
        this.getRoles(this.model.roleType, this.model.companyId)
      }
    },
    // 获取角色列表
    getRoles(roleType, companyId) {
      return api.system.role
        .getSelectlist(roleType, companyId)
        .then((response) => {
          this.roles = response.data || []
        })
    },
    // submitCreateBefore() {
    //   this.model.applyPersonId = this.user.id // 绑定当前用户
    //   this.model.applyPersonName = this.user.name // 绑定当前用户
    //   console.log('userid' + this.user.id)
    //   console.log('name' + this.user.name + '|' + this.user.displayName)
    // },
    submitCreateAfter() {
      // 清空部分数据
      this.model.productCode = null
      this.model.deviceNo = null
      this.model.opDescription = null
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    cancel() {
      // 重置form表单
      this.$refs['form'].resetFields()
      // 关闭dialog
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

