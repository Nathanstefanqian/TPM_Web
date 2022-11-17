<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-card>
      <el-form ref="form" label-position="right" :rules="rules" :label-width="labelWidth||'120px'">
        <div style="margin-left: 20px">
          <el-row>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="报修单号">
                <span>{{ this.eqRepairApplyList[0].repairNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="保修人员" prop="applyPersonName">
                <span>{{ this.eqRepairApplyList[0].applyPersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="所属工段" prop="section">
                <span>{{ this.eqRepairApplyList[0].section }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="所属单位" prop="deptName">
                <span>{{ this.eqRepairApplyList[0].deptName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="制造编号" prop="productCode">
                <span>{{ this.eqRepairApplyList[0].productCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="制造日期" prop="productDate">
                <span>{{ this.eqRepairApplyList[0].productDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="设备编号" prop="deviceNum">
                <span>{{ this.eqRepairApplyList[0].deviceNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="设备型号" prop="deviceType">
                <span>{{ this.eqRepairApplyList[0].deviceType }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="资产编号" prop="propertyCode">
                <span>{{ this.eqRepairApplyList[0].propertyCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="报修等级" prop="level">
                <span>{{ this.eqRepairApplyList[0].level }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:250px">
              <el-form-item label="报修类别" prop="category">
                <span>{{ this.eqRepairApplyList[0].category }}</span>
              </el-form-item>
            </el-col>
            <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24" style="width:300px">
              <el-form-item label="报修日期" prop="repairTime">
                <span>{{ this.eqRepairApplyList[0].repairTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
              <el-form-item label="报修内容" prop="content">
                <span>{{ this.eqRepairApplyList[0].content }}</span>
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

          <el-row>
            <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
              <el-form-item label="签核意见" prop="remark">
                <el-input
                  v-model="model.remark"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-table :data="this.opLogList">
          <el-table-column label="" prop="opLog" align="center" width="200" show-overflow-tooltip />
          <el-table-column label="维修人员" prop="opPersonName" align="center" width="200" show-overflow-tooltip />
          <el-table-column label="故障判定" prop="problem" align="center" width="200" show-overflow-tooltip />
          <el-table-column label="维修开始时间" prop="startTime" align="center" width="150" show-overflow-tooltip />
          <el-table-column label="维修结束时间" prop="endTime" align="center" width="200" show-overflow-tooltip />
          <el-table-column show-overflow-tooltip />
        </el-table>

      </el-form>

      <div style="text-align: center;margin-bottom: 20px;margin-top: 20px">
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
        :active="1"
        finish-status="success"
      >
        <!--        <el-step title="员工申请" description="李工(yg001)"></el-step>-->
        <!--        <el-step title="部门主管审核" description="王工(bm001)审核通过"></el-step>-->
        <!--        <el-step title="维保主管审核"  description="李工(yg001)">-->
        <!--          <div slot="description">-->
        <!--            <div>丁工(wb001)待审核</div>-->
        <!--            <el-button v-if="1" type="default">修改</el-button>-->
        <!--          </div>-->
        <!--        </el-step>-->
        <el-step
          v-for="(item, index) in flowDataList"
          :key="index"
          :title="item.name"
          :description="item.checkPersonName"
        >
          <div slot="description">
            <div>{{ item.checkPersonName }}</div>
            <el-button
              v-if="active === index"
              type="default"
              @click="handleChangePerson(item)"
            >修改</el-button>
          </div>
          <!--          <template v-slot:description>-->
          <!--            <div>丁工(wb001)待审核</div>-->
          <!--            <el-button type="default" >修改</el-button>-->
          <!--          </template>-->
        </el-step>
        <!--        <el-step title="维修" description="待维修"></el-step>-->
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
        flowDataList: [],
        len: 0,
        length: 0

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
