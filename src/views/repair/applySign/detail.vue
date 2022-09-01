<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :model="model" :label-width="labelWidth||'120px'">
      <el-row v-if="user.rolType<=2">
        <el-col>
          <el-form-item label="角色类型" prop="type">
            {{ model.typeText }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="model.type>=3&&user.rolType<=2">
        <el-col>
          <el-form-item label="所属企业">
            {{ model.companyName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="角色名称">
            {{ model.name }}
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
      <el-row>
        <el-col>
          <el-form-item label="权限配置">
            <div v-for="(func,index) in functions" :key="index" :class="`function-level-${func.level}`">
              <span class="item"><el-checkbox v-model="func.checked" :indeterminate="func.indeterminate" :label="func.id" class="disabled-checkbox" disabled>{{ func.title }}</el-checkbox></span>
            </div>
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
    const curModels = models.system.role
    const curApi = api.system.role
    return {
      ...getDefaultDetailViewData(), ...curModels, curApi,
      ...{
        dialogTitle: '角色权限信息',
        model: curModels.detail,
        functions: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    // 初始化数据之后 row：行绑定数据；data：接口返回数据
    async initDetailAfter(row, data) {
      this.model = data.role
      const accesses = data.accesses
      await this.getFunctions(this.model.type)
      this.initAccess(accesses)
    },
    // 获取当前用户权限的所有系统功能
    getFunctions(roleType) {
      this.loading = true
      return api.system.role.getFunctionsFromAccess(roleType).then(response => {
        this.functions = response.data
        this.loading = false
      }).catch(reject => {
        this.loading = false
      })
    },
    // 权限选中以及级联选中初始化
    initAccess(accesses) {
      const functions = this.functions
      const functionsClone = Object.assign([], functions)
      functionsClone.sort((a, b) => b.level - a.level)
      functionsClone.forEach(t => {
        const current = functions.find(f => f.id === t.id)
        const checked = accesses.includes(current.id)
        if (checked) {
          const children = functions.filter(f => f.parentId === current.id)
          const childrenCount = children.length
          if (childrenCount === 0) {
            current.checked = true
            current.indeterminate = false
          } else {
            const childrenCheckedCount = children.filter(f => f.checked).length
            const childrenIndeterminateCount = children.filter(f => f.indeterminate).length
            current.checked = childrenCheckedCount > 0
            current.indeterminate = childrenIndeterminateCount > 0 || (childrenCheckedCount > 0 && childrenCheckedCount < childrenCount)
          }
        }
      })
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

/deep/ .disabled-checkbox {
  cursor: not-allowed !important;
}

/deep/ .disabled-checkbox .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
  cursor: not-allowed !important;

  &::after {
    border-color: #FFF !important;
  }
}

/deep/ .disabled-checkbox .el-checkbox__input.is-disabled.is-checked + span.el-checkbox__label {
  color: #409EFF !important;
}

/deep/ .disabled-checkbox .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before {
  background-color: #FFF;
}
</style>
