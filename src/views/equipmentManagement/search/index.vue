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
        <!-- <el-button class="tool tool-create" type="primary" icon="vue-icon-create">批量上传</el-button> -->
        <el-upload
          class="inline-block"
          :action="uploadUrl"
          :headers="headers"
          :multiple="false"
          :on-change="uploadVideoProcess"
          :on-success="handleUploadSuccess"
          :show-file-list="false"
        >
          <el-button class="tool tool-create" icon="vue-icon-create" type="primary">批量上传</el-button>
        </el-upload>
        <!--        <el-link class="tool tool-query" @click="downloadfile()">下载模板</el-link>-->

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
      <el-table-column label="设备编号" prop="edeviceNo" align="left" width="200" show-overflow-tooltip />
      <el-table-column label="生产编号" prop="eproductCode" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="设备名称" prop="ename" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="品牌型号" prop="ebrand" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="制造日期" prop="eproductDate" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="验收日期" prop="eacceptanceDate" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="存放位置" prop="estorageArea" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="加工部" prop="eprocessDept" align="left" show-overflow-tooltip />
      <el-table-column label="使用状况" prop="statusName" align="center" width="120" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="{row}">
          <!--          <el-tooltip v-if="curPermission.update.allow" transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">-->
          <!--            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>-->
          <!--          </el-tooltip>-->
          <el-tooltip transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">
            <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>
          </el-tooltip>
          <!--          <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">-->
          <!--            <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="handleDelete(row)"><i class="vue-icon-delete" /></el-button>-->
          <!--          </el-tooltip>-->
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
    const curModels = models.equipmentManagement.search
    const curApi = api.equipmentManagement.search
    const curPermission = this.$store.getters.access.equipmentManagement.search
    return {
      ...getDefaultListViewData(), ...curModels, curApi, curPermission,
      ...{
        sort: { prop: 'id', order: 'ascending' },
        roleTypes: [],
        companies: [],
        departs: [],
        zhixis: [],
        factories: [],
        processDepts: [],
        headers: { token: null }
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
      uploadUrl: process.env.VUE_APP_BASE_API + '/equipment/addBatch'
    }
  },
  computed: {
    ...mapGetters(['enums', 'user','token'])
  },
  created() {
    this.clearAndInitQuery()
    this.getDatas()
    this.getRoleTypes()
    this.getDeparts()
    this.getZhixis()
    this.getFactories()
    this.getProcessDepts()
    this.headers.token = this.token
    console.log('token:', this.token)
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
    // downloadfile(){
    //   windows.open(url,'_self')
    // },
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
      this.$notify({
        title: '',
        dangerouslyUseHTMLString: true,
        message: this.message
      })
    },
    uploadVideoProcess(file, fileList) {
        if(file.status === 'ready'){
          this.progressFlag = true; // 显示进度条
          this.loadProgress = 0;
          const interval = setInterval(() => {
            if(this.loadProgress >=99){
              clearInterval(interval)
              return
            }
            this.loadProgress += 1
          }, 20);
        }
          if (file.status === 'success') {
            this.progressFlag = false; // 显示进度条
            this.loadProgress = 100;
          }
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

.inline-block {
  display: inline-block;
}
</style>
