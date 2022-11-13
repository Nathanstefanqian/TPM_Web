<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <!--        <el-input v-model.trim="query.name" class="query-item" style="width: 120px" placeholder="角色名" clearable @clear="handleQuery" />-->
        <!--        <el-input v-model.trim="query.name" class="query-item" style="width: 260px" placeholder="请输入点检操作编号/或扫码获取" clearable @clear="handleQuery" />-->
        <!--        <el-button class="tool tool-query" type="primary" icon="el-icon-refresh" @click="clearAndInitQuery()">清除</el-button>-->
        <!--        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQueryDay">日点检</el-button>-->
        <!--        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQueryMonth">月点检</el-button>-->
        <!--        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQueryWeek">周点检</el-button>-->
        <!--        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQueryApply">设备报修点检</el-button>-->
        <el-radio-group v-model="rdInterval" @change="handleQueryInterval">
          <el-radio-button label="日">日点检</el-radio-button>
          <el-radio-button label="周">周保养</el-radio-button>
          <el-radio-button label="月">月保养</el-radio-button>
          <el-radio-button label="半年"> 半年保养</el-radio-button>
          <el-radio-button label="年">年保养</el-radio-button>
          <el-radio-button label="报修">设备报修点检</el-radio-button>
        </el-radio-group>
        <!--        <el-button   :loading="loading.deletes" class="tool tool-delete" type="danger" icon="vue-icon-delete" @click="handleDeletes">批量删除</el-button>-->
      </div>
    </div>
    <el-scrollbar style="height: 90%">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap">
        <div v-for="(o, index) in datas" :key="o.productCode" :span="8" :offset="indexdr > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '10px' }">
            <!--          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
            <div style="padding: 14px; background: #20a0ff">
              <span style="color: #ffffff">{{ o.deviceNo }}</span>
              <div class="bottom clearfix">
                <!--              <time class="time">{{ currentDate }}</time>-->
                <el-button type="text" class="button" @click="checkDevice(o)">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-scrollbar>
    <!--    点检操作窗口-->
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
          <el-table-column label="点检内容" prop="content" align="left" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" align="center" width="500px">
            <template slot-scope="{row}">
              <el-button v-if="row.isBind === '1' && row.scan !== 'true'" type="primary" @click="handleScan(row)">扫码</el-button>
              <div v-if="row.isBind === '0' || row.scan === 'true'">
                <el-input v-if="row.isDigit === '1'" v-model.trim="row.inputData" class="query-item" style="width: 120px" placeholder="请输入数据" clearable @clear="handleQuery" />
                <el-button v-if="row.isDigit === '1'" :type="primary" @click="handleOK(row)">确定</el-button>

                <el-button v-if="row.isDigit !== '1'" :type="getOkType(row)" @click="handleOK(row)">OK</el-button>
                <el-button v-if="row.isDigit !== '1'" :type="getNGType(row)" @click="handleNG(row)">NG</el-button>
                <!--                <el-button v-if="row.isDigit === '1'" :type="getWXType(row)" @click="handleWX(row)">维修中</el-button>-->
                <el-input v-model.trim="row.memo" class="query-item" style="width: 120px" placeholder="备注" clearable @clear="handleQuery" />
              </div>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdate">提交</el-button>
        <!--        <el-button @click="resetUpdate">重置aaa</el-button>-->
        <el-button @click="checkDeviceVisible = false">取消</el-button>
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
    // Pagination: () => import('@/components/Pagination'),
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
        dialogTitle: '',
        currentRow: null,
        scan: false,
        description: '',
        randomKey: Math.random(),
        tableHeight: null
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
      queryinfo: ''
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
    handleQueryInterval() {
      // this.checkDeviceVisible = true
      this.query.maintainType = this.rdInterval
      this.handleQuery()
    },
    refreshTable() {
      this.randomKey = Math.random()
    },
    checkDevice(o) {
      this.dialogTitle = o.deviceNo + this.rdInterval + '保养'
      // this.checkDeviceVisible = true
      this.checkDeviceVisible = true
      this.description = o.description
      console.log(this.description)
      this.getContentDatas(o)
    },
    getOkType(row) {
      return row.result === 'O' ? 'success' : 'primary'
    },
    getNGType(row) {
      return row.result === 'X' ? 'danger' : 'primary'
    },
    getWXType(row) {
      return row.result === 'V' ? 'warning' : 'primary'
    },
    handleOK(row) {
      row.result = 'O'
    },
    handleNG(row) {
      row.result = 'X'
      this.currentRow = row
      this.$prompt('请输入情况说明', 'NG说明', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        row.memo = value
        this.refreshTable()
        this.$message({
          type: 'success',
          message: '提交成功: ' + value
        })
      }).catch(() => {
        row.result = ''
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    handleWX(row) {
      row.result = 'V'
    },
    handleScan(row) {
      this.currentRow = row
      this.$confirm('设备扫码中', '扫码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.currentRow.scan = 'true'
        row.scan = 'true'
        this.refreshTable()
        this.$message({
          type: 'success',
          message: '扫码成功: '
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    getContentDatas(item) {
      const cpage = { current: 1, size: 100 }
      const csort = this.contentSort
      const cquery = { maintianId: item.id }
      api.maintain.operateContent.getList(cquery, cpage, csort).then(response => {
        this.contentDatas = response.data.items
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
    // getDeparts() {
    //   api.depart.getSelectlist().then(response => {
    //     this.departs = response.data || []
    //   }).catch(reject => {
    //   })
    // },
    // // 根据登录用户角色获取企业列表
    // getZhixis() {
    //   api.zhixi.getSelectlist().then(response => {
    //     this.zhixis = response.data || []
    //   }).catch(reject => {
    //   })
    // },
    // // 根据登录用户角色获取企业列表
    // getFactories() {
    //   api.factory.getSelectlist().then(response => {
    //     this.factories = response.data || []
    //   }).catch(reject => {
    //   })
    // },
    // getProcessDepts() {
    //   api.processDept.getSelectlist().then(response => {
    //     this.processDepts = response.data || []
    //   }).catch(reject => {
    //   })
    // }
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
