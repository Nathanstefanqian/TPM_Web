<template>
  <div>
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="8" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="点检内容" prop="content">
            <el-input v-model="model.content" />
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="是否输入数据" prop="mantianPerson">
            <el-select v-model="model.needInput" class="query-item" style="width: 150px" placeholder="责任人" clearable @clear="handleQuery">
              <el-option v-for="item in needInputOptions" :key="item.key" :label="item.text" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label=" " prop="mantianPerson">
            <el-button type="primary" class="query-item" @click="submitCreate">确认添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultCreateViewData from '@/utils/viewData/create'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  data() {
    const curModels = models.maintian.planContent
    const curApi = api.maintain.planContent
    return {
      ...getDefaultCreateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '添加角色',
        model: curModels.create,
        roleTypes: [],
        functions: [],
        companies: [],
        newPlanId: null,
        needInputOptions: [{
          key: '是',
          text: '是'
        }, {
          key: '否',
          text: '否'
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.model.maintianId = ''
  },
  methods: {
    ...crud,
    async initCreateBefore() {
      // this.model.maintianId = ''
      // console.log('初始化 newid' + this.$parent.newPlanId)
      // this.companies = this.$parent.companies
      // if (this.user.roleType === 3) {
      //   this.model.type = 4
      //   this.model.companyId = this.user.companyId
      //   await this.getFunctions(this.model.type)
      // }
    },
    // 提交前处理
    submitCreateBefore() {
      console.log('提交前处理 newid' + this.model.maintianId)
      // this.model.maintianId = this.$parent.newPlanId
      return true
    },
    submitCreateAfter() {
      // 清空部分数据
      // this.model.name = null
      this.$emit('refreshContentList')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

