<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <!--      <el-row v-if="user.roleType<=2">-->
      <!--        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">-->
      <!--          <el-form-item label="角色类型" prop="roleType">-->
      <!--            <el-select v-model="model.roleType" filterable clearable >-->
      <!--              <el-option v-for="item in roleTypes" :key="item.key" :label="item.text" :value="item.key" />-->
      <!--            </el-select>-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="用户角色" prop="roleId">
            <el-select v-model="model.roleId" filterable clearable>
              <el-option v-for="item in roles" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="model.userName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="model.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="用户状态" prop="state">
            <el-select v-model="model.state" clearable>
              <el-option v-for="item in enums.userState" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sl="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="model.remark" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
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
    const curModels = models.system.user
    const curApi = api.system.user
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '编辑用户信息',
        model: curModels.update,
        roleTypes: [],
        companies: [],
        roles: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.getRoles()
  },
  methods: {
    ...crud,
    // 初始化数据之前 row：行绑定数据
    async initUpdateBefore(row) {
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
    changeCompanyHandle() {
      // this.roles = []
      // this.model.roleId = null
      // if (this.model.roleType && this.model.companyId) {
      //   this.getRoles(this.model.roleType, this.model.companyId)
      // }
    },
    // 获取角色列表
    getRoles(roleType, companyId) {
      return api.system.role.getSelectlist().then(response => {
        this.roles = response.data || []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
