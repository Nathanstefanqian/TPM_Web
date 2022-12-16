<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <el-radio-group v-model="rdInterval" @change="handleQueryInterval">
          <el-radio-button label="日">日点检</el-radio-button>
          <el-radio-button label="周">周点检</el-radio-button>
          <el-radio-button label="月">月点检</el-radio-button>
          <el-radio-button label="半年">半年点检</el-radio-button>
          <el-radio-button label="年">年点检</el-radio-button>
          <el-radio-button label="设备报修">设备报修点检</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-scrollbar style="height: 70%">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap">
        <div v-for="o in datas" :key="o.id" :span="8">
          <el-card :body-style="{ padding: '10px' }">
            <!--            <div style="padding: 14px; background: #20a0ff">-->
            <div style="padding: 14px" :class="o.status === '2' ? 'blue' : 'yellow'">
              <span style="color: #ffffff">{{ o.deviceNo }}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="checkDevice(o)">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-scrollbar>
    <pagination
      :hidden="page.total===0"
      :total="page.total"
      :page.sync="page.current"
      :limit.sync="page.size"
      @pagination="getDatas"
    />
    <!--  点检操作弹窗  -->
    <el-dialog
      :custom-class="'dialog-fullscreen dialog-update'"
      :title="dialogTitle"
      :visible.sync="checkDeviceVisible"
      :modal="false"
      :modal-append-to-body="false"
    >
      <div class="app-container list">
        <div><span style="color: #dd1100">{{ description }}</span></div>
        <el-table
          :key="randomKey"
          ref="listTable"
          v-loading="loading.table"
          v-adaptive="{ bottomOffset: 55 }"
          :height="tableHeight"
          :data="contentDatas"
          :default-sort="contentSort"
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
          <el-table-column label="点检内容" prop="content" align="left" show-overflow-tooltip width="350" />
          <el-table-column label="状态" prop="result" align="center" :formatter="formatterType" show-overflow-tooltip />
          <el-table-column label="扫码/填写数据" align="center">
            <template slot-scope="{row}">
              <el-button
                v-if="row.isBind === '1' && row.scan !== true"
                type="primary"
                style="width: 120px"
                @click="handleScan(row)"
              >点击扫码
              </el-button>
              <el-input
                v-if="(row.isDigit === '1' && (row.isBind !== '1' || (row.isBind === '1' && row.scan === true)))"
                v-model.trim="row.inputData"
                class="query-item"
                style="width: 120px"
                placeholder="请输入数据"
                clearable
                @clear="handleQuery"
              />
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作">
            <template v-if="row.isBind !== '1' || (row.isBind === '1' && row.scan === true)" slot-scope="{row}">
              <el-button type="success" :disabled="row.result==='V'" @click="handleOK(row)">OK</el-button>
              <el-button type="danger" @click="handleNG(row)">NG</el-button>
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

    <!--  QR扫码弹窗  -->
    <el-dialog title="扫码" :visible.sync="dialogQRVisible">
      <div>
        <p className="error">{{ error }}</p>

        <p className="decode-result">Last result: <b>{{ result }}</b></p>

        <qrcode-stream @decode="onDecode" @init="onInit" />
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
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'Role',
  components: {
    Pagination: () => import('@/components/Pagination'),
    QrcodeStream
    // DialogCreate: () => import('./create'),
    // DialogUpdate: () => import('./update'),
    // DialogDetail: () => import('./detail'),
    // DialogCheckDevice: () => import('./checkDevice')
  },
  directives: { adaptive },
  data() {
    const curModels = models.maintian.operate
    const curApi = api.maintain.operate
    const curPermission = this.$store.getters.access.maintain.plan
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        sort: { prop: 'deviceNo', order: 'ascending' },
        contentSort: { prop: 'sort', order: 'ascending' },
        datas: [],
        contentDatas: [],
        roleTypes: [],
        companies: [],
        departs: [],
        zhixis: [],
        factories: [],
        processDepts: [],
        checkDeviceVisible: false,
        dialogNGVisible: false,
        dialogQRVisible: false,
        dialogTitle: '',
        currentRow: null,
        scan: false,
        description: '',
        randomKey: Math.random(),
        tableHeight: null,
        beizhu: '',
        spanColor: 'yellow'
      },
      rdInterval: '日',
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
      result: '', // 扫码
      error: '' // 扫码
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.clearAndInitQuery()
    this.query.deptId = this.user.deptId
    this.query.maintainType = this.rdInterval
    this.getDatas()
    // this.getRoleTypes()
    // this.getDeparts()
    // this.getZhixis()
    // this.getFactories()
    // this.getProcessDepts()
  },
  mounted() {
    // 延迟获取页面高度, 确保能正确返回
    this.tableHeight = document.body.offsetHeight - 100 + 'px'
  },
  methods: {
    ...crud,
    // change日/周/月/年点检
    handleQueryInterval() {
      this.query.maintainType = this.rdInterval
      this.handleQuery()
    },
    refreshTable() {
      this.randomKey = Math.random()
    },
    // 点击操作按钮
    checkDevice(o) {
      this.dialogTitle = o.deviceNo + this.rdInterval + '保养'
      this.checkDeviceVisible = true
      this.description = o.description
      this.getContentDatas(o.id)
    },
    // 获取点检内容
    getContentDatas(id) {
      const cpage = { current: 1, size: 100 }
      const csort = this.contentSort
      // const cquery = { maintianId: id }
      const cquery = { maintainId: id }
      api.maintain.operateContent.getList(cquery, cpage, csort).then(res => {
        this.contentDatas = res.data.items
      })
    },
    // 判断是否待点检
    formatterType(rows, column) {
      return rows.result === null || rows.result === '' ? '待检查' : rows.result
    },
    // 点击扫码
    handleScan(row) {
      this.currentRow = row
      this.dialogQRVisible = true
      // this.$confirm('设备扫码中', '扫码', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消'
      // }).then(({ value }) => {
      //   this.currentRow.scan = true
      //   row.scan = true
      //   this.refreshTable()
      //   this.$message({
      //     type: 'success',
      //     message: '扫码成功'
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '取消'
      //   })
      // })
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
        api.maintain.operate.updateResult(data).then(res => {
          // 刷新数据
          this.getContentDatas(row.maintainId)
          // 刷新父窗口
          this.getDatas()
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
      api.maintain.operate.updateResult(data).then(res => {
        // 刷新数据
        this.getContentDatas(this.currentRow.maintainId)
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        // 刷新父窗口
        this.getDatas()
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
      api.maintain.operate.updateResult(data).then(res => {
        // 刷新数据
        this.getContentDatas(this.currentRow.maintainId)
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        // 刷新父窗口
        this.getDatas()
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
    },
    // QR扫码相关
    onDecode(result) {
      this.result = result
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        } else if (error.name === 'InsecureContextError') {
          this.error = `ERROR: Camera access is only permitted in secure context.
          Use HTTPS or localhost rather than HTTP.`
        } else {
          this.error = `ERROR: Camera error (${error.name})`
        }
      }
    }
    // QR扫码相关

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

.yellow {
  background-color: #EABA72;
}

.blue {
  background-color: #20a0ff;
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

/deep/ .cell el-tooltip {
  width: 300px;
}
</style>
