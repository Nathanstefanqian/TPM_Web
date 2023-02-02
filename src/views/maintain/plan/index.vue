<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <el-input v-model.trim="query.deviceType" class="query-item" style="width: 120px" placeholder="设备型号" clearable @clear="handleQuery" />
        <el-input v-model.trim="query.maintainType" class="query-item" style="width: 120px" placeholder="点检类型" clearable @clear="handleQuery" />
        <el-button class="tool tool-query" type="primary" icon="el-icon-refresh" @click="clearAndInitQuery()">清除</el-button>
        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        <el-upload
          class="inline-block"
          action=""
          :http-request="uploadExcel"
          :headers="headers"
          :multiple="false"
          :on-change="uploadVideoProcess"
          :on-success="handleUploadSuccess"
          :show-file-list="false"
        >
          <el-button class="tool tool-create" icon="vue-icon-create" type="primary">导入计划</el-button>
        </el-upload>

        <a href="/excels/点检保养计划模板.xlsx">
          <el-button
            size="medium"
            class="tool tool-create"
          >下载模板</el-button>
        </a>
        <el-progress v-show="progressFlag" :percentage="loadProgress" />
        <!--        <el-button class="tool tool-create" type="primary" icon="vue-icon-create" @click="handleCreate">批量上传</el-button>-->
        <!--        <el-button   :loading="loading.deletes" class="tool tool-delete" type="danger" icon="vue-icon-delete" @click="handleDeletes">批量删除</el-button>-->
      </div>
    </div>
    <el-table ref="listTable" v-loading="loading.table" v-adaptive="{ bottomOffset: 55 }" height="200px" :data="datas" border fit highlight-current-row>
      <el-table-column type="selection" align="center" width="35" />
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ (page.current - 1) * page.size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备型号" prop="deviceType" align="center" show-overflow-tooltip />
      <el-table-column label="类型" prop="maintainType" align="center" width="120" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="{row}">
          <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="makeQRCode(row)">生成二维码</el-button>
          <el-tooltip transition="false" :hide-after="1000" class="item" content="项目内容" placement="top-end">
            <el-button type="primary" plain class="button-operate button-detail" size="mini" @click="handleDetail(row)"><i class="vue-icon-detail" /></el-button>
          </el-tooltip>
          <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">
            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="page.total===0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="getDatas" />
    <dialog-create ref="dialogCreate" />
    <dialog-detail ref="dialogDetail" />
    <dialog-q-r-code ref="dialogQRCode" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adaptive from '@/directive/el-table'
import getDefaultListViewData from '@/utils/viewData/list'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'
// import { insertExcel } from '@/api/equipmentManagement/modules/deviceFaultsStore'

export default {
  name: 'Plan',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DialogCreate: () => import('./create'),
    DialogUpdate: () => import('./update'),
    DialogDetail: () => import('./detail'),
    DialogQRCode: () => import('./makeQRCode'),
  },
  directives: { adaptive },
  data() {
    const curModels = models.maintian.plan
    const curApi = api.maintain.plan
    const curPermission = this.$store.getters.access.maintain.plan

    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        sort: { prop: 'deviceType', order: 'descending' },
        roleTypes: [],
        companies: [],
        departs: [],
        zhixis: [],
        factories: [],
        processDepts: [],
        persons: [],
        loadProgress: 0,
        progressFlag: false,
        headers: { token: null },
        message: null
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
    ...mapGetters(['enums', 'user', 'token'])
  },
  created() {
    this.clearAndInitQuery()
    this.getDatas()
    this.getRoleTypes()
    this.getDeparts()
    this.getZhixis()
    this.getFactories()
    this.getProcessDepts()
    this.getPersons()
    this.headers.token = this.token
    // console.log('token:', this.token)
  },
  methods: {
    ...crud,
    makeQRCode(row) {
      this.$refs.dialogQRCode.initDetail(row).then(() => { })
    },
    // 根据登录用户角色获取角色类型列表
    getRoleTypes() {
      api.system.role.getRoleTypes().then(response => {
        this.roleTypes = response.data || []
      }).catch(reject => {
      })
    },
    downloadTemplate() {
      this.$refs.downloadTemplate.dispatchEvent(new MouseEvent('click'))
    },
    // 根据登录用户角色获取企业列表
    getDeparts() {
      api.depart.getSelectlist().then(response => {
        this.departs = response.data || []
      }).catch(reject => {
      })
    },
    // 根据登录用户角色获取企业列表
    getPersons() {
      api.system.user.getSelectlist().then(response => {
        this.persons = response.data || []
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
    handleCreateOpen() {
      this.$refs.dialogCreate.showContent = false
      this.handleCreate()
    },
    getProcessDepts() {
      api.processDept.getSelectlist().then(response => {
        this.processDepts = response.data || []
      }).catch(reject => {
      })
    },
    handleUploadSuccess(res, file) {
      this.loading = false
      switch (res.code) {
        case 20000:
          this.message = res.message
          file.status === 'success'
          this.loading = true
          this.getDatas()
          break
        case 40000:
        case 40100:
        case 40103:
        case 50000:
          this.message = res.message
          break
        case 40400:
          this.message = '上传发生错误'
          break
      }

      this.$message.warning(
        this.message
      )
      this.progressFlag = false
    },
    uploadVideoProcess(file, fileList) {
      if (file.status === 'ready') {
        this.progressFlag = true // 显示进度条
        this.loadProgress = 0
        const interval = setInterval(() => {
          if (this.loadProgress >= 99) {
            clearInterval(interval)
            return
          }
          this.loadProgress += 1
        }, 20)
      }
      if (file.status === 'success') {
        this.progressFlag = false // 显示进度条
        this.loadProgress = 100
      }
    },
    // 上传excel
    uploadExcel(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      api.maintain.plan.addPlan(formData).then(response => {
        this.progressFlag = false
        console.log('导入成功')
        this.getDatas()
        // this.form.picUrl = process.env.VUE_APP_BASE_API + response.imgUrl
      }).catch(response => {
        this.progressFlag = false
        console.log('导入失败')
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

::deep .disabled-checkbox {
  cursor: not-allowed !important;
}

::deep .disabled-checkbox .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
  cursor: not-allowed !important;

  &::after {
    border-color: #FFF !important;
  }
}

::deep .disabled-checkbox .el-checkbox__input.is-disabled.is-checked + span.el-checkbox__label {
  color: #409EFF !important;
}

::deep .disabled-checkbox .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before {
  background-color: #FFF;
}

.inline-block {
  display: inline-block;
}
</style>
