<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-table ref="listTable" v-loading="loading.table" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点检保养内容" prop="deptName" align="left" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="280">
        <template slot-scope="{row}">
          <!--          <el-tooltip v-if="curPermission.update.allow" transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>-->
          <!--          </el-tooltip>-->
          <el-tooltip transition="false" :hide-after="1000" class="item" content="OK" placement="top-end">
            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>
          </el-tooltip>
          <el-tooltip transition="false" :hide-after="1000" class="item" content="NG" placement="top-end">
            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>
          </el-tooltip>
          <el-tooltip transition="false" :hide-after="1000" class="item" content="维修中" placement="top-end">
            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>
          </el-tooltip>
          <el-tooltip transition="false" :hide-after="1000" class="item" content="维修中" placement="top-end">
            <el-input v-model.trim="query.name" class="query-item" style="width:80px" placeholder="备注" clearable />
          </el-tooltip>
          <!--          <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">-->
          <!--            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>-->
          <!--          </el-tooltip>-->
          <!--          <el-tooltip transition="false" :hide-after="1000" class="item" content="详情" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>-->
          <!--          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="page.total===0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitUpdate">提交</el-button>
      <el-button @click="resetUpdate">重置aaa</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultUpdateViewData from '@/utils/viewData/update'
import getDefaultListViewData from '@/utils/viewData/list'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'
import adaptive from '@/directive/el-table'

export default {
  components: {
    Pagination: () => import('@/components/Pagination')
  },
  directives: { adaptive },
  data() {
    const curModels = models.system.user
    const curApi = api.system.user
    return {
      ...getDefaultUpdateViewData(), ...getDefaultListViewData, ...curModels, curApi, rules,
      ...{
        dialogTitle: '设备点检保养',
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
