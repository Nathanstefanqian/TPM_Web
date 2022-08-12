<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属部门" prop="departs">
            <el-select v-model="model.deptId" class="query-item" style="width: 150px" placeholder="所属部门" clearable @clear="handleQuery">
              <el-option v-for="item in departs" :key="item.key" :label="item.text" :value="item.key" @click.native="onChangeDepart(item.text)" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="厂区" prop="departs">
            <el-select v-model="model.factory" class="query-item" style="width: 150px" placeholder="厂区" clearable @clear="handleQuery">
              <el-option v-for="item in factories" :key="item.text" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="职系" prop="zhixi">
            <el-select v-model="model.zhixi" class="query-item" style="width: 150px" placeholder="职系" clearable @clear="handleQuery">
              <el-option v-for="item in zhixis" :key="item.text" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="加工部" prop="departs">
            <el-select v-model="model.processDeptId" class="query-item" style="width: 150px" placeholder="加工部" clearable @clear="handleQuery">
              <el-option v-for="item in processDepts" :key="item.key" :label="item.text" :value="item.key" @click.native="onChangePrecessDept(item.text)" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="计划类型" prop="maintainType">
            <el-select v-model="model.maintainType" class="query-item" style="width: 150px" placeholder="计划类型" clearable @clear="handleQuery">
              <el-option v-for="item in maintainTypes" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造编号" prop="productCode">
            <el-input v-model="model.productCode" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造日期" prop="productTime">
            <el-date-picker v-model="model.productTime" align="center" placeholder="选择日期" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="query-item" style="width: 200px" @change="handleChangeQueryDate" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备型号" prop="propertyCode">
            <el-input v-model="model.deviceType" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="责任人" prop="mantianPerson">
            <el-select v-model="model.maintainPersonId" class="query-item" style="width: 150px" placeholder="责任人" clearable @clear="handleQuery">
              <el-option v-for="item in mantianPersons" :key="item.key" :label="item.text" :value="item.key" @click.native="onChangeMaintainPerson(item.text)" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="计划日期" prop="planTime">
            <el-date-picker v-model="model.planTime" align="center" placeholder="计划日期" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="query-item" style="width: 200px" @change="handleChangeQueryDate" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="10" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label=" " prop=" " />
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-button type="primary" class="query-item" @click="submitCreateWithNewID">提交</el-button>
          <el-button class="query-item" @click="visible = false">取消</el-button>
        </el-col>
        <span style="color: #5FB878">提交后在下方添加计划点检内容</span>
      </el-row>
      <el-row style="background: #c0ccda; margin-top: 20px">
        <el-col :xl="10" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label=" " prop=" " />
        </el-col>
      </el-row>
      <el-row>
        <content-create v-if="showContent" ref="ContentCreate" @refreshContentList="refreshContentList" />
      </el-row>
      <el-row>
        <content-index v-if="showContent" ref="ContentIndex" />
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!--      <el-button type="primary" @click="submitCreate">提交</el-button>-->
      <!--      <el-button @click="visible = false">取消</el-button>-->

    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultCreateViewData from '@/utils/viewData/create'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'
import ContentCreate from '@/views/maintain/plan/contentCreate'
import ContentIndex from '@/views/maintain/plan/contentIndex'

export default {
  components: {
    // Pagination: () => import('@/components/Pagination'),
    ContentCreate: () => import('./contentCreate'),
    ContentIndex: () => import('./contentIndex')
    // DialogDetail: () => import('./detail')
  },
  data() {
    const curModels = models.maintian.plan
    const curApi = api.maintain.plan

    return {
      ...getDefaultCreateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '新建点检计划',
        showContent: false,
        model: curModels.create,
        roleTypes: [],
        companies: [],
        roles: [],
        departs: [],
        zhixis: [],
        factories: [],
        processDepts: [],
        sections: [],
        mantianPersons: [],
        newPlanId: null,
        needInputOptions: [{
          key: '是',
          text: '是'
        }, {
          key: '否',
          text: '否'
        }],
        maintainTypes: [{
          key: '日',
          text: '日'
        }, {
          key: '周',
          text: '周'
        }, {
          key: '月',
          text: '月'
        }, {
          key: '报修点检',
          text: '报修点检'
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    async initCreateBefore() {
      this.roleTypes = this.$parent.roleTypes
      this.departs = this.$parent.departs
      this.zhixis = this.$parent.zhixis
      this.factories = this.$parent.factories
      this.processDepts = this.$parent.processDepts
      this.sections = this.$parent.sections
      this.mantianPersons = this.$parent.persons
      // 页面刷新，丢失数据
      // this.getRoles(this.model.roleType, this.model.companyId)
    },
    onChangeDepart(val) {
      this.model.deptName = val
    },
    onChangeMaintainPerson(val) {
      this.model.maintainPersonName = val
    },
    onChangeZhixi(val) {
      this.model.zhixi = val
    },
    onChangeFactory(val) {
      this.model.factory = val
    },
    onChangePrecessDept(val) {
      this.model.processDeptName = val
    },
    // 切换角色类型
    changeRoleTypeHandle() {
      // 1、2类角色用户，选择了3、4类角色，验证所属企业下拉框
      this.rules.companyId[0].required = this.user.roleType <= 2 && this.model.roleType >= 3
      // 重置模型类
      this.model.companyId = null
      this.roles = []
      this.model.roleId = null
      // 重新获取角色
      if (this.model.roleType === 2) {
        this.getRoles(2, null)
      }
    },
    // 切换企业
    async changeCompanyHandle() {
      this.roles = []
      this.model.roleId = null
      if (this.model.roleType && this.model.companyId) {
        this.getRoles(this.model.roleType, this.model.companyId)
      }
    },
    // 获取角色列表
    getRoles(roleType, companyId) {
      return api.system.role.getSelectlist(roleType, companyId).then(response => {
        this.roles = response.data || []
      })
    },
    // submitCreateBefore() {
    //   this.model.applyPersonId = this.user.id // 绑定当前用户
    //   this.model.applyPersonName = this.user.name // 绑定当前用户
    //   console.log('userid' + this.user.id)
    //   console.log('name' + this.user.name + '|' + this.user.displayName)
    // },
    submitCreateAfter(val) {
      // 清空部分数据
      this.showContent = true
      console.log('val:' + val)
      this.model.productCode = null
      this.model.deviceNo = null
      this.model.opDescription = null
      this.newPlanId = val
      ContentCreate.data().model.maintianId = val
      console.log('提交计划信息后' + ContentCreate.data().model.maintianId)

      ContentIndex.data().query.maintianId = val
      console.log('提交计划信息后1' + val)
      // this.$refs.ContentIndex.query.maintianId = val
      console.log('提交计划信息后2' + val)
      this.$refs.ContentIndex.getqueryData(val)
      console.log('提交计划信息后3' + val)
    },
    refreshContentList() {
      console.log('refesh' + this.$refs.ContentIndex.$data.query.maintianId)
      this.$refs.ContentIndex.getDatas()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

