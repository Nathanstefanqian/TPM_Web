<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <el-input v-model.trim="query.deviceModel" class="query-item" style="width: 120px" placeholder="设备型号" clearable
          @clear="handleQuery" />
        <el-input v-model.trim="query.alarmNumber" class="query-item" style="width: 120px" placeholder="报警号" clearable
          @clear="handleQuery" />
        <el-button class="tool tool-query" type="primary" icon="el-icon-refresh" @click="clearAndInitQuery()">清除
        </el-button>
        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        <el-button class="tool tool-query" type="primary" icon="el-icon-download" @click="handleDown">下载模板</el-button>
        <a v-show="false" id="downfile" download href="http://localhost:8889/api/v1/deviceFaultsStore/download">下载模板</a>
        <el-upload :show-file-list="false" style="display: inline-block" class="upload-demo" ref="upload"
          action="http://localhost:8889/api/v1/deviceFaultsStore/insert" :limit="1" accept=".xls,.xlsx,.csv"
          :on-exceed="handleExceed" :on-success="handleSuccess">
          <el-button class="tool tool-query" type="primary" icon="el-icon-upload">上传</el-button>
        </el-upload>
      </div>
    </div>
    <el-table ref="listTable" v-loading="loading.table" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas"
      :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="40" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备型号" prop="deviceModel" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="控制器" prop="controller" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="报警号" prop="alarmNumber" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="报警信息" prop="alarmMessage" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="报警信息说明" prop="descriptionOfAlarm" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="维修方法" prop="repairMethod" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="维修记录" prop="repairRecord" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="故障判定" prop="faultJudge" align="center" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="{row}">
          <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">
            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)">
              <i class="vue-icon-delete" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="page.total === 0" :total="page.total" :page.sync="page.current" :limit.sync="page.size"
      @pagination="getDatas" />
  </div>
</template>
<script type="text/javascript" src="./js/xlsx.core.min.js"></script>
<script>
import { mapGetters } from 'vuex'
import adaptive from '@/directive/el-table'
import getDefaultListViewData from '@/utils/viewData/list'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'
import XLSX from 'xlsx'
export default {
  name: 'Role',
  components: {
    Pagination: () => import('@/components/Pagination'),
  },
  directives: { adaptive },
  data() {
    const curModels = models.equipmentManagement.deviceFaultsStore
    const curApi = api.equipmentManagement.deviceFaultsStore
    const curPermission = this.$store.getters.access.equipmentManagement.deviceFaultsStore
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        page: { total: 0, current: 1, size: 10 },
        sort: { prop: 'serialNumber', order: 'descending' },
      },
      datas:[]
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
    handleSuccess(){
      this.getDatas()
    },
     handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    handleDown(){
     let downfile=document.querySelector('#downfile')
     downfile.click()
    },
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
