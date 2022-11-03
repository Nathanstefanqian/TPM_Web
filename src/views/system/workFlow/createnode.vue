<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属流程" prop="flowId">
            <!--                        {{ model.flowId }}-->
            <el-input v-model="model.flowId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="节点名称" prop="name">
            <el-input v-model="model.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="审批类型" prop="checkType">
            <!--            <el-input v-model="model.checkType" />-->
            <el-radio v-model="model.checkType" :label="1" border>角色</el-radio>
            <el-radio v-model="model.checkType" :label="2" border>用户</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="处理人" prop="checkId">
            <el-select v-model="model.checkId" filterable class="query-item" clearable>
              <el-option v-for="item in checkPersons" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
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
    submitCreateAfter() {
      // 清空部分数据
      this.model.flowId = null
      this.model.name = null
      this.model.checkType = null
      this.model.checkId = null
    },
    getPersons() {
      api.system.user.getSelectlist().then(response => {
        // this.repairPersons = response.data || []
        this.checkPersons = cloneDeep(response.data)
        console.log(this.checkPersons)
      }).catch(reject => {
      })
    }
  }
}
</script>
