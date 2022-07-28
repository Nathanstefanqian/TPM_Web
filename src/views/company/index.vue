<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <el-input v-model.trim="query.name" class="query-item" style="width: 200px" placeholder="企业名称" clearable @clear="handleQuery" />
        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        <el-button v-if="curPermission.create.allow" class="tool tool-create" type="primary" icon="vue-icon-create" @click="handleCreate">添加</el-button>
        <el-button v-if="curPermission.delete.allow" :loading="loading.deletes" class="tool tool-delete" type="danger" icon="vue-icon-delete" @click="handleDeletes">批量删除</el-button>
      </div>
    </div>
    <el-table ref="listTable" v-loading="loading.table" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="企业名称" prop="name" :sort-orders="sortOrders" sortable="custom" sor align="left" width="250" show-overflow-tooltip />
      <el-table-column label="备注" prop="remark" :sort-orders="sortOrders" align="left" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="{row}">
          <el-tooltip v-if="curPermission.update.allow" transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">
            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>
          </el-tooltip>
          <el-tooltip v-if="curPermission.delete.allow" transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">
            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>
          </el-tooltip>
          <el-tooltip v-if="curPermission.detail.allow" transition="false" :hide-after="1000" class="item" content="详情" placement="top-end">
            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="page.total===0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />
    <dialog-create v-if="curPermission.create.allow" ref="dialogCreate" />
    <dialog-update v-if="curPermission.update.allow" ref="dialogUpdate" />
    <dialog-detail v-if="curPermission.detail.allow" ref="dialogDetail" />
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
  name: 'Company',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DialogCreate: () => import('./create'),
    DialogUpdate: () => import('./update'),
    DialogDetail: () => import('./detail')
  },
  directives: { adaptive },
  data() {
    const curModels = models.company
    const curApi = api.company
    const curPermission = this.$store.getters.access.company
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        sort: { prop: 'name', order: 'ascending' }
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
    ...crud
  }
}
</script>

<style lang="scss" scoped>
</style>
