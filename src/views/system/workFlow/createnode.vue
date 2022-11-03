<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="节点名称" prop="name">
            <el-input v-model="model.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="处理人" prop="checkerName">
            <!--            <el-input v-model="model.checkerName" />-->
            <el-select v-model="model.checkId" filterable class="query-item" clearable>
              <el-option v-for="(item) in checkPersons" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--      <el-row>-->
      <!--        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">-->
      <!--          <el-form-item label="所属流程" prop="flowId">-->
      <!--            &lt;!&ndash;            {{ model.flowId }}&ndash;&gt;-->
      <!--            <el-input v-model="model.flowId" />-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <!--      <el-row>-->
      <!--        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">-->
      <!--          <el-form-item label="节点名称" prop="name">-->
      <!--            <el-input v-model="model.name" />-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <!--      <el-row>-->
      <!--        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">-->
      <!--          <el-form-item label="checkType" prop="checkType">-->
      <!--            <el-input v-model="model.checkType" />-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <!--      <el-row>-->
      <!--        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">-->
      <!--          <el-form-item label="checkId" prop="checkId">-->
      <!--            <el-input v-model="model.checkId" />-->
      <!--          </el-form-item>-->
      <!--          &lt;!&ndash;          <el-form-item label="签核人" prop="roleId">&ndash;&gt;-->
      <!--          &lt;!&ndash;            <el-select v-model="model.roleId" filterable clearable>&ndash;&gt;-->
      <!--          &lt;!&ndash;              <el-option v-for="item in roles" :key="item.key" :label="item.text" :value="item.key" />&ndash;&gt;-->
      <!--          &lt;!&ndash;            </el-select>&ndash;&gt;-->
      <!--          &lt;!&ndash;          </el-form-item>&ndash;&gt;-->
      <!--        </el-col>-->
      <!--      </el-row>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitCreate">提交</el-button>
      <el-button @click="visible = false">取消</el-button>
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
import { cloneDeep } from 'lodash'

export default {
  props: {
    flowId: null
  },
  data() {
    const curModels = models.system.flowNodes
    const curApi = api.system.flowNodes
    return {
      ...getDefaultCreateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '增加流程节点',
        model: curModels.create,
        checkPersons: []
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
    async initCreateBefore() {
      this.model.flowId = this.flowId
      this.model.checkType = '2'
      // 页面刷新，丢失数据
      // this.getRoles(this.model.roleType, this.model.companyId)
    },
    submitCreateAfter() {
      // 清空部分数据
      this.model.name = null
      // this.model.checkType = null
      this.model.checkId = null
      // 刷新父窗口
      this.$emit('getFlowNode', this.flowId)
    },
    getPersons() {
      api.system.user.getSelectlist().then(response => {
        // this.repairPersons = response.data || []
        this.checkPersons = cloneDeep(response.data)
      }).catch(reject => {
      })
    }
  }
}
</script>
