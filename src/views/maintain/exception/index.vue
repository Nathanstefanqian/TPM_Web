<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <!--        <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="角色名" clearable @clear="handleQuery" />-->
        <el-select v-model="query.eDeptId" class="query-item" style="width: 150px" placeholder="查询单位" clearable @clear="handleQuery">
          <el-option v-for="item in departs" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="制造编号" clearable @clear="handleQuery" />
        <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="设备编码" clearable @clear="handleQuery" />
        <el-select v-model="queryinfo" class="query-item" style="width: 150px" placeholder="查询信息" clearable @clear="handleQuery">
          <el-option v-for="item in queryInfos" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <!--        <el-input v-if="user.roleType <=2" v-model.trim="query['company.name']" class="query-item" style="width: 150px" placeholder="所属企业" clearable @clear="handleQuery" />-->
        <!--        <el-input v-model.trim="query['company.name']" class="query-item" style="width: 150px" placeholder="所属企业" clearable @clear="handleQuery" />-->
      </div>
      <div class="tool-group">
        <!--        <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="角色名" clearable @clear="handleQuery" />-->
        <el-select v-model="query.eZhixi" class="query-item" style="width: 150px" placeholder="职系" clearable @clear="handleQuery">
          <el-option v-for="item in zhixis" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <el-select v-model="query.eFactory" class="query-item" style="width: 150px" placeholder="厂区" clearable @clear="handleQuery">
          <el-option v-for="item in factories" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <el-select v-model="query.eProcessDept" class="query-item" style="width: 150px" placeholder="加工部" clearable @clear="handleQuery">
          <el-option v-for="item in processDepts" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <el-button class="tool tool-query" type="primary" icon="el-icon-refresh" @click="clearAndInitQuery()">清除</el-button>
        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        <!--        <el-button   :loading="loading.deletes" class="tool tool-delete" type="danger" icon="vue-icon-delete" @click="handleDeletes">批量删除</el-button>-->
      </div>
    </div>
    <el-table ref="listTable" v-loading="loading.table" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" prop="deptName" align="left" show-overflow-tooltip />
      <el-table-column label="制造编号" prop="productCode" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-link type="primary" @click="maintainDetail(row)">{{ row.productCode }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="设备编号" prop="deviceNo" align="center" show-overflow-tooltip />
      <el-table-column label="机台型号" prop="deviceType" align="center" show-overflow-tooltip />
      <el-table-column label="点检周期" prop="maintainType" align="center" show-overflow-tooltip />
      <!--      <el-table-column label="机台状态" prop="status" align="center" show-overflow-tooltip />-->
      <el-table-column label="点检人" prop="maintainPersonName" align="center" show-overflow-tooltip />
      <el-table-column label="点检时间" prop="maintainTime" align="center" show-overflow-tooltip />
      <el-table-column label="计划日期" prop="planTime" align="center" show-overflow-tooltip />
      <!--      <el-table-column label="品牌型号" prop="ebrand" align="center" width="120" show-overflow-tooltip />-->
      <!--      <el-table-column label="制造日期" prop="eproductdate" align="center" width="120" show-overflow-tooltip />-->
      <!--      <el-table-column label="验收日期" prop="echeckdate" align="center" width="120" show-overflow-tooltip />-->
      <!--      <el-table-column label="职系" prop="zhixi" align="center" show-overflow-tooltip />-->
      <!--      <el-table-column label="加工部" prop="processDeptName" align="left" show-overflow-tooltip />-->
      <!--      <el-table-column label="厂区" prop="factory" align="left" show-overflow-tooltip />-->
      <!--      <el-table-column label="保养情况" prop="" align="center" show-overflow-tooltip />-->
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template slot-scope="{row}">
          <!--          <el-tooltip v-if="curPermission.update.allow" transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>-->
          <!--          </el-tooltip>-->
          <!--          <el-tooltip transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>-->
          <!--          </el-tooltip>-->
          <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">
            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>
          </el-tooltip>
          <!--          <el-tooltip transition="false" :hide-after="1000" class="item" content="详情" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>-->
          <!--          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="page.total===0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />
    <dialog-create ref="dialogCreate" />
    <dialog-update ref="dialogUpdate" />
    <dialog-detail ref="dialogDetail" />

    <!--  点击制造编号详情弹窗  -->
    <el-dialog
      :custom-class="'dialog-fullscreen dialog-update'"
      :title="dialogTitle"
      :visible.sync="maintainDialogVisible"
      :modal="false"
      :modal-append-to-body="false"
    >
      <div class="app-container list">
        <el-table
          :key="randomKey"
          ref="listTable"
          v-loading="loading.table"
          v-adaptive="{ bottomOffset: 55 }"
          :height="tableHeight"
          :data="contentDatas"
          border
          fit
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="35" />
          <el-table-column label="序号" type="index" align="center" width="65" fixed>
            <template slot-scope="scope">
              <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="点检内容" prop="content" align="left" show-overflow-tooltip width="300" />
          <el-table-column label="状态" prop="result" align="center" :formatter="formatterType" show-overflow-tooltip />
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button v-if="row.isBind === '1' && row.scan !== true" type="primary" style="width: 120px" @click="handleScan(row)">点击扫码</el-button>
              <el-input v-if="(row.isDigit === '1' && (row.isBind !== '1' || (row.isBind === '1' && row.scan === true)))" v-model.trim="row.inputData" class="query-item" style="width: 120px" placeholder="请输入数据" clearable @clear="handleQuery" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" width="260">
            <template v-if="row.isBind !== '1' || (row.isBind === '1' && row.scan === true)" slot-scope="{row}">
              <el-button type="success" :disabled="row.result==='V'" @click="handleOK(row)">OK</el-button>
              <el-button type="danger" @click="handleNG(row)">NG</el-button>
              <el-button type="primary" @click="sendEmail">发送提醒</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!--  点击NG弹窗  -->
    <el-dialog title="确认NG？" :visible.sync="dialogNGVisible">
      <span>请输入情况说明</span>
      <el-input v-model.trim="beizhu" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNGVisible = false; beizhu= ''">取消</el-button>
        <el-button type="warning" @click="clickRepairing">维修中</el-button>
        <el-button type="danger" @click="clickRepair">报修</el-button>
      </div>
    </el-dialog>
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
  name: 'Role',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DialogCreate: () => import('./create'),
    DialogUpdate: () => import('./update'),
    DialogDetail: () => import('./detail')
  },
  directives: { adaptive },
  data() {
    const curModels = models.maintian.projects
    const curApi = api.maintain.projects
    const curPermission = this.$store.getters.access.maintain.projects
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        sort: { prop: 'maintain_time', order: 'descending' },
        contentDatas: [],
        roleTypes: [],
        companies: [],
        departs: [],
        zhixis: [],
        factories: [],
        processDepts: [],
        maintainDialogVisible: false,
        dialogNGVisible: false,
        tableHeight: null,
        dialogTitle: '',
        randomKey: Math.random(),
        beizhu: '',
        currentRow: null
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
      queryinfo: ''
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.clearAndInitQuery()
    this.getDatas()
    this.getRoleTypes()
    this.getDeparts()
    this.getZhixis()
    this.getFactories()
    this.getProcessDepts()
  },
  mounted() {
    // 延迟获取页面高度, 确保能正确返回
    this.tableHeight = document.body.offsetHeight - 100 + 'px'
  },
  methods: {
    ...crud,
    formatterType(rows, column) {
      return rows.result === null || rows.result === '' ? '未点检' : rows.result
    },
    // 点击制造编号超链接
    maintainDetail(row) {
      this.dialogTitle = row.deviceNo + '保养'
      this.maintainDialogVisible = true
      // this.description = row.description
      console.log(row.maintainId)
      this.getContentDatas(row.maintainId)
    },
    // 获取点检异常内容
    getContentDatas(mId) {
      this.curApi.get(mId).then(res => {
        this.contentDatas = res.data
      })
    },
    // 发送提醒
    sendEmail() {

    },
    // 点击扫码
    handleScan(row) {
      this.currentRow = row
      this.$confirm('设备扫码中', '扫码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.currentRow.scan = true
        row.scan = true
        this.refreshTable()
        this.$message({
          type: 'success',
          message: '扫码成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    refreshTable() {
      this.randomKey = Math.random()
    },
    // 点击OK
    handleOK(row) {
      this.currentRow = row
      this.$prompt('备注', '确认点检状态正常？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        row.memo = value
        const data = {
          maintainId: row.maintainId,
          remark: row.memo,
          contentId: row.id,
          result: 'V',
          data: row.inputData
        }
        console.log(data)
        this.curApi.maintainModify(data).then(res => {
          console.log(res)
          // 刷新数据
          this.getContentDatas(row.maintainId)
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 点击NG
    handleNG(row) {
      this.dialogNGVisible = true
      this.currentRow = row
    },
    // 点击维修中按钮
    clickRepairing() {
      this.dialogNGVisible = false
      console.log(this.currentRow)
      const data = {
        maintainId: this.currentRow.maintainId,
        remark: this.beizhu,
        contentId: this.currentRow.id,
        result: 'O',
        data: this.currentRow.inputData
      }
      console.log(data)
      this.curApi.maintainModify(data).then(res => {
        // 刷新数据
        this.getContentDatas(this.currentRow.maintainId)
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      })
    },

    // 点击报修按钮
    clickRepair() {
      this.dialogNGVisible = false
      console.log(this.currentRow)
      const data = {
        maintainId: this.currentRow.maintainId,
        remark: this.beizhu,
        contentId: this.currentRow.id,
        result: 'X',
        data: this.currentRow.inputData
      }
      this.curApi.maintainModify(data).then(res => {
        // 刷新数据
        this.getContentDatas(this.currentRow.maintainId)
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      })
    },

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

  + .function-level-2 {
    border-top: none
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
