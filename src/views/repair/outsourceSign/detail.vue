<template>
  <el-dialog
    v-loading="loading"
    :custom-class="'dialog-fullscreen dialog-' + dialogClass"
    :title="dialogTitle"
    :visible.sync="visible"
    :modal="false"
    :modal-append-to-body="false"
  >
    <el-form ref="form" label-position="right" :model="model" :label-width="labelWidth || '120px'">
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="报修单号">
            {{ model.repairNum }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属部门">
            {{ model.deptName }}
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属工段">
            {{ model.section }}
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造编号">
            {{ model.productCode }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备型号">
            {{ model.deviceType }}
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="资产编号">
            {{ model.propertyCode }}
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="报修时间">
            {{ model.repairTime }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="报修人">
            {{ model.applyPersonName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="报修内容">
            {{ model.content }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="签核状态">
            {{ model.checkStatusName }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import getDefaultDetailViewData from '@/utils/viewData/detail'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  data() {
    const curModels = models.repair.outsource
    const curApi = api.repair.outsource
    return {
      ...getDefaultDetailViewData(), ...curModels, curApi,
      ...{
        dialogTitle: '详情',
        model: curModels.detail,
        functions: [],
        applyList: [],
        eqRepairApplyList: [],
        len: 0

      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    getApplyList(id) {
      this.eqRepairApplyList = []
      this.curApi.getinfo().then(response => {
        this.applyList = response.data
        for (let i = 0; i < response.data.length; i++) {
          if (id === this.applyList[i].id) {
            this.eqRepairApplyList.push(this.applyList[i].eqRepairApply)
          }
        }
        console.log(this.eqRepairApplyList)
      })
    },

    getFlowDataList(id) {
      this.curApi.getFlowData(id).then(response => {
        this.flowDataList = response.data
        this.length = response.data.length
        // console.log(this.flowDataList)
      })
    },

    getOpLogList(id) {
      this.curApi.getOpLog(id).then(response => {
        this.opLogList = response.data
        // console.log(this.opLogList)
      })
    },

    // 初始化数据之前 row：行绑定数据
    async initDetailBefore(row) {
      this.getFlowDataList(row.repairApplyId)
      this.getOpLogList(row.repairApplyId)
      this.getApplyList(row.id)
      //
    },
    // 初始化数据之后 row：行绑定数据；data：接口返回数据
    initDetailAfter(row, data) {
      // console.log(data)
      this.model = data
      if (this.model.checkNextName === '维保主管审核') {
        this.appointPersonShow = true
      }
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

  +.function-level-3 {
    padding-left: 30px;
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
