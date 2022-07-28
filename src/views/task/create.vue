<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row v-if="user.roleType<=2">
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="所属企业" prop="companyId">
            <el-select v-model="model.companyId" filterable clearable @change="value=>changeCompanyHandle(value)">
              <el-option v-for="item in companies" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="model.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="任务开始时间" prop="beginTime">
            <el-date-picker
              v-model="model.beginTime"
              align="center"
              placeholder="任务开始时间"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="任务结束时间" prop="endTime">
            <el-date-picker
              v-model="model.endTime"
              align="center"
              placeholder="任务结束时间"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sl="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="model.remark" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="浮标配置" />
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="formBuoys" :model="taskBuoys" :inline="true" class="buoy">
      <el-row v-for="(buoy,index) in taskBuoys.buoys" :key="buoy.key">
        <el-col>
          <el-form-item>
            <el-checkbox v-model="buoy.checked" />
          </el-form-item>
          <el-form-item label="浮标IMEI：">
            {{ buoy.key }}
          </el-form-item>
          <el-form-item label="浮标编号：">
            {{ buoy.text }}
          </el-form-item>
          <el-form-item label="深度：" :prop="'buoys.'+index+'.depth'" :rules="{required:buoy.checked, message:'请输入深度'}">
            <el-input v-model="buoy.depth" style="width:120px">
              <template slot="append">米</template>
            </el-input>
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
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import getDefaultCreateViewData from '@/utils/viewData/create'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  data() {
    const curModels = models.task
    const curApi = api.task
    return {
      ...getDefaultCreateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '添加任务',
        model: curModels.create,
        companies: [],
        taskBuoys: { buoys: [] }
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    initCreateBefore() {
      this.companies = this.$parent.companies
      this.rules.companyId[0].required = this.user.roleType <= 2
      if (this.user.roleType > 2) this.getBuoys(null)
      if (this.model.companyId && this.taskBuoys.buoys.length === 0) this.getBuoys(this.model.companyId)
    },
    changeCompanyHandle(companyId) {
      if (companyId != null) {
        this.getBuoys(companyId)
      } else {
        this.taskBuoys.buoys = []
      }
    },
    getBuoys(companyId) {
      api.buoy.getSelectlistByCompanyId(companyId).then(response => {
        const buoys = response.data || []
        this.taskBuoys.buoys = buoys.map(m => {
          return { ...m, checked: false, depth: null }
        })
      })
    },
    submitCreateBefore() {
      let result = false
      this.$refs.formBuoys.validate((valid) => {
        if (!valid) {
          result = false
          return false
        }
        this.model.taskBuoys = this.taskBuoys.buoys.filter(f => f.checked && f.depth !== null && f.depth !== '').map(m => {
          return { imei: m.key, depth: m.depth }
        })
        if (this.model.taskBuoys === null || this.model.taskBuoys.length === 0) {
          Message.error('请配置浮标')
          result = false
          return false
        }
        result = true
      })
      return result
    },
    submitCreateAfter() {
      // 清空部分数据
      this.model.name = null
    }
  }
}
</script>

<style lang="scss" scoped>
.buoy {
  padding-left: 120px;

  .el-form-item {
    padding-right: 30px;
  }
}
</style>

