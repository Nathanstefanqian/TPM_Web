<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="职系" prop="ezhixi">
            <el-select v-model="model.ezhixi" filterable clearable @change="changeRoleTypeHandle()">
              <el-option v-for="item in zhixis" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备编号" prop="edeviceNo">
            <el-input v-model="model.edeviceNo" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="验收日期" prop="eacceptanceDate">
            <el-date-picker v-model="model.eacceptanceDate" align="center" placeholder="选择日期" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="query-item" style="width: 200px" @change="handleChangeQueryDate" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="公司(法人)" prop="ecompany">
            <el-input v-model="model.ecompany" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="U行程(mm)" prop="eustroke">
            <el-input v-model="model.eustroke" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属工段" prop="esection">
            <el-select v-model="model.esection" class="query-item" style="width: 150px" placeholder="所属工段" clearable @clear="handleQuery">
              <el-option v-for="item in Sections" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="保养人员" prop="emaintianPersonId">
            <el-select v-model="model.emaintianPersonId" class="query-item" style="width: 150px" placeholder="保养人员" clearable @clear="handleQuery">
              <el-option v-for="item in MaintianPersons" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备功率" prop="epower">
            <el-input v-model="model.epower" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="是否联网" prop="eisonline">
            <el-input v-model="model.eisonline" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="V行程" prop="evstroke">
            <el-input v-model="model.evstroke" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备名称" prop="ename">
            <el-input v-model="model.ename" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="责任人" prop="eresponsiblePersonId">
            <el-select v-model="model.eresponsiblePersonId" class="query-item" style="width: 150px" placeholder="请选择" clearable @clear="handleQuery">
              <el-option v-for="item in ResponsiblePersons" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="创建日期" prop="createTime">
            <el-date-picker v-model="model.createTime" align="center" placeholder="选择日期" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="query-item" style="width: 200px" @change="handleChangeQueryDate" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="是否数控" prop="eisdigit">
            <el-input v-model="model.eisdigit" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="主轴最高转速" prop="erotateSpeed">
            <el-input v-model="model.erotateSpeed" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备品牌" prop="ebrand">
            <el-input v-model="model.ebrand" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="责任单位" prop="eresponsibleDept">
            <el-select v-model="model.eresponsibleDept" class="query-item" style="width: 150px" placeholder="请选择" clearable @clear="handleQuery">
              <el-option v-for="item in responsibleDepts" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="创建用户" prop="createBy">
            <el-select v-model="model.createBy" class="query-item" style="width: 150px" placeholder="请选择" clearable @clear="handleQuery">
              <el-option v-for="item in CreatePersons" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="ip" prop="enetworkAddress">
            <el-input v-model="model.enetworkAddress" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="最大给进速度" prop="epushSpeed">
            <el-input v-model="model.epushSpeed" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备型号" prop="">
            <!--            todo-->
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="加工部" prop="eprocessDept">
            <el-select v-model="model.eprocessDept" class="query-item" style="width: 150px" placeholder="请选择" clearable @clear="handleQuery">
              <el-option v-for="item in processDepts" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="维修课" prop="erepairDept">
            <el-select v-model="model.erepairDept" class="query-item" style="width: 150px" placeholder="请选择" clearable @clear="handleQuery">
              <el-option v-for="item in repairDepts" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="加工精度" prop="eprecision">
            <el-input v-model="model.eprecision" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="机台重量(T)" prop="eweight">
            <el-input v-model="model.eweight" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备类型" prop="emachineType">
            <el-input v-model="model.emachineType" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造处" prop="eproductDept">
            <el-select v-model="model.eproductDept" class="query-item" style="width: 150px" placeholder="请选择" clearable @clear="handleQuery">
              <el-option v-for="item in productDepts" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="维修主管" prop="erepairManagerId">
            <el-select v-model="model.erepairManagerId" class="query-item" style="width: 150px" placeholder="请选择" clearable @clear="handleQuery">
              <el-option v-for="item in repairManagers" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="机台尺寸" prop="esize">
            <el-input v-model="model.esize" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="电压 (V)" prop="epower">
            <el-input v-model="model.epower" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="设备编码" prop="edeviceCode">
            <el-input v-model="model.edeviceCode" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造编号" prop="eproductCode">
            <el-input v-model="model.eproductCode" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="存放区域" prop="estorageArea">
            <el-input v-model="model.estorageArea" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="X行程" prop="exstroke">
            <el-input v-model="model.exstroke" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="气压" prop="eairPressure">
            <el-input v-model="model.eairPressure" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="厂区" prop="efactory">
            <el-select v-model="model.efactory" filterable clearable @change="changeRoleTypeHandle()">
              <el-option v-for="item in factories" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="制造日期" prop="eproductDate">
            <el-date-picker v-model="model.eproductDate" align="center" placeholder="选择日期" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="query-item" style="width: 200px" @change="handleChangeQueryDate" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="存放地点" prop="estoragePosition">
            <el-input v-model="model.estoragePosition" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="Y行程(mm)" prop="eystroke">
            <el-input v-model="model.eystroke" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="刀库容量" prop="eknifeCapacity">
            <el-input v-model="model.eknifeCapacity" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="园区" prop="edistrict">
            <el-select v-model="model.edistrict" filterable clearable @change="changeRoleTypeHandle()">
              <el-option v-for="item in districts" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="入厂日期" prop="eenterDate">
            <el-date-picker v-model="model.eenterDate" align="center" placeholder="选择日期" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="query-item" style="width: 200px" @change="handleChangeQueryDate" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="资产编号" prop="eassetNumber">
            <el-input v-model="model.eassetNumber" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="Z行程(mm)" prop="ezstroke">
            <el-input v-model="model.ezstroke" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="控制器" prop="econtroller">
            <el-input v-model="model.econtroller" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="版本" prop="edition">
            <el-input v-model="model.edition" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="冰机品牌" prop="eiceMachineBrand">
            <el-input v-model="model.eiceMachineBrand" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="冰机序号" prop="eiceMachineNumber">
            <el-input v-model="model.eiceMachineNumber" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="冰机型号" prop="eiceMachineModel">
            <el-input v-model="model.eiceMachineModel" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="冰机功率" prop="eiceMachinePower">
            <el-input v-model="model.eiceMachinePower" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitUpdate">提交</el-button>
      <el-button @click="resetUpdate">重置</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
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
    const curModels = models.equipmentManagement.search
    const curApi = api.equipmentManagement.search
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '编辑设备信息',
        model: curModels.update,
        roleTypes: [],
        functions: [],
        departs: [],
        zhixis: [],
        factories: [],
        processDepts: [],
        Sections: [], // todo 补
        ResponsiblePersons: [], // todo 补
        MaintianPersons: [], // todo 补
        responsibleDepts: [], // todo 补
        repairDepts: [], // todo 补
        CreatePersons: [], // todo
        productDepts: [], // todo 制造处
        repairManagers: [], // todo 维修主管
        districts: [] // TODO 园区
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    // 初始化数据之前 row：行绑定数据
    async initUpdateBefore(row) {
      this.roleTypes = this.$parent.roleTypes
      this.departs = this.$parent.departs
      this.zhixis = this.$parent.zhixis
      this.factories = this.$parent.factories
      this.processDepts = this.$parent.processDepts

      // if (this.user.roleType === 3) {
      //   this.model.type = 4
      //   this.model.companyId = this.user.companyId
      // }
    },
    // 初始化数据之后 row：行绑定数据；data：接口返回数据
    async initUpdateAfter(row, data) {
      console.log(data)
      this.model = data
      // const accesses = data.accesses
      // await this.changeRoleTypeHandle()
      // this.initAccess(accesses)
    },
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
    // 提交前处理
    submitUpdateBefore() {
      this.model.accesses = (this.functions || []).filter(s => s.checked).map(f => {
        return { functionId: f.id, allow: f.checked ? 1 : 0 }
      })
      return true
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

  + .function-level-3 {
    padding-left: 30px;
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
</style>
