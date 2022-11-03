<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle"
    :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth || '120px'">
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

        <el-col :xl="6" :lg="12" :md="12" :sm="12" :xs="24">
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
          <el-form-item prop="opDescription">
            <el-link>查看附件</el-link>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="请选择起止时间">
            <el-date-picker v-model="logModel.startTime" type="datetime" placeholder="选择维修开始时间" />
            <el-date-picker v-model="logModel.endTime" type="datetime" placeholder="选择维修结束时间" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="现象">
            <el-input v-model="logModel.phenomenon" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
          <el-form-item style="text-decoration-color: #0a76a4" label="维修记录" prop="content">
            <el-input v-model="logModel.opLog" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="故障判定" prop="repairPerson">
            <el-select v-model="logModel.problem" class="query-item" style="width: 150px" placeholder="请选择" filterable
              clearable @change="selectPersonChanged">
              <el-option v-for="item in faultTypes" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
            <el-input v-if="logModel.problem === '其他原因'" type="textarea" :autosize="{ minRows: 2 }"
              placeholder="请输入其他原因" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="维修结果" prop="result">
            <el-select v-model="resultList.key" class="query-item" style="width: 150px" placeholder="请选择" filterable
              clearable @change="selectPersonChanged">
              <el-option v-for="item in resultList" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
            <el-button v-if="resultList.key == 2" type="primary" @click="AddLackPart">添加库存中没有的配件</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form v-if="resultList.key == 3" ref="form" label-position="right" :rules="rules" :model="outsourceModel"
        :label-width="labelWidth || '120px'">
        <el-row v-if="user.roleType <= 2">
          <el-col :span=12>
            <el-form-item label="报修单id">
              {{ this.model.repairNum }}
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="委外原因" prop="reason">
              <el-input v-model="outsourceModel.reason" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="维修人员姓名" prop="outDept">
              <el-input v-model="outsourceModel.outDept" />
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="工期要求(天)" prop="estimatedTime">
              <el-input v-model="outsourceModel.estimatedTime" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="预计费用(元)" prop="estimatedFee">
              <el-input v-model="outsourceModel.estimatedFee" />
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="签核状态">
              待签核
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-form>
    <el-row v-if="resultList.key == 1">
      <el-col :span="12">
        <el-table ref="listTable" v-loading="loading.table" height="200px" width="600px" :data="partList"
          :default-sort="sort" fit>
          <el-table-column label="配件名" prop="partName" align="center" width="200" show-overflow-tooltip />
          <el-table-column label="使用数量" prop="partNum" align="center" width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.partNum" />
            </template>
          </el-table-column>
          <el-table-column />
          <el-table-column fixed="right" label="操作" align="center" width="100">
            <template slot-scope="{row}">
              <el-tooltip transition="false" :hide-after="1000" class="item" content="保存" placement="top-end">
                <el-button type="primary" plain class="button-operate button-update" size="mini"
                  @click="SavePartNum(row)"><i class="el-icon-check" /></el-button>
              </el-tooltip>
              <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">
                <el-button type="danger" plain class="button-operate button-delete" size="mini"
                  @click="DeletePart(row)"><i class="vue-icon-delete" /></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table ref="listTable" v-loading="loading.table" height="200px" width="600px" :data="partArrary" fit>
          <el-table-column label="配件名" prop="name" align="center" width="200" show-overflow-tooltip />
          <el-table-column label="库存数量" prop="stock" align="center" width="200" show-overflow-tooltip />
          <el-table-column />
          <el-table-column fixed="right" label="操作" align="center" width="180">
            <template slot-scope="{row}">
              <el-tooltip transition="false" :hide-after="1000" class="item" content="添加" placement="top-end">
                <el-button type="primary" plain class="button-operate button-update" size="mini" @click="SavePart(row)">
                  <i class="el-icon-plus" />
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-if="resultList.key == 2">
      <el-col :span="12">
        <el-table ref="listTable" v-loading="loading.table" height="200px" width="600px" :data="LackPartsList"
          :default-sort="sort" fit>
          <el-table-column label="配件名" prop="partName" align="center" width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.partName" :disabled="!IsInStack(scope.row.partId)" />
            </template>
          </el-table-column>
          <el-table-column label="缺少数量" prop="partNum" align="center" width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.partNum" />
            </template>
          </el-table-column>
          <el-table-column />
          <el-table-column fixed="right" label="操作" align="center" width="100">
            <template slot-scope="{row}">
              <el-tooltip transition="false" :hide-after="1000" class="item" content="保存" placement="top-end">
                <el-button type="primary" plain class="button-operate button-update" size="mini"
                  @click="SaveLackPartNum(row)">
                  <i class="el-icon-check" />
                </el-button>
              </el-tooltip>
              <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">
                <el-button type="danger" plain class="button-operate button-delete" size="mini"
                  @click="DeleteLackPart(row)"><i class="vue-icon-delete" /></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table ref="listTable" v-loading="loading.table" height="200px" width="600px" :data="partArrary" fit>
          <el-table-column label="配件名" prop="name" align="center" width="200" show-overflow-tooltip />
          <el-table-column label="库存数量" prop="stock" align="center" width="200" show-overflow-tooltip />
          <el-table-column />
          <el-table-column fixed="right" label="操作" align="center" width="180">
            <template slot-scope="{row}">
              <el-tooltip transition="false" :hide-after="1000" class="item" content="添加" placement="top-end">
                <el-button type="primary" plain class="button-operate button-update" size="mini"
                  @click="SaveLackPart(row)">
                  <i class="el-icon-plus" />
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div style="text-align: center">
      <el-button v-if="resultList.key != 3" type="primary" @click="saveLog">保存记录本次维修
      </el-button>
      <!--      <el-button type="success" @click="sentEmail">发送邮件</el-button>-->
      <el-button v-if="resultList.key === 1" type="success" @click="submitOp">提交结束维修</el-button>
      <el-button v-if="resultList.key === 3" type="danger" @click="outsource">申请委外维修</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>

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

    <el-table ref="listTable" v-loading="loading.table" v-adaptive="{ bottomOffset: 0 }" height="200px" width="600px"
      :data="logDatas" :default-sort="sort" border fit highlight-current-row @sort-change="handleSort">
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
    <el-dialog :custom-class="'dialog-fullscreen '" title="更换签核人" :visible.sync="changeCheckPersonVisible"
      :modal="false" :modal-append-to-body="false">
      <div class="app-container list">
        <el-select v-model="newCheckPerson" filterable class="query-item" style="width: 150px" placeholder="请选择"
          clearable @change="selectCheckPersonChanged">
          <el-option v-for="(item, index) in checkPersons" :key="index" :label="item.text" :value="index" />
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
    const outsourceModels = models.repair.outsource
    const outsourceApi = api.repair.outsource
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        page: { total: 0, current: 1, size: 10 },
        dialogTitle: '维修签核',
        model: curModels.update,
        logModel: logModels.create,
        outsourceModel: outsourceModels.create,
        logApi: logApi,
        outsourceApi,
        roleTypes: [],
        companies: [],
        roles: [],
        lackcase: null,
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
        rpaId: null,
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
        },
        partArrary: [],
        partList: [],
        LackPartsList: [],
        resultList: [
          {
            key: 0,
            text: '维修未成功'
          },
          {
            key: 1,
            text: '维修成功'
          },
          {
            key: 2,
            text: '缺少配件'
          },
          {
            key: 3,
            text: '申请委外维修'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.getPersons()
    this.getPart()
  },
  methods: {
    ...crud,
    handleChange() { },
    // 获取配件信息
    getPart() {
      const that = this
      this.logApi.getPart({}).then((response) => {
        that.partArrary = response.data.items
      })
    },
    // 保存配件
    SavePart(row) {
      const p = {
        partId: row.id,
        partName: row.name,
        partNum: null
      }
      const temp = this.partList.find(item => item.partId == row.id)
      if (temp === undefined) {
        this.partList.push(p)
      }
    },
    // 删除配件
    DeletePart(row) {
      const i = this.partList.findIndex(item => item.partId == row.partId)
      this.partList.splice(i, 1)
    },
    // 保存使用配件的数量
    SavePartNum(row) {
      const p = {
        partId: row.partId,
        partName: row.partName,
        partNum: row.partNum
      }
      alert(p.partName + '的使用数量为' + p.partNum)
    },
    // 添加缺少配件
    SaveLackPart(row) {
      const p = {
        partId: row.id,
        partName: row.name,
        partNum: null
      }
      const temp = this.LackPartsList.find(item => item.partId == row.id)
      if (temp === undefined) {
        this.LackPartsList.push(p)
      }
    },
    //判断配件是否在库存中
    IsInStack(value) {
      return (this.partArrary.find(item => item.id == value) === undefined)
    },
    //新增配件
    AddLackPart() {
      const p = {
        partId: null,
        partName: null,
        partNum: null
      }
      this.LackPartsList.push(p)
    },
    //删除缺少的配件
    DeleteLackPart(row) {
      const i = this.LackpartList.findIndex(item => item.partId == row.partId)
      this.LackpartList.splice(i, 1)
    },
    //保存缺少配件的数量
    SaveLackPartNum(row) {
      const p = {
        partId: row.partId,
        partName: row.partName,
        partNum: row.partNum
      }
      alert(p.partName + '的使用数量为' + p.partNum)
    },
    //申请委外
    outsource() {
      this.outsourceModel.status = 1
      this.outsourceModel.repairApplyId = this.model.repairNum
      this.outsourceModel.flowId = 3
      console.log(this.outsourceModel)
      const data = this.outsourceModel
      this.outsourceApi.applyOutSource(data)
    },
    // 保存维修记录
    saveLog() {
      this.logModel.result = this.resultList.key
      if (this.logModel.opLog === null || this.logModel.opLog === '') {
        this.$message.error('请选填写维修记录。')
        return
      }
      if (this.logModel.problem === null) {
        this.$message.error('请选择故障判定。')
        return
      }
      this.logModel.opPersonId = this.user.userId
      this.logModel.opPersonName = this.user.name
      this.logModel.repairApplyId = this.model.id
      this.logApi.create(this.logModel).then(res => {
        this.getCheckLog(this.rpaId)
      })
    },
    //  提交维修结案
    submitOp() {
      this.logModel.result = this.resultList.key
      this.logModel.partList = this.partList
      this.logModel.LackPartsList = this.LackPartsList
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
        this.getCheckLog(this.rpaId)
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
      this.rpaId = row.id
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
