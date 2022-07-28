<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <el-select v-if="user.roleType <=2" v-model="query.companyId" class="query-item" style="width: 150px" placeholder="所属企业" filterable clearable @change="value=>handleChangeCompany(value)" @clear="handleQuery">
          <el-option v-for="item in companies" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <el-select v-model="query.taskId" class="query-item" style="width: 150px" placeholder="任务" filterable clearable @change="value=>handleChangeTask(value)" @clear="handleQuery">
          <el-option v-for="item in tasks" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <!--<el-select v-model="query.imei" class="query-item" style="width: 150px" placeholder="浮标" filterable clearable @clear="handleQuery">-->
        <!--<el-option v-for="item in buoys" :key="item.key" :label="item.text" :value="item.key" />-->
        <!--</el-select>-->
        <!--GPS不正常的数据不显示-->
        <!--<el-select v-model="query.gpsStatus" class="query-item" style="width:120px" placeholder="gps状态" clearable @clear="handleQuery">-->
        <!--<el-option v-for="item in enums.gpsStatus" :key="item.key" :label="item.text" :value="item.key" />-->
        <!--</el-select>-->
        <el-date-picker v-model="query.time.begin" align="center" placeholder="时间(起始)" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="query-item" style="width: 200px" @change="handleChangeQueryDate" />
        <el-date-picker v-model="query.time.end" align="center" placeholder="时间(终止)" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="query-item" style="width: 200px" @change="handleChangeQueryDate" />
        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        <el-button v-if="curPermission.export" :loading="loading.export" class="tool tool-query" type="success" icon="vue-icon-excel" @click="handleExportCsv">导出</el-button>
      </div>
      <div class="tool-group">
        <span v-for="item in buoys" :key="item.imei" class="query-buoy">
          <el-checkbox v-model="item.checked" :label="item.text" />
        </span>
      </div>
    </div>
    <el-table ref="listTable" v-loading="loading.table" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column label="序号" type="index" align="center" width="80" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="time" align="center" width="150" fixed show-overflow-tooltip />
      <el-table-column v-if="user.roleType<=2" label="所属企业" prop="companyName" align="left" width="200" show-overflow-tooltip />
      <el-table-column label="任务名称" prop="taskName" align="left" width="150" show-overflow-tooltip />
      <el-table-column label="浮标IMEI" prop="imei" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="浮标编号" prop="buoyCode" align="center" width="120" show-overflow-tooltip />
      <!--      <el-table-column label="gps状态" prop="gpsStatusText" align="center" width="70" show-overflow-tooltip />-->
      <el-table-column label="深度" prop="depth" align="center" width="60" show-overflow-tooltip />
      <el-table-column label="经度" prop="lonGcj" align="center" width="110" show-overflow-tooltip />
      <el-table-column label="纬度" prop="latGcj" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="速度" prop="velocity" align="center" width="80" show-overflow-tooltip />
      <el-table-column label="流向角度" prop="directionAng" align="center" width="90" show-overflow-tooltip />
      <el-table-column />
    </el-table>
    <pagination :hidden="page.total===0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adaptive from '@/directive/el-table'
import getDefaultListViewData from '@/utils/viewData/list'
import models from '@/models'
import crud from '@/utils/crud'
import { parseTime } from '@/utils'
import api from '@/api'

export default {
  name: 'HistoryData',
  components: {
    Pagination: () => import('@/components/Pagination')
  },
  directives: { adaptive },
  data() {
    const curModels = models.historyData
    const curApi = api.historyData
    const curPermission = this.$store.getters.access.historyData

    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        companies: [],
        tasks: [],
        buoys: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.clearAndInitQuery()
    if (this.user.roleType <= 2) {
      this.getCompanies()
    } else {
      this.getTasks(this.user.companyId)
    }
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    this.query.time.begin = parseTime(now)
    console.log(this.query.time.begin)
    now.setHours(24)
    this.query.time.end = parseTime(now)
    this.getDatas()
  },
  methods: {
    ...crud,
    // 根据登录用户角色获取企业列表
    getCompanies() {
      api.company.getSelectlist().then(response => {
        this.companies = response.data || []
      })
    },
    // 切换企业
    handleChangeCompany(companyId) {
      // 清空任务列表
      this.tasks = []
      // 清空任务查询条件
      this.query.taskId = null
      // 清空浮标列表、查询条件
      this.handleChangeTask(null)
      if (companyId != null) {
        this.getTasks(companyId)
      }
    },
    // 获取任务
    getTasks(companyId) {
      api.task.getSelectlist(companyId).then(response => {
        this.tasks = response.data || []
      })
    },
    // 切换任务
    handleChangeTask(taskId) {
      this.buoys = []
      this.query.imei = []
      if (taskId != null) {
        this.getBuoys(taskId)
      }
    },
    // 获取浮标
    getBuoys(taskId) {
      api.buoy.getSelectlistByTaskId(taskId).then(response => {
        if (response.data.length <= 0) return false
        this.buoys = response.data.map(m => {
          return { ...m, checked: true }
        })
      })
    },
    // 查询前置处理
    queryBefore() {
      this.query.imei = this.buoys.filter(f => f.checked).map(m => m.key)
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.query-buoy {
  display: inline-block;
  padding: 5px 0;
  margin: 0 12px 0 2px;
}
</style>
