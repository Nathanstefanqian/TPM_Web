<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-card>
      <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
        <div style="margin-left: 20px">
          <el-row>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="报修单号" prop="repairNum">
                <span>{{ this.eqRepairApplyList.repairNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="保修人员" prop="applyPersonName">
                <span>{{ this.eqRepairApplyList.applyPersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="所属工段" prop="applyDeptId">
                <span>{{ this.eqRepairApplyList.section }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="所属单位" prop="deptName">
                <span>{{ this.eqRepairApplyList.deptName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="制造编号" prop="productCode">
                <span>{{ this.eqRepairApplyList.productCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="制造日期" prop="productDate">
                <span>{{ this.eqRepairApplyList.productDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="设备编号" prop="deviceNum">
                <span>{{ this.eqRepairApplyList.deviceNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="设备型号" prop="deviceType">
                <span>{{ this.eqRepairApplyList.deviceType }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="资产编号" prop="propertyCode">
                <span>{{ this.eqRepairApplyList.propertyCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="报修等级" prop="level">
                <span>{{ this.eqRepairApplyList.level }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="报修类别" prop="category">
                <span>{{ this.eqRepairApplyList.category }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:300px">
              <el-form-item label="报修日期" prop="repairTime">
                <span>{{ this.eqRepairApplyList.repairTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
              <el-form-item label="报修内容" prop="content">
                <el-input
                  v-model="model.content"
                  type="textarea"
                  readonly="readonly"
                  :autosize="{ minRows: 2, maxRows: 4}"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="4" :lg="4" :md="10" :sm="12" :xs="24">
              <el-form-item label=" " prop="opDescription">
                <el-link>查看附件</el-link>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="appointPersonShow" style="margin-left: 20px;margin-top: 30px">
          <el-row>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="维修人员" prop="repairPerson">
                <el-select v-model="this.eqRepairApplyList.repairPersonId" class="query-item" style="width: 150px" placeholder="请选择" clearable @change="selectPersonChanged">
                  <el-option v-for="item in repairPersons" :key="item.key" :label="item.text" :value="item.key" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="维修开始时间" prop="startTime">
                <span>{{ this.eqRepairApplyList.startTime }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="维修结束时间" prop="endTime">
                <span>{{ this.eqRepairApplyList.endTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="故障判定" prop="problem">
                <span>{{ this.eqRepairApplyList.problem }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-table :data="this.opLogList">
            <el-table-column label="" prop="opLog" align="center" width="200" show-overflow-tooltip />
            <el-table-column label="维修人员" prop="opPersonName" align="center" width="200" show-overflow-tooltip />
            <el-table-column label="维修时间" prop="problem" align="center" width="200" show-overflow-tooltip />
            <el-table-column label="维修开始时间" prop="startTime" align="center" width="150" show-overflow-tooltip />
            <el-table-column label="维修结束时间" prop="endTime" align="center" width="200" show-overflow-tooltip />
            <el-table-column show-overflow-tooltip />
          </el-table>
          <el-row>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="维修记录" prop="startTime">
                <span>{{ model.startTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="维修次数" prop="startTime">
                <span>{{ model.startTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="签核栏" prop="startTime">
                <span>{{ model.startTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="签核意见" prop="checkContent">
                <span>{{ model.checkContent }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

      </el-form>

      <div style="text-align: center;margin-bottom: 20px">
        <el-button type="primary" @click="submitUpdatePass">通过</el-button>
        <!--      <el-button type="success" @click="sentEmail">发送邮件</el-button>-->
        <el-button type="danger" @click="submitUpdateBack">驳回</el-button>
        <el-button @click="visible = false">取消</el-button>
      </div>

    </el-card>
    <el-card style="margin-top: 10px">
      <el-steps
        align-center
        :space="400"
        :active="2"
        finish-status="success"
      >
        <el-step title="员工申请" description="李工(yg001)" />
        <el-step title="部门主管审核" description="王工(bm001)审核通过" />
        <el-step title="维保主管审核" description="丁工(wb001)审核中" />
        <el-step title="维修" description="待维修" />
      </el-steps>
      <div style="text-align: center;margin-top: 30px">
        <el-button type="primary" @click="submitUpdatePass">变更当前节点审核人</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultUpdateViewData from '@/utils/viewData/update'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  data() {
    const curModels = models.repair.outsource
    const curApi = api.repair.outsource
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '委外签核',
        model: curModels.update,
        roleTypes: [],
        companies: [],
        roles: [],
        repairPersons: [],
        appointPersonShow: false,
        applyList: [],
        opLogList: [],
        eqRepairApplyList: [],
        len: 0,
        length: 0

      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.getApplyList()
  },
  methods: {
    ...crud,
    submitUpdate(result) {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.loading = true
        // 钩子，编辑提交前执行。返回true，执行删除；返回false，退出
        if (this.submitUpdateBefore) {
          if (!this.submitUpdateBefore()) {
            this.loading = false
            return false
          }
        }
        const data = {
          eqRepairApplyId: this.model.id,
          remark: this.model.checkNowName,
          result: result,
          repairManId: this.model.repairPersonId
        }
        this.curApi
          .update(data)
          .then(() => {
            // 钩子，编辑提交后执行。无返回值
            if (this.submitUpdateAfter) this.submitUpdateAfter()
            // 重新加载列表页
            this.$parent.getDatas()
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      })
    },

    //
    getApplyList() {
      this.curApi.getinfo().then(response => {
        this.applyList = response.data
        this.len = response.data.length
        // console.log(this.applyList)
      })
    },
    fliter(id) {
      this.eqRepairApplyList = []
      for (let i = 0; i < this.len; i++) {
        if (id === this.applyList[i].repairApplyId) {
          this.eqRepairApplyList.push(this.applyList[i].eqRepairApply)
        }
        // console.log(this.eqRepairApplyList)
      }
    },
    getOpLogList(id) {
      this.curApi.getOpLog(id).then(response => {
        this.opLogList = response.data
        console.log(this.opLogList)
      })
    },

    // 通过
    submitUpdatePass() {
      this.model.status = '3'
      this.submitUpdate()
    },
    //  驳回
    submitUpdateBack() {
      this.model.status = '2'
      this.submitUpdate()
    },
    sentEmail() {
      this.submitUpdate()
    },

    // 初始化数据之前 row：行绑定数据
    async initUpdateBefore(row) {
      this.getOpLogList(row.repairApplyId)
      this.fliter(row.repairApplyId)
      //
    },
    // 初始化数据之后 row：行绑定数据；data：接口返回数据
    initUpdateAfter(row, data) {
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
</style>
