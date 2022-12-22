<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="点检内容名称" prop="content">
            <el-input v-model="model.content" style="width: 300px; margin-left: 50px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="是否绑定扫码" prop="isBind">
            <div style="width: 300px; margin-left: 50px">
              <el-radio v-model="model.isBind" label="0" border>否</el-radio>
              <el-radio v-model="model.isBind" label="1" border>是</el-radio>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="是否输入数据" prop="needInput">
            <div style="width: 300px; margin-left: 50px">
              <el-radio v-model="model.needInput" label="0" border>否</el-radio>
              <el-radio v-model="model.needInput" label="1" border>是</el-radio>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitUpdate">提交</el-button>
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
import _ from "lodash";
export default {
  props: {
    maintainId: null
  },
  data() {
    const curModels = models.maintian.planContent
    const curApi = api.maintain.planContent
    return {
      ...getDefaultCreateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '修改点检内容',
        model: curModels.update
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    submitUpdateAfter() {
      // 刷新父窗口
      this.$emit('getContentInfo', this.maintainId)
    }
  }
}
</script>
