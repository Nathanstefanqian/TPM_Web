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
            <el-input
              v-model="model.content"
              type="textarea"
              readonly="readonly"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="4" :md="10" :sm="12" :xs="24">
          <el-form-item label=" " prop="opDescription">
            <el-link>查看附件</el-link>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="appointPersonShow">
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="维修人员" prop="repairPerson">
            <el-select v-model="model.repairPersonId" class="query-item" style="width: 150px" placeholder="请选择" clearable @change="selectPersonChanged">
              <el-option v-for="item in repairPersons" :key="item.key" :label="item.text" :value="item.key" />
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
      <el-steps
        align-center
        :space="400"
        :active="active"
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
        <el-step v-for="(item,index) in flowDatas" :key="index" :title="item.name" :description="item.checkPersonName">
          <div slot="description">
            <div>{{ item.checkPersonName }}</div>
            <el-button v-if="active ===index" type="default">修改</el-button>
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
      v-adaptive="{ bottomOffset:0 }"
      height="200px"
      width="600px"
      :data="datas"
      :default-sort="sort"
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
      <el-table-column label="IP" prop="repairNum" align="left" width="200" show-overflow-tooltip />
      <el-table-column label="签核人员" prop="deviceNum" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="签核时间" prop="productCode" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="操作" prop="deptName" align="center" width="120" show-overflow-tooltip />
      <el-table-column label="备注" prop="category" align="center" width="120" show-overflow-tooltip />
    </el-table>
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
    const curModels = models.repair.applySign
    const curApi = api.repair.applySign
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '报修签核',
        model: curModels.update,
        roleTypes: [],
        companies: [],
        roles: [],
        repairPersons: [],
        appointPersonShow: false,
        active: 2,
        flowDatas: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.getPersons()
    this.getFlowData(1)
  },
  methods: {
    ...crud,
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
    getPersons() {
      api.system.user.getSelectlist().then(response => {
        this.repairPersons = response.data || []
      }).catch(reject => {
      })
    },
    getFlowData(id) {
      api.repair.applySign.getFlowData(id).then(response => {
        this.flowDatas = response.data || []
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
      console.log(this.model)
    },
    // 初始化数据之前 row：行绑定数据
    async initUpdateBefore(row) {
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
    }
    // // 切换角色类型
    // changeRoleTypeHandle() {
    //   // 1、2类角色用户，选择了3、4类角色，验证所属企业下拉框
    //   this.rules.companyId[0].required = this.user.roleType <= 2 && this.model.roleType >= 3
    //   // 重置模型类
    //   this.model.companyId = null
    //   this.roles = []
    //   this.model.roleId = null
    //   // 重新获取角色
    //   if (this.model.roleType === 2) {
    //     this.getRoles(2, null)
    //   }
    // },
    // // 切换企业
    // changeCompanyHandle() {
    //   this.roles = []
    //   this.model.roleId = null
    //   if (this.model.roleType && this.model.companyId) {
    //     this.getRoles(this.model.roleType, this.model.companyId)
    //   }
    // },
    // // 获取角色列表
    // getRoles(roleType, companyId) {
    //   return api.system.role.getSelectlist(roleType, companyId).then(response => {
    //     this.roles = response.data || []
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
