<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <div class="tool-group">
          <el-select v-model.trim="query.deptId" class="query-item" style="width:150px" placeholder="选择部门" @change="deptChange()" clearable>
            <el-option v-for="item in departs" :key="item.key" :label="item.text" :value="item.key" />
          </el-select>
          <el-select v-model.trim="query.type" class="query-item" style="width:150px" placeholder="选择设备" @change="deviceChange()" clearable>
            <el-option v-for="item in devices" :key="item.key" :label="item.deviceNo" :value="item.productCode" />
          </el-select>
          <el-button @click="resetQRCode">重置</el-button>
        </div>
      </div>
    </div>
    <el-form ref="form" label-position="right" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col>
          <el-form-item label="点检内容">
            <el-table ref="codeForm" :data="useList" style="width: 100%">
              <el-table-column type="selection" align="center" width="35"/>
              <el-table-column label="序号" type="index" align="center" width="65" fixed />
              <el-table-column label="点检内容" prop="content" align="center" show-overflow-tooltip />
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" @click="makeQRCode" style="margin: 20px">生成二维码</el-button>
    <img :src="blobimg">
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultDetailViewData from '@/utils/viewData/detail'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'
import {getContentList, makeQRCode, selectEquipment} from "../../../api/maintain/modules/plan";

export default {
  data() {
    const curModels = models.maintian.plan
    const curApi = api.maintain.plan
    return {
      ...getDefaultDetailViewData(), ...curModels, curApi,
      ...{
        dialogTitle: '生成二维码',
        model: curModels.detail,
        functions: []
      },
      contentList: [],
      useList:[],
      departs: [],
      devices: [],
      eqType: null,
      eqMaintainPlainId: null,
      productCode: null,
      blobimg: null
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    // 生成二维码
    makeQRCode() {
      let selectList = []
      this.$refs.codeForm.selection.forEach((item,index)=>{
        selectList.push(item.id)
      })
      let qrdata = {
        productCode: this.productCode,
        contentIdList: selectList,
        eqMaintainPlanId: this.eqMaintainPlainId
      }
      console.log(qrdata)
      api.maintain.plan.makeQRCode(qrdata).then(res => {
        this.blobimg = window.URL.createObjectURL(res)
        this.$message({ type: 'success', message: '生成二维码成功'})
      })
    },
    // 重置
    resetQRCode() {
      this.query.deptId = null
      this.query.type = null
      this.eqType = null
    },
    // 下拉选择部门发生变化时
    deptChange() {
      let data = {
        deptId : this.query.deptId,
        type: this.eqType
      }
      // 获取设备下拉框
      this.getEquipments(data)
    },
    // 下拉选择设备发生变化时
    deviceChange() {
      this.productCode = this.query.type
    },
    initDetailBefore(){
      this.useList=[]
    },
    initDetailAfter(row, data){
      this.getPlanContent(this.model.id)
      this.getDeparts()
      this.eqType = data.deviceType
      this.eqMaintainPlainId = data.id
    },
    // 获取点检计划内容详情
    getPlanContent(maintainId) {
      this.loading = true
      return api.maintain.plan.getContentList(maintainId).then(res => {
        this.useList = res.data.items
        this.useList.sort((a,b) => (a.content > b.content) ? 1 : ((b.content > a.content) ? -1 : 0))
        this.loading = false
      }).catch(reject => {
        this.loading = false
      })
    },
    // 获取部门下拉列表
    getDeparts() {
      return api.system.department.getSelectParentList().then(response => {
        this.departs = response.data || []
      })
    },
    // 获取设备下拉列表
    getEquipments(data) {
      return api.maintain.plan.selectEquipment(data).then(response => {
        this.devices = response.data || []
      })
    }
    // getContent(){
    //   this.getContentInfo()
    // },
    // async getContentInfo(){
    //   const a = await this.curApi.getContentList(this.model.id, this.query.deptId)
    //   this.contentList=a.data.items
    //   for (var i = 0; i < this.contentList.length; i++) {
    //     if (this.contentList[i].maintainId === this.model.id) {
    //       this.useList.push(this.contentList[i])
    //     }
    //   }
    //   this.useList.sort((a,b) => (a.content > b.content) ? 1 : ((b.content > a.content) ? -1 : 0))
    // }

  }
}
</script>

<style lang="scss" scoped>
</style>
