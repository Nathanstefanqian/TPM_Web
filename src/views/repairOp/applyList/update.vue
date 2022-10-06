<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属部门" prop="applyDeptId">
            <span>{{ model.deptName }}</span>
          </el-form-item>
        </el-col>
        <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属工段" prop="applyDeptId">
            <span>{{ model.section }}</span>
          </el-form-item>
        </el-col>

        <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造编号" prop="productCode">
            <span>{{ model.productCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备编号" prop="propertyCode">
            <span>{{ model.deviceNum }}</span>
          </el-form-item>
        </el-col>
        <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造日期" prop="productCode">
            <span>{{ model.productDate }}</span>
          </el-form-item>
        </el-col>
        <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备型号" prop="propertyCode">
            <span>{{ model.deviceType }}</span>
          </el-form-item>
        </el-col>
        <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="资产编号" prop="propertyCode">
            <span>{{ model.propertyCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="报修等级" prop="level">
            <span>{{ model.level }}</span>
          </el-form-item>
        </el-col>
        <el-col :xl="3" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="报修类别" prop="factory">
            <span>{{ model.category }}</span>
          </el-form-item>
        </el-col>

        <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
          <el-form-item label="报修内容" prop="content">
            <span>{{ model.content }}</span>

            <!--            <el-input-->
            <!--              v-model="model.content"-->
            <!--              type="textarea"-->
            <!--              readonly="readonly"-->
            <!--              :autosize="{ minRows: 2, maxRows: 4}"-->
            <!--            />-->
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label=" " prop="opDescription">
            <el-link>查看附件</el-link>
          </el-form-item>
        </el-col>
      </el-row>
      <!--      <el-row>-->
      <!--        <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">-->
      <!--          <el-form-item style="text-decoration-color: #0a76a4" label="维修记录" prop="content">-->
      <!--            <el-input-->
      <!--              v-model="logModel.opLog"-->
      <!--              type="textarea"-->
      <!--              :autosize="{ minRows: 2, maxRows: 4}"-->
      <!--            />-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <!--      <el-row>-->
      <!--        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">-->
      <!--          <el-form-item label="故障判定" prop="repairPerson">-->
      <!--            <el-select v-model="logModel.problem" class="query-item" style="width: 150px" placeholder="请选择" filterable clearable @change="selectPersonChanged">-->
      <!--              <el-option v-for="item in faultTypes" :key="item.key" :label="item.text" :value="item.key" />-->
      <!--            </el-select>-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->

    </el-form>
    <!--    <div style="text-align: center">-->
    <!--      <el-button type="primary" @click="saveLog">保存记录本次维修</el-button>-->
    <!--      &lt;!&ndash;      <el-button type="success" @click="sentEmail">发送邮件</el-button>&ndash;&gt;-->
    <!--      <el-button type="danger" @click="submitOp">提交结束维修</el-button>-->
    <!--      <el-button @click="visible = false">取消</el-button>-->
    <!--    </div>-->

    <!--    <div style="margin-top: 30px">-->
    <!--      <el-steps-->
    <!--        align-center-->
    <!--        :space="400"-->
    <!--        :active="active"-->
    <!--        finish-status="success"-->
    <!--      >-->
    <!--        &lt;!&ndash;        <el-step title="员工申请" description="李工(yg001)"></el-step>&ndash;&gt;-->
    <!--        &lt;!&ndash;        <el-step title="部门主管审核" description="王工(bm001)审核通过"></el-step>&ndash;&gt;-->
    <!--        &lt;!&ndash;        <el-step title="维保主管审核"  description="李工(yg001)">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <div slot="description">&ndash;&gt;-->
    <!--        &lt;!&ndash;            <div>丁工(wb001)待审核</div>&ndash;&gt;-->
    <!--        &lt;!&ndash;            <el-button v-if="1" type="default">修改</el-button>&ndash;&gt;-->
    <!--        &lt;!&ndash;          </div>&ndash;&gt;-->
    <!--        &lt;!&ndash;        </el-step>&ndash;&gt;-->
    <!--        <el-step v-for="(item,index) in flowDatas" :key="index" :title="item.name" :description="item.checkPersonName">-->
    <!--          <div slot="description">-->
    <!--            <div>{{ item.checkPersonName }}</div>-->
    <!--            <el-button v-if="active ===index" type="default" @click="handleChangePerson(item)">修改</el-button>-->
    <!--          </div>-->
    <!--          &lt;!&ndash;          <template v-slot:description>&ndash;&gt;-->
    <!--          &lt;!&ndash;            <div>丁工(wb001)待审核</div>&ndash;&gt;-->
    <!--          &lt;!&ndash;            <el-button type="default" >修改</el-button>&ndash;&gt;-->
    <!--          &lt;!&ndash;          </template>&ndash;&gt;-->
    <!--        </el-step>-->
    <!--        &lt;!&ndash;        <el-step title="维修" description="待维修"></el-step>&ndash;&gt;-->
    <!--      </el-steps>-->
    <!--    </div>-->

    <el-table
      ref="listTable"
      v-loading="loading.table"
      v-adaptive="{ bottomOffset:0 }"
      height="200px"
      width="600px"
      :data="logDatas"
      :default-sort="sort"
      border
      fit
      highlight-current-row
      @sort-change="handleSort"
    >
      <el-table-column label="序号" type="index" align="center" width="65" fixed>
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="维修人员" prop="opPersonName" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="维修时间" prop="endTime" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="故障判定" prop="problem" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="维修记录" prop="opLog" align="center" show-overflow-tooltip />
    </el-table>
    <!--    修改操作人窗口-->
    <el-dialog
      :custom-class="'dialog-fullscreen '"
      title="更换签核人"
      :visible.sync="changeCheckPersonVisible"
      :modal="false"
      :modal-append-to-body="false"
    >
      <div class="app-container list">
        <el-select v-model="newCheckPerson" filterable class="query-item" style="width: 150px" placeholder="请选择" clearable @change="selectCheckPersonChanged">
          <el-option v-for="(item,index) in checkPersons" :key="index" :label="item.text" :value="index" />
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <!--        <div><span style="color: #dd1100">{{ description }}</span></div>-->
        <el-button type="primary" @click="submitUpdateChangePerson">提交</el-button>
        <!--        <el-button @click="resetUpdate">重置aaa</el-button>-->
        <el-button @click="changeCheckPersonVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultUpdateViewData from '@/utils/viewData/update'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'
import { cloneDeep } from 'lodash'
import adaptive from '@/directive/el-table'

export default {
  directives: { adaptive },
  data() {
    const curModels = models.repair.applySign
    const curApi = api.repair.applySign
    const logModels = models.repair.operate
    const logApi = api.repair.operate
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '维修详情',
        model: curModels.update,
        logModel: logModels.update,
        logApi: logApi,
        roleTypes: [],
        companies: [],
        roles: [],
        repairPersons: [],
        checkPersons: [],
        appointPersonShow: false,
        active: 2,
        flowDatas: [],
        logDatas: [],
        newCheckPerson: '',
        newCheckPersonName: '',
        newCheckPersonid: '',
        changeCheckPersonVisible: false,
        sort: { prop: 'endTime', order: 'descending' },

        faultTypes: [
          {
            key: '人为故障',
            text: '人为故障'
          },
          {
            key: '正常磨损',
            text: '正常磨损'
          },
          {
            key: '其他原因',
            text: '其他原因'
          }],
        flowNode: {
          id: null,
          name: null,
          flowId: null,
          repairApplyId: null,
          checkType: null,
          checkOrder: null,
          checkId: null,
          checkIdOld: null
        }
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.getPersons()
  },
  methods: {
    ...crud,
    // 保存维修记录
    saveLog() {
      if (this.logModel.opLog == null || this.logModel.opLog === '') {
        this.$message.error('请选填写维修记录。')
        return
      }
      if (this.logModel.problem == null) {
        this.$message.error('请选择故障判定。')
        return
      }
      this.logModel.opPersonId = this.user.userId
      this.logModel.opPersonName = this.user.name
      this.logModel.repairApplyId = this.model.id
      this.logApi.create(this.logModel)
    },
    //  提交维修结案
    submitOp() {
      this.saveLog()
      this.logApi.finishOp(this.logModel)
    },
    handleChangePerson(item) {
      this.changeCheckPersonVisible = true
      this.flowNode.id = item.id
      this.flowNode.name = item.name
      this.flowNode.checkIdOld = item.checkId
      this.flowNode.flowId = item.flowId
      this.flowNode.checkType = item.checkType
      this.flowNode.checkOrder = item.checkOrder
      this.flowNode.repairApplyId = item.repairApplyId
    },
    submitUpdateChangePerson() {
      this.flowNode.checkId = this.newCheckPersonid
      console.log(this.flowNode)

      // 提交修改签核人
      api.repair.applySign.changeCheckPerson(this.flowNode).then(res => {
        // 关闭窗口 刷新流程
        this.changeCheckPersonVisible = false
        this.getFlowData(this.flowNode.repairApplyId)
        this.$message({
          type: 'success',
          message: '修改成功: '
        })
        // 刷新签核记录
        this.getCheckLog(this.flowNode.repairApplyId)
      }
      )
    },
    sentEmail() {
      this.submitUpdate()
    },
    getPersons() {
      api.system.user.getSelectlist().then(response => {
        this.repairPersons = response.data || []
        this.checkPersons = cloneDeep(response.data)
      }).catch(reject => {
      })
    },
    getFlowData(repairApplyId) {
      api.repair.applySign.getFlowData(repairApplyId).then(response => {
        this.flowDatas = response.data || []
        // 设置界面上流程的激活的序号
        for (const flowData of this.flowDatas) {
          if (this.user.userId === flowData.checkId) {
            this.active = flowData.checkOrder - 1
          }
        }
      }).catch(reject => {
      })
    },
    selectPersonChanged(value) {
      for (var i = 0; i < this.repairPersons.length; i++) {
        // console.log('i:' + this.repairPersons[i].text)
        if (value === this.repairPersons[i].key) {
          this.model.repairPersonName = this.repairPersons[i].text
        }
      }
    },
    selectCheckPersonChanged(value) {
      this.newCheckPersonName = this.repairPersons[value].text
      this.newCheckPersonid = this.repairPersons[value].key
    },
    getCheckLog(repairApplyId) {
      api.repair.operate.getOpLog(repairApplyId).then(response => {
        this.logDatas = response.data || []
      }).catch(reject => {
      })
    },
    // 初始化数据之前 row：行绑定数据
    async initUpdateBefore(row) {
      // 流程数据
      this.getFlowData(row.id)
      // 签核记录数据
      this.getCheckLog(row.id)

      // this.rules.password[0].required = false
      // this.roleTypes = this.$parent.roleTypes
      // this.companies = this.$parent.companies
      // if (this.user.roleType === 3) {
      //   this.model.roleType = 4
      //   this.model.companyId = this.user.companyId
      // }
    },
    // 初始化数据之后 row：行绑定数据；data：接口返回数据
    initUpdateAfter(row, data) {
      console.log(data)
      this.model = data
      if (this.model.checkNextName === '维保主管审核') {
        this.appointPersonShow = true
      }
    },
    submitUpdateAfter() {
      console.log('updateafter' + this.flowNode.repairApplyId)
      // this.getCheckLog(this.flowNode.repairApplyId)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
