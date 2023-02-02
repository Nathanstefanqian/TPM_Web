<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="流程名称" prop="name">
            <el-input v-model="model.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="流程类型" prop="type">
            <el-select v-model="model.type" style="width: 200px" filterable clearable>
              <el-option v-for="item in flowTypes" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
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
import {getFlowTypes} from "../../../api/system/modules/workFlow";

export default {
  data() {
    const curModels = models.system.workFlow
    const curApi = api.system.workFlow
    return {
      ...getDefaultCreateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '添加流程',
        model: curModels.create,
        flowTypes: []
        // roleTypes: [],
        // companies: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  // created() {
  //   this.clearAndInitQuery()
  //   this.getDatas()
  // },
  methods: {
    ...crud,
    async initCreateBefore() {
      this.getFlowTypes()
      // this.roleTypes = this.$parent.roleTypes
      // this.companies = this.$parent.companies
      // if (this.user.roleType === 3) {
      //   this.model.type = 4
      //   this.model.companyId = this.user.companyId
      //   await this.getFunctions(this.model.type)
      // }
    },
    // // 获取当前用户权限的所有系统功能
    // getFunctions(roleType) {
    //   this.loading = true
    //   return api.system.role.getFunctionsFromAccess(roleType).then(response => {
    //     this.functions = response.data
    //     this.loading = false
    //   }).catch(reject => {
    //     this.loading = false
    //   })
    // },
    // 切换角色类型
    // async changeRoleTypeHandle() {
    //   // 1、2类角色用户，选择了3、4类角色，验证所属企业下拉框
    //   this.rules.companyId[0].required = this.user.roleType <= 2 && this.model.type >= 3
    //   // 获取系统功能
    //   if (this.model.type) {
    //     await this.getFunctions(this.model.type)
    //   }
    // },
    // 获取流程类型下拉列表
    getFlowTypes() {
      return api.system.workFlow.getFlowTypes().then(response => {
        this.flowTypes = response.data || []
      })
    },
    // 提交前处理
    submitCreateBefore() {
      this.model.accesses = (this.functions || []).filter(s => s.checked).map(f => {
        return { functionId: f.id, allow: f.checked ? 1 : 0 }
      })
      return true
    },
    submitCreateAfter() {
      // 清空部分数据
      this.model.name = null
    }
  }
}
</script>

<style lang="scss" scoped>
.function-level-1 {
  padding-left: 5px;
  background-color: #e8e8e8;

  + .function-level-2 {
    border-top: none
  }

  + .function-level-3 {
    padding-left: 30px;
  }
}

.function-level-2 {
  margin-left: 30px;
  border-top: dashed 1px #a0a0a0;

  + .function-level-3 {
    padding-left: 55px;
  }
}

.function-level-3 {
  display: inline-block;

  .item {
    padding-right: 20px;
  }
}

::deep .disabled-checkbox {
  cursor: not-allowed !important;
}

::deep .disabled-checkbox .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
  cursor: not-allowed !important;

  &::after {
    border-color: #FFF !important;
  }
}

::deep .disabled-checkbox .el-checkbox__input.is-disabled.is-checked + span.el-checkbox__label {
  color: #409EFF !important;
}

::deep .disabled-checkbox .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before {
  background-color: #FFF;
}
</style>

