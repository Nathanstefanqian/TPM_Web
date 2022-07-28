<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <el-input v-if="user.roleType <=2" v-model.trim="query.companyName" class="query-item" style="width: 150px" placeholder="所属企业" clearable @clear="handleQuery" />
        <el-button v-if="user.roleType <=2" class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        <span id="refresh-time">数据刷新时间：<span class="time" :style="{color: timeColor}">{{ refreshTime }}</span></span>
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
      <el-table-column label="浮标IMEI" prop="imei" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="浮标编号" prop="buoyCode" align="center" width="120" show-overflow-tooltip />
      <!--      <el-table-column label="gps状态" prop="gpsStatusText" align="center" width="70" show-overflow-tooltip />-->
      <el-table-column label="经度" prop="lonGcj" align="center" width="110" show-overflow-tooltip />
      <el-table-column label="纬度" prop="latGcj" align="center" width="100" show-overflow-tooltip />
      <el-table-column label="速度" prop="velocity" align="center" width="80" show-overflow-tooltip />
      <el-table-column label="流向角度" prop="directionAng" align="center" width="90" show-overflow-tooltip />
      <el-table-column label="灯状态" prop="ledStatusText" align="center" width="80" show-overflow-tooltip />
      <el-table-column label="上报间隔(秒)" prop="reportInterval" align="center" width="90" show-overflow-tooltip />
      <el-table-column label="灯闪间隔(秒)" prop="ledFlashInterval" align="center" width="90" show-overflow-tooltip />
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
import api from '@/api'
import { parseTime } from '@/utils'

export default {
  name: 'NoKeepAliveRealtimeData',
  components: {
    Pagination: () => import('@/components/Pagination')
  },
  directives: { adaptive },
  data() {
    const curModels = models.realtimeData
    const curApi = api.realtimeData
    const curPermission = this.$store.getters.access.realtimeData
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        page: { total: 0, current: 1, size: 1000 },
        refreshTime: null,
        timeColor: '#409EFF',
        interval: null
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.clearAndInitQuery()
    this.getDatas({ showLoading: false })
    this.polling()
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    ...crud,
    getDatasAfter() {
      this.refreshTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
      this.timeColor = '#F56C6C'
      setTimeout(() => {
        this.timeColor = '#409EFF'
      }, 500)
    },
    polling() {
      this.interval = setInterval(() => {
        this.getDatas({ showLoading: false })
      }, 4000)
    }
  }
}
</script>

<style lang="scss" scoped>
#refresh-time {
  display: inline-block;
  float: right;
  line-height: 46px;
  color: #555;
  font-size: 14px;

  .time {
    color: #409EFF;
    font-weight: bold;
  }
}
</style>
