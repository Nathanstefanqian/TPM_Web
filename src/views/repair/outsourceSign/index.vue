<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <!--        <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="角色名" clearable @clear="handleQuery" />-->
        <!--        <el-select v-model="query.deptId" class="query-item" style="width: 150px" placeholder="查询单位" clearable @clear="handleQuery">-->
        <!--          <el-option v-for="item in departs" :key="item.key" :label="item.text" :value="item.key" />-->
        <!--        </el-select>-->
        <el-input
          v-model="applyCode"
          class="query-item"
          style="width: 120px"
          placeholder="报修单号"
          clearable
          @clear="handleQuery"
        />
        <el-input
          v-model="productCode"
          class="query-item"
          style="width: 120px"
          placeholder="制造编号"
          clearable
          @clear="handleQuery"
        />

        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="开始日期"
          clearable
          @clear="handleQuery"
        />
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="结束日期"
          clearable
          @clear="handleQuery"
        />

        <el-button class="tool tool-query" type="primary" icon="el-icon-refresh" @click="clearAndInitQuery()">清除</el-button>
        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="searchlist">查询</el-button>
        <!--        <el-button class="tool tool-create" type="danger" icon="vue-icon-create" @click="handleCreate">报修申请</el-button>-->
      </div>
    </div>
    <el-table
      ref="listTable"
      v-loading="loading.table"
      v-adaptive="{ bottomOffset: 55 }"
      height="200px"
      :data="datas"
      :default-sort="sort"
      border
      fit
      highlight-current-row
      @sort-change="handleSort"
    >
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报修单号" prop="eqRepairApply.repairNum" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="制造编号" prop="eqRepairApply.productCode" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="设备类型" prop="eqRepairApply.deviceType" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="资产编号" prop="eqRepairApply.propertyCode" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="所属单位" prop="eqRepairApply.deptName" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="报修人员" prop="outDept" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="报修日期" prop="createTime" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="报修日期" prop="createTime" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="维修状态" prop="status" align="center" width="120" show-overflow-tooltip />
      <el-table-column show-overflow-tooltip />
      <el-table-column fixed="right" label="签核" align="center" width="180">
        <template slot-scope="{row}">
          <!--          <el-tooltip v-if="curPermission.update.allow" transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>-->
          <!--          </el-tooltip>-->
          <el-tooltip transition="false" :hide-after="1000" class="item" content="签核" placement="top-end">
            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)">
              <i class="vue-icon-update" /></el-button>
          </el-tooltip>
          <el-tooltip transition="false" :hide-after="1000" class="item" content="维修" placement="top-end">
            <el-button type="primary" plain class="button-operate button-create" size="mini" @click="handleUpdate2(row)">
              <i class="vue-icon-create" /></el-button>
          </el-tooltip>
          <!--          <el-tooltip transition="false" :hide-after="1000" class="item" content="详情" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>-->
          <!--          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :hidden="page.total === 0"
      :total="page.total"
      :page.sync="page.current"
      :limit.sync="page.size"
      @pagination="getDatas"
    />
    <dialog-create ref="dialogCreate" />
    <dialog-update ref="dialogUpdate" />
    <dialog-update2 ref="dialogUpdate2" />
    <dialog-detail ref="dialogDetail" />
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
  name: 'RepairApply',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DialogCreate: () => import('./create'),
    DialogUpdate: () => import('./update'),
    DialogUpdate2: () => import('./update2'),
    DialogDetail: () => import('./detail')
  },
  directives: { adaptive },
  data() {
    const curModels = models.repair.outsource
    const curApi = api.repair.outsource
    const curPermission = this.$store.getters.access.repair.outsource
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        page: { total: 0, current: 1, size: 10 },
        sort: { prop: 'repairTime', order: 'descending' },
        roleTypes: [],
        companies: [],
        departs: [],
        zhixis: [],
        factories: [],
        processDepts: [],
        sections: []
      },
      queryInfos: [{
        key: '1',
        text: '设备基本信息'
      }, {
        key: '2',
        text: '设备精度'
      }, {
        key: '3',
        text: '设备履历'
      }],
      queryinfo: '',
      applyCode: null,
      productCode: null,
      startTime: null,
      endTime: null
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    console.log(this.model)
    this.clearAndInitQuery()
    this.query.outsource = '1'
    this.query.flowId = '3'
    this.query.deptId = this.user.deptId
    this.query.myRoleId = this.user.roleId
    this.query.myUserId = this.user.userId
    console.log('roleid：' + this.user.roleId)
    console.log('userid：' + this.user.userId)
    this.getDatas()
    // this.getRoleTypes()
    // this.getDeparts()
    // this.getZhixis()
    // this.getFactories()
    // this.getProcessDepts()
    // this.getSections()
  },
  methods: {
    async searchlist() {
      const data = {
        applyCode: this.applyCode,
        productCode: this.productCode,
        startTime: this.startTime,
        endTime: this.endTime,
        page: {
          current: 1,
          size: 10
        }
      }
      this.curApi.query(data).then(response => {

      })
    },
    handleUpdate2(row) {
      this.$refs.dialogUpdate2.initUpdate(row).then(() => {
      })
    },
    ...crud,
    // 根据登录用户角色获取角色类型列表
    getRoleTypes() {
      api.system.role.getRoleTypes().then(response => {
        this.roleTypes = response.data || []
      }).catch(reject => {
      })
    },
    // 根据登录用户角色获取企业列表
    getDeparts() {
      api.depart.getSelectlist().then(response => {
        this.departs = response.data || []
      }).catch(reject => {
      })
    },
    getSections() {
      api.section.getSelectlist().then(response => {
        this.sections = response.data || []
      }).catch(reject => {
      })
    },
    // 根据登录用户角色获取企业列表
    getZhixis() {
      api.zhixi.getSelectlist().then(response => {
        this.zhixis = response.data || []
      }).catch(reject => {
      })
    },
    // 根据登录用户角色获取企业列表
    getFactories() {
      api.factory.getSelectlist().then(response => {
        this.factories = response.data || []
      }).catch(reject => {
      })
    },
    getProcessDepts() {
      api.processDept.getSelectlist().then(response => {
        this.processDepts = response.data || []
      }).catch(reject => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.function-level-1 {
  padding-left: 5px;
  background-color: #e8e8e8;

  +.function-level-2 {
    border-top: none
  }
}

.function-level-2 {
  margin-left: 30px;
  border-top: dashed 1px #a0a0a0;

  +.function-level-3 {
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

/deep/ .disabled-checkbox .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
  color: #409EFF !important;
}

/deep/ .disabled-checkbox .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before {
  background-color: #FFF;
}
</style>
