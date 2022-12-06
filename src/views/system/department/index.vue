<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <div class="tool-group">
          <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="部门名称" clearable
                    @clear="handleQuery"/>
          <el-select v-model.trim="query.status" class="query-item" style="width:150px" placeholder="部门状态" clearable
                     @clear="handleQuery">
            <el-option v-for="item in statusTypes" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <el-select v-model.trim="query.type" class="query-item" style="width:150px" placeholder="机构类型" clearable
                     @clear="handleQuery">
            <el-option v-for="item in optionTypes" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <el-select v-model.trim="query.parentId" class="query-item" style="width:150px" placeholder="所属部门" clearable
                     @clear="handleQuery">
            <el-option v-for="item in departs" :key="item.key" :label="item.text" :value="item.key" />
          </el-select>
          <el-select v-model.trim="query.personCode" class="query-item" style="width:150px" placeholder="负责人" clearable
                     @clear="handleQuery">
            <el-option v-for="item in users" :key="item.key" :label="item.text" :value="item.key" />
          </el-select>
          <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
          <el-button class="tool tool-create" type="primary" icon="vue-icon-create" @click="handleCreate">添加</el-button>
        </div>
      </div>
    </div>
    <el-table ref="listTable" v-loading="loading.table" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas"
              :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35"/>
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门代码" prop="deptCode" align="center" width="200" show-overflow-tooltip/>
      <el-table-column label="部门名称" prop="name" align="center" width="200" show-overflow-tooltip/>
      <el-table-column label="所属部门" prop="parentName" align="center" width="200" show-overflow-tooltip/>
      <el-table-column label="状态" prop="status" align="center" width="100" :formatter="formatterStatus"
                       show-overflow-tooltip/>
      <el-table-column label="类型" prop="type" align="center" width="100" :formatter="formatterType"
                       show-overflow-tooltip/>
      <el-table-column label="负责人" prop="personName" align="center" width="200" show-overflow-tooltip/>
      <el-table-column label="联系电话" prop="phone" width="100" show-overflow-tooltip/>
      <el-table-column label="描述" prop="des" align="left" show-overflow-tooltip/>
      <el-table-column fixed="right" label="操作" align="center" width="120">
        <template slot-scope="{row}">
          <el-tooltip transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">
            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)">
              <i class="vue-icon-update"/></el-button>
          </el-tooltip>
          <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">
            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)">
              <i class="vue-icon-delete"/></el-button>
          </el-tooltip>
          <el-tooltip transition="false" :hide-after="1000" class="item" content="详情" placement="top-end">
            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)">
              <i class="vue-icon-detail"/></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="page.total===0" :total="page.total" :page.sync="page.current" :limit.sync="page.size"
                @pagination="getDatas"/>
    <dialog-create ref="dialogCreate"/>
    <dialog-update ref="dialogUpdate"/>
    <dialog-detail ref="dialogDetail"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import adaptive from '@/directive/el-table'
import getDefaultListViewData from '@/utils/viewData/list'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  name: 'Department',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DialogCreate: () => import('./create'),
    DialogUpdate: () => import('./update'),
    DialogDetail: () => import('./detail')
  },
  directives: {adaptive},
  data() {
    const curModels = models.system.department
    const curApi = api.system.department
    const curPermission = this.$store.getters.access.system.department
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        sort: {prop: 'sort', order: 'ascending'},
        roleTypes: [],
        companies: [],
        statusTypes: [{value: '0', label: '正常'}, {value: '1', label: '停用'}],
        optionTypes: [{value: '0', label: '部门'}],
        departs: [],
        users: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.clearAndInitQuery()
    this.getDatas()
    this.getParentDeparts()
    this.getUsers()
    // this.getRoleTypes()
    // if (this.user.roleType <= 2) this.getCompanies()
  },
  methods: {
    ...crud,
    formatterStatus(rows) {
      return rows.status === '0' ? '正常' : (rows.status === '1' ? '停用' : null)
    },
    formatterType(rows) {
      return rows.type === '0' ? '部门' : null
    },
    // 获取父级部门列表
    getParentDeparts() {
      return api.system.department.getSelectParentList().then(response => {
        this.departs = response.data || []
      })
    },
    // 获取负责人列表
    getUsers() {
      return api.system.department.getSelectUserList().then(response => {
        this.users = response.data || []
      })
    }
    // // 根据登录用户角色获取角色类型列表
    // getRoleTypes() {
    //   api.system.role.getRoleTypes().then(response => {
    //     this.roleTypes = response.data || []
    //   }).catch(reject => {
    //   })
    // },
    // // 根据登录用户角色获取企业列表
    // getCompanies() {
    //   api.company.getSelectlist().then(response => {
    //     this.companies = response.data || []
    //   }).catch(reject => {
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
