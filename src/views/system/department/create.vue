<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" label-width="150px">
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="model.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="部门代码" prop="deptCode">
            <el-input v-model="model.deptCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属部门" prop="parentId">
            <el-select v-model="model.parentId" filterable clearable>
              <el-option v-for="item in departs" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="社会统一信用代码" prop="socialUnifiedCreditCode">
            <el-input v-model="model.socialUnifiedCreditCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-select v-model="model.status" clearable>
              <el-option v-for="item in statusTypes" :key="item.value" :label="item.label" :value="item.value" />
              <!--              :key="item.key" :label="item.text" :value="item.key"-->
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="类型" prop="type">
            <el-select v-model="model.type" clearable>
              <el-option v-for="item in optionTypes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="负责人" prop="personCode">
            <el-select v-model="model.personCode" filterable clearable>
              <el-option v-for="item in users" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="model.phone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sl="24">
          <el-form-item label="描述" prop="des">
            <el-input v-model="model.des" type="textarea" />
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
import {getSelectParentList, getSelectUserList} from "../../../api/system/modules/department";

export default {
  data() {
    const curModels = models.system.department
    const curApi = api.system.department
    return {
      ...getDefaultCreateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '添加部门',
        model: curModels.create,
        roleTypes: [],
        companies: [],
        statusTypes: [{value: '0', label: '正常'}, {value: '1', label: '停用'}],
        optionTypes: [{value: '0', label: '部门'}],
        users: [],
        departs: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    async initCreateBefore() {
      // this.roleTypes = this.$parent.roleTypes
      // this.companies = this.$parent.companies
      // if (this.user.roleType === 3) {
      //   this.model.roleType = 4
      //   this.model.companyId = this.user.companyId
      // }
      this.departs = this.$parent.departs
      this.users = this.$parent.users
    },
    // 切换角色类型
    changeRoleTypeHandle() {
      // // 1、2类角色用户，选择了3、4类角色，验证所属企业下拉框
      // this.rules.companyId[0].required = this.user.roleType <= 2 && this.model.roleType >= 3
      // // 重置模型类
      // this.model.companyId = null
      // this.roles = []
      // this.model.roleId = null
      // // 重新获取角色
      // if (this.model.roleType === 2) {
      //   this.getRoles(2, null)
      // }
    },
    // 切换企业
    async changeCompanyHandle() {
      // this.roles = []
      // this.model.roleId = null
      // if (this.model.roleType && this.model.companyId) {
      //   this.getRoles(this.model.roleType, this.model.companyId)
      // }
    },
    // 清空部分数据
    submitCreateAfter() {
      this.model.name = null
      this.model.deptCode = null
      this.model.parentId = null
      this.model.socialUnifiedCreditCode = null
      this.model.status = null
      this.model.type = null
      this.model.personCode = null
      this.model.phone = null
      this.model.des = null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

