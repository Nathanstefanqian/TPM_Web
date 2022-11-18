<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle"
    :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth || '120px'">
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属部门" prop="applyDeptId">
            <el-select v-model="model.deptId" class="query-item" style="width: 150px" placeholder="申请部门" clearable
              @clear="handleQuery">
              <el-option v-for="item in departs" :key="item.key" :label="item.text" :value="item.key"
                @click.native="onChangeDepart(item.text)" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属工段" prop="applyDeptId">
            <el-select v-model="model.section" class="query-item" style="width: 150px" placeholder="所属工段" clearable
              @clear="handleQuery">
              <el-option v-for="item in sections" :key="item.key" :label="item.text" :value="item.key"
                @click.native="onChangeDepart(item.text)" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xl="8" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造编号" prop="productCode">
            <el-input v-model="model.productCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造日期" prop="productCode">
            <el-date-picker v-model="model.productDate" align="center" placeholder="选择日期" type="datetime"
              value-format="yyyy-MM-dd" class="query-item" style="width: 200px" @change="handleChangeQueryDate" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备编号" prop="propertyCode">
            <el-input v-model="model.deviceNum" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备型号" prop="propertyCode">
            <el-input v-model="model.deviceType" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="资产编号" prop="propertyCode">
            <el-input v-model="model.propertyCode" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="报修等级" prop="level">
            <el-select v-model="model.level" filterable clearable>
              <el-option v-for="item in levels" :key="item.key" :label="item.text" :value="item.key"
                @click.native="onChangeZhixi(item.text)" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="报修类别" prop="factory">
            <el-select v-model="model.category" filterable clearable>
              <el-option v-for="item in categories" :key="item.key" :label="item.text" :value="item.key"
                @click.native="onChangeFactory(item.text)" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="选择签核流程" prop="workFlow">
            <el-select v-model="model.flowId" class="query-item" style="width: 150px" placeholder="签核流程" clearable
              @clear="handleQuery">
              <el-option v-for="item in workFlows" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
          <el-form-item label="报修内容" prop="content">
            <el-input v-model="model.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label=" " prop="opDescription">
            <el-button type="primary">添加附件</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitCreate">提交</el-button>
      <el-button @click="visible = false">取消</el-button>
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
  data() {
    const curModels = models.repair.apply
    const curApi = api.repair.apply
    return {
      ...getDefaultCreateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '设备报废转移申请',
        model: curModels.create,
        roleTypes: [],
        companies: [],
        workFlows: [],
        roles: [],
        departs: [],
        zhixis: [],
        factories: [],
        processDepts: [],
        sections: [],
        levels: [{
          key: '一般',
          text: '一般'
        }, {
          key: '加急',
          text: '加急'
        }],
        categories: [{
          key: '设备维修',
          text: '设备维修'
        }, {
          key: '量测设备维修',
          text: '量测设备维修'
        }, {
          key: '辅助治具维修',
          text: '辅助治具维修'
        }]
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
      this.sections = this.$parent.sections
      // this.model.flowId = ''
      this.getWorkFlows()
      // 页面刷新，丢失数据
      // this.getRoles(this.model.roleType, this.model.companyId)
    },
    // 获取流程下拉列表
    getWorkFlows() {
      api.system.workFlow.getSelectlist('1').then(response => {
        this.workFlows = response.data || []
      }).catch(reject => {
      })
    },
    onChangeDepart(val) {
      this.model.deptName = val
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
      this.rules.companyId[0].required = this.user.roleType <= 2 && this.model.roleType >= 3
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
      return api.system.role.getSelectlist(roleType, companyId).then(response => {
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

