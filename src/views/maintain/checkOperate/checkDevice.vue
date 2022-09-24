<template>
  <el-dialog :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <content-index ref="ContentIndex" />

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitUpdate">提交</el-button>
      <el-button @click="resetUpdate">重置aaa</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultListViewData from '@/utils/viewData/list'
import models from '@/models'
// import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'
import adaptive from '@/directive/el-table'

export default {
  components: {
    ContentIndex: () => import('./contentIndex')
  },
  directives: { adaptive },
  // props: {
  //   checkDeviceVisible: false
  // },
  data() {
    const curModels = models.maintian.operateContent
    const curApi = api.maintain.operateContent
    const curPermission = this.$store.getters.access.maintain.operate
    return {
      ...getDefaultListViewData, ...curModels, curApi, curPermission,
      ...{
        dialogTitle: '设备点检保养',
        model: curModels.update,
        sort: { prop: 'maintain_time', order: 'descending' },
        datas: [],
        visible: false
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    // this.clearAndInitQuery()
    // // this.query.deptId = this.user.deptId
    // this.getDatas()
    // this.getRoleTypes()
    // this.getDeparts()
    // this.getZhixis()
    // this.getFactories()
    // this.getProcessDepts()
    console.log('hahahahahah')
  },
  methods: {
    ...crud// 初始化数据之前 row：行绑定数据
  }
}
</script>

<style lang="scss" scoped>
</style>
