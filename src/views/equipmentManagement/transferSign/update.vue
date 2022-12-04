<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :lg="6" :xs="24">
          <el-form-item label="申请部门" prop="applyDeptId">
            <span>{{ model.applyDeptName }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xs="24">
          <el-form-item label="制造编号：" prop="productCode">
            <span>{{ model.productCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xs="24">
          <el-form-item label="设备编号" prop="deviceNo">
            <span>{{ model.deviceNo }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xs="24">
          <el-form-item label="职系" prop="ezhixi">
            <span>{{ model.zhixi }}</span>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :lg="6" :xs="24">
          <el-form-item label="厂区" prop="factory">
            <span>{{ model.factory }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xs="24">
          <el-form-item label="加工部" prop="eprocessDept">
            <span>{{ model.processDeptName }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xs="24">
          <el-form-item label="作业说明" prop="opDescription">
            <span>{{ model.opDescription }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xs="24">
          <el-form-item label="申请人" prop="opDescription">
            <span>{{ model.applyPersonName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitUpdatePass">通过</el-button>
      <el-button type="success" @click="sentEmail">发送邮件</el-button>
      <el-button type="danger" @click="submitUpdateBack">驳回</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
    <div style="margin-top: 30px">
      <el-steps align-center :space="400" :active="active" finish-status="success">
        <el-step v-for="(item, index) in flowDatas" :key="index" :title="item.name" :description="item.checkPerson">
          <div slot="description">
            <div>{{ item.checkPerson }}</div>
          </div>
        </el-step>
      </el-steps>
    </div>

    <el-table
      ref="listTable"
      v-loading="loading.table"
      v-adaptive="{ bottomOffset: 0 }"
      height="200px"
      width="600px"
      :data="logDatas.items"
      :default-sort="sort"
      border
      fit
      highlight-current-row
      @sort-change="handleSort"
    >
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="签核人员" prop="checkPerson" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="签核时间" prop="checkTime" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="操作" prop="checkInfo" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="备注" prop="checkContent" align="center" show-overflow-tooltip />
    </el-table>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultUpdateViewData from '@/utils/viewData/update'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'
import adaptive from '@/directive/el-table'

export default {
  directives: { adaptive },
  data() {
    const curModels = models.equipmentManagement.transfer
    const curApi = api.equipmentManagement.transfer
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '报废/转移签核',
        model: curModels.update,
        flowDatas: [],
        active: 2,
        roleTypes: [],
        companies: [],
        roles: [],
        logDatas: [],
        eqTransferId: null,
        sort: { prop: 'checkTime', order: 'descending' },
        flowNode: {
          id: null,
          eqTransferId: null,
          checkPerson: null,
          checkInfo: null,
          checkTime: null,
          checkContent: null
        }
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    // 初始化数据之前 row：行绑定数据
    submitUpdatePass() {
      // if (this.user.roleType === 1) {
      //   this.model.checkStatus = this.user.roleType + '1'
      // }
      // this.submitUpdate(1)
      api.equipmentManagement.transfer
        .updateSign(this.eqTransferId,1)
        .then((response) => {
          this.active++
          console.log('通过')
          // this.submitUpdate(1)
          this.getCheckLog(this.eqTransferId)
        })
        .catch((reject) => {
        })
    },
    submitUpdateBack() {
      // if (this.user.roleType === 1) {
      //   this.model.checkStatus = this.user.roleType + '0'
      // }
      // this.submitUpdate(2)
      api.equipmentManagement.transfer
        .updateSign(this.eqTransferId,0)
        .then((response) => {
          console.log('驳回')
        })
        .catch((reject) => {
        })
    },
    sentEmail() {
      this.submitUpdate()
    },
    async initUpdateBefore(row) {
      // 流程数据
      this.getFlowData(row.id)
      this.rules.password[0].required = false
      this.roleTypes = this.$parent.roleTypes
      this.companies = this.$parent.companies
      if (this.user.roleType === 3) {
        this.model.roleType = 4
        this.model.companyId = this.user.companyId
      }
    },
    // 初始化数据之后 row：行绑定数据；data：接口返回数据
    initUpdateAfter(row, data) {
      this.model.roleType = data.role.type
      this.model.companyId = data.role.company.id
      return this.getRoles(this.model.roleType, this.model.companyId)
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
    changeCompanyHandle() {
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
    getFlowData(eqTransferId) {
      api.equipmentManagement.transfer
        .getFlowData(eqTransferId)
        .then((response) => {
          this.flowDatas = response.data || []
          console.log('this.flowDatas', this.flowDatas)
          const a = this.flowDatas
          this.eqTransferId=a[0].eqTransferId
          console.log('this.eqTransferId',this.eqTransferId)
          this.getCheckLog(this.eqTransferId)
          // 设置界面上流程的激活的序号
          for (const flowData of this.flowDatas) {
            if (this.user.userId === flowData.checkId) {
              this.active = flowData.checkOrder - 1
            }
          }
        })
        .catch((reject) => {
        })
    },
    getCheckLog(eqTransferId) {
      api.equipmentManagement.transfer
        .getCheckLog(eqTransferId)
        .then((response) => {
          this.logDatas = response.data || []
          console.log('this.logDatas', this.logDatas)
        })
        .catch((reject) => {
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
