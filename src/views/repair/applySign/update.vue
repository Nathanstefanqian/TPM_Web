<template>
  <el-dialog
    v-loading="loading"
    :custom-class="'dialog-fullscreen dialog-' + dialogClass"
    :title="dialogTitle"
    :visible.sync="visible"
    :modal="false"
    :modal-append-to-body="false"
  >
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

        <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
          <el-form-item label="报修内容" prop="content">
            <el-input
              v-model="model.content"
              type="textarea"
              readonly="readonly"
              :autosize="{ minRows: 2, maxRows: 4 }"
            />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label="附件">
            <CheckFile :width="400" :file-list="fileList" :src-list="srcList" @getEqRepairApplyFile="getEqRepairApplyFile"/>
          </el-form-item>

        </el-col>
        <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
          <el-form-item label="备注信息">
            <el-input v-model="remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="canAssign">
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="维修人员" prop="repairPerson">
            <el-select
              v-model="model.repairPersonId"
              class="query-item"
              style="width: 150px"
              placeholder="请选择"
              filterable
              clearable
              @change="selectPersonChanged"
            >
              <el-option v-for="item in repairPersons" :key="item.key" :label="item.text" :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="submitUpdatePass">通过</el-button>
      <!--      <el-button type="success" @click="sentEmail">发送邮件</el-button>-->
      <el-button type="danger" @click="submitUpdateBack">驳回</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>

    <div style="margin-top: 30px">
      <el-steps align-center :space="400" :active="active" finish-status="success">
        <!--        <el-step title="员工申请" description="李工(yg001)"></el-step>-->
        <!--        <el-step title="部门主管审核" description="王工(bm001)审核通过"></el-step>-->
        <!--        <el-step title="维保主管审核"  description="李工(yg001)">-->
        <!--          <div slot="description">-->
        <!--            <div>丁工(wb001)待审核</div>-->
        <!--            <el-button v-if="1" type="default">修改</el-button>-->
        <!--          </div>-->
        <!--        </el-step>-->
        <el-step v-for="(item, index) in flowDatas" :key="index" :title="item.name" :description="item.checkPersonName">
          <div slot="description">
            <div>{{ item.checkPersonName }}</div>
            <el-button v-if="active === index" type="default" @click="handleChangePerson(item)">修改</el-button>
          </div>
          <!--          <template v-slot:description>-->
          <!--            <div>丁工(wb001)待审核</div>-->
          <!--            <el-button type="default" >修改</el-button>-->
          <!--          </template>-->
        </el-step>
        <!--        <el-step title="维修" description="待维修"></el-step>-->
      </el-steps>
    </div>

    <el-table
      ref="listTable"
      v-loading="loading.table"
      v-adaptive="{ bottomOffset: 0 }"
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
      <el-table-column label="IP" prop="checkIp" align="left" width="120" show-overflow-tooltip/>
      <el-table-column label="签核人员" prop="checkPerson" align="center" width="200" show-overflow-tooltip/>
      <el-table-column label="签核时间" prop="checkTime" align="center" width="200" show-overflow-tooltip/>
      <el-table-column label="操作" prop="checkInfo" align="center" width="120" show-overflow-tooltip/>
      <el-table-column label="备注" prop="checkContent" align="center" show-overflow-tooltip/>
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
        <el-select
          v-model="newCheckPerson"
          filterable
          class="query-item"
          style="width: 150px"
          placeholder="请选择"
          clearable
          @change="selectCheckPersonChanged"
        >
          <el-option v-for="(item, index) in checkPersons" :key="index" :label="item.text" :value="index"/>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <!--        <div><span style="color: #dd1100">{{ description }}</span></div>-->
        <el-button type="primary" @click="submitUpdateChangePerson">提交</el-button>
        <!--        <el-button @click="resetUpdate">重置aaa</el-button>-->
        <el-button @click="changeCheckPersonVisible = false">取消</el-button>
      </div>
      提交委外申请
    </el-dialog>
  </el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import getDefaultUpdateViewData from '@/utils/viewData/update'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'
import {cloneDeep} from 'lodash'
import adaptive from '@/directive/el-table'
import CheckFile from "@/components/CheckFile";

export default {
  components: {CheckFile},
  directives: {adaptive},
  data() {
    const curModels = models.repair.applySign
    const curApi = api.repair.applySign
    const outsourceModels = models.repair.outsource
    const outsourceApi = api.repair.outsource
    return {
      hasFile: false,
      fileList: [],
      srcList: [],
      ...getDefaultUpdateViewData(),
      ...curModels,
      curApi,
      rules,
      ...{
        dialogTitle: '报修签核',
        model: curModels.update,
        roleTypes: [],
        companies: [],
        roles: [],
        outsourceModel: outsourceModels.create,
        outsourceApi,
        repairPersons: [],
        checkPersons: [],
        // appointPersonShow: false,
        canAssign: false,
        active: 2,
        flowDatas: [],
        a: [],
        remark: null,
        logDatas: [],
        newCheckPerson: '',
        newCheckPersonName: '',
        newCheckPersonid: '',
        changeCheckPersonVisible: false,
        sort: {prop: 'checkTime', order: 'descending'},
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
    console.log('userid：' + this.user.userId)
  },
  methods: {
    ...crud,
    // 图片预览
    doPreviewImg() {
      this.$refs.myImg.showViewer = true
    },
    // 判断是否是图片
    isImage(str) {
      const reg = /.(png|jpg|gif|jpeg|webp|svg)$/
      return reg.test(str)
    },
    // 获取附件数据
    getEqRepairApplyFile() {
      this.loading = true
      this.curApi.getEqRepairApplyFile(this.model.id).then(
        res => {
          this.loading = false
          if (res.code === 20000) {
            this.fileList = res.data
            this.fileList.forEach(
              item => {
                if (this.isImage(item.fileName)) {
                  this.srcList.push(process.env.VUE_APP_BASE_API + item.filePath)
                }
              })
          }
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    // 下载附件
    getFileList(url, fileName) {
      window.open(process.env.VUE_APP_BASE_API + url)
    },
    // 重写submitUpdate方法
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
          remark: this.remark,
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
    // 获取canAssign
    getcanAssign(x) {
      api.repair.applySign
        .getFlowData(x)
        .then((response) => {
          this.a = response.data || []
          for (var i = 0; i < this.a.length; i++) {
            if (this.a[i].checkId === this.user.userId) {
              this.canAssign = this.a[i].canAssign
              console.log('this.canAssign', this.canAssign)
            }
          }
        })
        .catch((reject) => {
        })
    },
    // 通过
    submitUpdatePass() {
      if (this.canAssign && this.model.repairPersonId == null) {
        this.$message.error('请选择维修人员。')
        return
      }
      if (this.canAssign) {
        this.model.checkNextId = this.model.repairPersonId
      }
      this.model.status = '3'
      // todo  备注信息
      this.model.checkMemo = ''
      this.active++
      this.submitUpdate(1)
    },
    //  驳回
    submitUpdateBack() {
      this.model.status = '2'
      // todo  备注信息
      this.model.checkMemo = ''
      this.submitUpdate(0)
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
      api.repair.applySign.changeCheckPerson(this.flowNode).then((res) => {
        // 关闭窗口 刷新流程
        this.changeCheckPersonVisible = false
        this.getFlowData(this.flowNode.repairApplyId)
        this.$message({
          type: 'success',
          message: '修改成功: '
        })
        // 刷新签核记录
        this.getCheckLog(this.flowNode.repairApplyId)
      })
    },
    sentEmail() {
      this.submitUpdate()
    },
    getPersons() {
      api.system.user
        .getSelectlist()
        .then((response) => {
          this.repairPersons = response.data || []
          this.checkPersons = cloneDeep(response.data)
        })
        .catch((reject) => {
        })
    },
    getFlowData(repairApplyId) {
      api.repair.applySign
        .getFlowData(repairApplyId)
        .then((response) => {
          this.flowDatas = response.data || []
          console.log('this.flowDatas', this.flowDatas)
          // console.log('this.appointPersonShow',this.appointPersonShow)
          // 设置界面上流程的激活的序号
          for (const flowData of this.flowDatas) {
            if (this.user.userId === flowData.checkId) {
              this.active = flowData.checkOrder - 1
            }
          }
        })
        .catch((reject) => {
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
      api.repair.applySign
        .getCheckLog(repairApplyId)
        .then((response) => {
          this.logDatas = response.data || []
        })
        .catch((reject) => {
        })
    },
    // 初始化数据之前 row：行绑定数据
    async initUpdateBefore(row) {
      // 流程数据
      this.getFlowData(row.id)
      // 签核记录数据
      this.getCheckLog(row.id)
      // 获取canAssign
      this.getcanAssign(row.id)

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
      // if (this.model.checkNextName === '维保主管审核') {
      //   this.appointPersonShow = true
      // }
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
