<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <el-input v-model.trim="query.userName" class="query-item" style="width: 120px" placeholder="用户名" clearable @clear="handleQuery" />
        <el-select v-if="user.roleType <=2" v-model="query['role.type']" class="query-item" style="width:150px" placeholder="角色类型" clearable @clear="handleQuery">
          <el-option v-for="item in roleTypes" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <el-input v-if="user.roleType <=2" v-model.trim="query['company.name']" class="query-item" style="width: 150px" placeholder="所属企业" clearable @clear="handleQuery" />
        <el-input v-model.trim="query['user.name']" class="query-item" style="width: 120px" placeholder="姓名" clearable @clear="handleQuery" />
        <el-select v-model="query.state" class="query-item" style="width:120px" placeholder="用户状态" clearable @clear="handleQuery">
          <el-option v-for="item in enums.userState" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
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
      <el-table-column v-if="user.roleType<=2" label="所属部门" prop="dept.name" align="left" width="200" show-overflow-tooltip />
      <el-table-column label="角色" prop="role.name" align="left" width="200" show-overflow-tooltip />
      <el-table-column label="用户名" prop="userName" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="姓名" prop="name" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="状态" prop="stateText" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="备注" prop="remark" align="left" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="180">
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
          <el-tooltip v-if="curPermission.resetPassword.allow" transition="false" :hide-after="1000" class="item" content="密码重置" placement="top-end">
            <el-button type="primary" plain class="button-operate" size="mini" @click="resetPasswordHandle(row)">密码重置</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="page.total===0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />
    <dialog-create v-if="curPermission.create.allow" ref="dialogCreate" />
    <dialog-update v-if="curPermission.update.allow" ref="dialogUpdate" />
    <dialog-detail v-if="curPermission.detail.allow" ref="dialogDetail" />
    <dialog-resetPassword v-if="curPermission.resetPassword.allow" ref="dialogResetPassword" />
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
  name: 'User',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DialogCreate: () => import('./create'),
    DialogUpdate: () => import('./update'),
    DialogDetail: () => import('./detail'),
    DialogResetPassword: () => import('./resetPassword')
  },
  directives: { adaptive },
  data() {
    const curModels = models.system.user
    const curApi = api.system.user
    const curPermission = this.$store.getters.access.system.user
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        sort: { prop: 'role.type', order: 'ascending' },
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
    this.getRoleTypes()
    if (this.user.roleType <= 2) this.getCompanies()
  },
  methods: {
    ...crud,
    // 根据登录用户角色获取角色类型列表
    getRoleTypes() {
      api.system.role.getRoleTypes().then(response => {
        this.roleTypes = response.data || []
      }).catch(reject => {
      })
    },
    // 根据登录用户角色获取企业列表
    getCompanies() {
      api.company.getSelectlist().then(response => {
        this.companies = response.data || []
      }).catch(reject => {
      })
    },
    // 打开密码重置窗口
    resetPasswordHandle(row) {
      this.$refs.dialogResetPassword.init(row)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
