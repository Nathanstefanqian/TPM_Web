<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle"
             :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <div class="tool-group">
          <el-select v-model.trim="query.deptId" class="query-item" style="width:150px" placeholder="选择部门" clearable
                     @change="deptChange()">
            <el-option v-for="item in departs" :key="item.key" :label="item.text" :value="item.key"/>
          </el-select>
          <el-select v-model.trim="query.productCode" class="query-item" style="width:150px" placeholder="选择设备"
                     clearable>
            <el-option v-for="item in devices" :key="item.productCode" :label="item.deviceNo"
                       :value="item.productCode"/>
          </el-select>
          <el-button @click="resetQRCode">重置</el-button>
          <el-button type="primary" style="margin: 20px" @click="makeQRCode">生成二维码</el-button>

        </div>
      </div>
    </div>
    <el-form ref="form" label-position="right" :model="model" >
      <el-row>
        <el-col>
          <el-form-item>
            <div style="display: flex; flex-direction: row">
              <el-table ref="codeForm" :data="useList" style="width: 200px">
                <el-table-column type="selection" align="center" width="35"/>
                <el-table-column label="序号" type="index" align="center" width="65" fixed/>
                <el-table-column label="点检内容" prop="content" align="center" show-overflow-tooltip/>
              </el-table>
              <img :src="blobimg" alt="">
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import getDefaultDetailViewData from '@/utils/viewData/detail'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'
// import { getContentList, makeQRCode, selectEquipment} from "../../../api/maintain/modules/plan";

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
      useList: [],
      departs: [],
      devices: [],
      eqType: null,
      eqMaintainPlainId: null,
      productCode: null,
      blobimg: null,
      fileName: ''
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.resetQRCode()
    this.fileName = ''
  },
  methods: {
    ...crud,
    // 生成二维码
    makeQRCode() {
      const selectList = []
      const sortedArr = this.$refs.codeForm.selection.sort((a, b) => {
        return a.sort - b.sort
      })
      sortedArr.forEach((item, index) => {
        if (index === 0) {
          this.fileName += item.sort
        } else {
          this.fileName += '-' + item.sort
        }
        selectList.push(item.id)
      })
      if (this.query.productCode == null) {
        this.$message({type: 'warning', message: '请选择设备'})
        return
      }
      api.maintain.plan.makeQRCode({
        productCode: this.query.productCode,
        contentIdList: selectList,
        eqMaintainPlanId: this.eqMaintainPlainId
      }).then(res => {
        let blobObj = new Blob([res], {type: 'image/png'})
        let url = window.URL.createObjectURL(blobObj);
        this.blobimg = url
        let a = document.createElement('a')
        a.href = url
        a.download = this.query.productCode + " " + this.model.maintainType.replace('点检', ' ') + this.fileName + '.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        this.fileName = ''
      })
    },
    // 重置
    resetQRCode() {
      this.query.deptId = null
      this.query.productCode = null
      // this.query.type = null
      // this.eqType = null
    },
    // 下拉选择部门发生变化时
    deptChange() {
      const data = {
        deptId: this.query.deptId,
        type: this.eqType
      }
      // 获取设备下拉框
      this.getEquipments(data)
    },
    // 下拉选择设备发生变化时
    deviceChange(item) {
      this.productCode = item.productCode
    },
    initDetailBefore() {
      this.useList = []
    },
    initDetailAfter(row, data) {
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
        // this.useList.sort((a, b) => (a.content > b.content) ? 1 : ((b.content > a.content) ? -1 : 0))
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
