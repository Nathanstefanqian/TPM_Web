<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="流程名称" clearable @clear="handleQuery" />

        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        <el-button class="tool tool-create" type="primary" icon="vue-icon-create" @click="handleCreate">添加</el-button>
      </div>
    </div>
    <el-table ref="listTable" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas" border fit highlight-current-row>
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流程名称" prop="name" align="center" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="{row}">
          <!--          <el-tooltip transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>-->
          <!--          </el-tooltip>-->
          <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">
            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="page.total===0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />
    <dialog-update ref="dialogUpdate" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adaptive from '@/directive/el-table'
import getDefaultListViewData from '@/utils/viewData/list'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  name: 'WorkFlow',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DialogUpdate: () => import('./update')
  },
  directives: { adaptive },
  data() {
    const curModels = models.system.workFlow
    const curApi = api.system.workFlow
    const curPermission = this.$store.getters.access.repair.apply
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        sort: { prop: 'id', order: 'ascending' },
        roleTypes: [],
        companies: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.clearAndInitQuery()
    this.getDatas()
  },
  methods: {
    ...crud,
    // 根据登录用户角色获取角色类型列表
    getRoleTypes() {
      api.system.role.getRoleTypes().then(response => {
        this.roleTypes = response.data || []
      }).catch(reject => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
