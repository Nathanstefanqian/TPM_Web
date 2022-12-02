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
            <el-input v-model="model.personCode" />
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
    const curModels = models.system.department
    const curApi = api.system.department
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '编辑部门信息',
        model: curModels.update,
        roleTypes: [],
        companies: [],
        departs: [],
        statusTypes: [{value: '0', label: '正常'}, {value: '1', label: '停用'}],
        optionTypes: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.getParentDeparts()
    this.getStatus()
    this.getDepartTypes()
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
      return this.getParentDeparts(this.model.roleType, this.model.companyId)
    },
    // 获取父级部门列表
    getParentDeparts(roleType, companyId) {
      // return api.system.department.getSelectParentlist().then(response => {
      //   this.departs = response.data || []
      // })
    },
    // 获取部门状态列表
    getStatus() {

    },
    // 获取机构类型列表
    getDepartTypes() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
