<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-card>
      <el-form ref="form" label-position="right" :rules="rules" :label-width="labelWidth||'120px'">
        <el-card style="margin-bottom: 20px">
          <div style="margin-left: 20px">
            <el-row>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="委外单号">
                  <span>{{ this.applyList.repairOutsourceCode }}</span>
                </el-form-item>
              </el-col>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="报修人员" prop="applyPersonName">
                  <span>{{ this.applyList.eqRepairApply.applyPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="所属工段" prop="section">
                  <span>{{ this.applyList.eqRepairApply.section }}</span>
                </el-form-item>
              </el-col>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="所属单位" prop="deptName">
                  <span>{{ this.applyList.eqRepairApply.deptName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="制造编号" prop="productCode">
                  <span>{{ this.applyList.eqRepairApply.productCode }}</span>
                </el-form-item>
              </el-col>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="制造日期" prop="productDate">
                  <span>{{ this.applyList.eqRepairApply.productDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="设备编号" prop="deviceNum">
                  <span>{{ this.applyList.eqRepairApply.deviceNum }}</span>
                </el-form-item>
              </el-col>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="设备型号" prop="deviceType">
                  <span>{{ this.applyList.eqRepairApply.deviceType }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="资产编号" prop="propertyCode">
                  <span>{{ this.applyList.eqRepairApply.propertyCode }}</span>
                </el-form-item>
              </el-col>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="报修等级" prop="level">
                  <span>{{ this.applyList.eqRepairApply.level }}</span>
                </el-form-item>
              </el-col>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
                <el-form-item label="报修类别" prop="category">
                  <span>{{ this.applyList.eqRepairApply.category }}</span>
                </el-form-item>
              </el-col>
              <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:300px">
                <el-form-item label="报修日期" prop="repairTime">
                  <span>{{ this.applyList.eqRepairApply.repairTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
                <el-form-item label="报修内容" prop="content">
                  <span>{{ this.applyList.eqRepairApply.content }}</span>
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
        </el-card>
        <el-card style="margin-bottom: 20px">
          <h2>维修记录</h2>
          <el-table :data="this.opLogList">
            <el-table-column label="维修记录" prop="opLog" align="center" width="200" show-overflow-tooltip />
            <el-table-column label="维修人员" prop="opPersonName" align="center" width="200" show-overflow-tooltip />
            <el-table-column label="故障判定" prop="problem" align="center" width="200" show-overflow-tooltip />
            <el-table-column label="维修开始时间" prop="startTime" align="center" width="150" show-overflow-tooltip />
            <el-table-column label="维修结束时间" prop="endTime" align="center" width="200" show-overflow-tooltip />
            <el-table-column show-overflow-tooltip />
          </el-table>
        </el-card>

        <!--        <el-row>-->
        <!--          <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">-->
        <!--            <el-form-item label="委外维修" prop="content">-->
        <!--              <el-input-->
        <!--                v-model="model.content"-->
        <!--                type="textarea"-->
        <!--                :autosize="{ minRows: 2, maxRows: 4}"-->
        <!--              />-->
        <!--            </el-form-item>-->
        <!--          </el-col>-->
        <!--          <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">-->
        <!--            <el-form-item label=" " prop="opDescription">-->
        <!--              <el-button type="primary" @click="submitCreate">添加附件</el-button>-->
        <!--            </el-form-item>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <el-card>
          <el-row>
            <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="维修开始时间" prop="startTime">
                <el-date-picker
                  v-model="startTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="维修结束时间" prop="endTime">
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="故障判定" prop="problem">
                <el-input v-model="problem" />
              </el-form-item>
            </el-col>
            <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="维修日志" prop="opLog">
                <el-input
                  v-model="opLog"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label=" " prop="opDescription">
                <el-button type="primary" @click="createOutsourceOpLog">保存维修记录</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <h2>委外维修记录</h2>
          <el-table :data="this.OutsourceOpLog">
            <el-table-column label="开始时间" prop="startTime" align="center" width="200" show-overflow-tooltip />
            <el-table-column label="结束时间" prop="endTime" align="center" width="200" show-overflow-tooltip />
            <el-table-column label="故障判定" prop="problem" align="center" width="150" show-overflow-tooltip />
            <el-table-column label="维修日志" prop="opLog" align="center" width="200" show-overflow-tooltip />
            <el-table-column show-overflow-tooltip />
          </el-table>
        </el-card>
      </el-form>

      <div style="text-align: center;margin-bottom: 20px;margin-top: 20px">
        <el-button type="danger" @click="finish">结案申请</el-button>
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
import { createOutsourceOpLog } from '@/api/repair/modules/outsource'

export default {
  data() {
    const curModels = models.repair.outsource
    const curApi = api.repair.outsource
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '委外维修',
        model: curModels.update,
        roleTypes: [],
        companies: [],
        roles: [],
        repairPersons: [],
        appointPersonShow: false,
        applyList: [],
        opLogList: [],
        flowDataList: [],
        len: 0,
        length: 0,
        repairOutsourceCode: null,
        OutsourceOpLog: [],
        startTime: null,
        endTime: null,
        problem: null,
        opLog: null
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    // this.getApplyList()
  },
  methods: {
    ...crud,
    createOutsourceOpLog() {
      const data = {
        outsourceId: this.applyList.id,
        startTime: this.startTime,
        endTime: this.endTime,
        problem: this.problem,
        opLog: this.opLog
      }
      this.curApi.createOutsourceOpLog(data)
    },
    getOutsourceOpLog(id) {
      this.curApi.getOutsourceOpLog(id).then(response => {
        this.OutsourceOpLog = response.data
        console.log(response.data)
      })
    },
    finish() {
      this.curApi.finishOp(this.repairOutsourceCode)
    },
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
    getApplyList(id) {
      this.curApi.getinfo().then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (id === response.data[i].id) {
            this.applyList = response.data[i]
            // console.log(this.applyList)
            this.repairOutsourceCode = this.applyList[i].repairOutsourceCode
          }
        }
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

    // 通过
    async submitUpdatePass() {
      const data = {
        id: this.model.id,
        remark: this.model.remark,
        result: 1
      }
      this.curApi.sign(data)
    },
    //  驳回
    submitUpdateBack() {
      const data = {
        id: this.model.id,
        remark: this.model.remark,
        result: 0
      }
      this.curApi.sign(data)
    },
    sentEmail() {
      this.submitUpdate()
    },

    // 初始化数据之前 row：行绑定数据
    async initUpdateBefore(row) {
      this.getFlowDataList(row.repairApplyId)
      this.getOpLogList(row.repairApplyId)
      this.getApplyList(row.id)
      this.getOutsourceOpLog(row.id)
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
