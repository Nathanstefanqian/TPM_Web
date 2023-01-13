<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle"
             :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="选择单位" prop="deptId">
            <el-select
              ref="selectDept"
              v-model="model.deptId"
              class="query-item"
              style="width: 150px"
              placeholder="部门名称"
              clearable
              @clear="handleQuery"
            >
              <el-option
                v-for="item in departs"
                :key="item.key"
                :label="item.text"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="选择机台" prop="deviceName">
            <el-select
              v-model="model.deviceName"
              class="query-item"
              style="width: 150px"
              placeholder="机台名称"
              clearable
              @clear="handleQuery"
            >
              <el-option
                v-for="item in jitaiNames"
                :key="item.key"
                :label="item.text"
                :value="item.text"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="4" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="附件" prop="opDescription">
            <MultipleFile file-type="deviceFile" :file-list="fileList" :limited="1"/>
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
import {mapGetters} from 'vuex'
import getDefaultCreateViewData from '@/utils/viewData/create'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  components: {
    MultipleFile: () => import('@/components/Upload/MultipleFile')
  },
  data() {
    const BASE_URL = process.env.VUE_APP_BASE_API
    const curModels = models.fileManagement.upload
    const curApi = api.fileManagement.upload
    return {
      fileType: 'deviceFile',
      uploadUrl: BASE_URL + '/file/uploadSingleFile',
      fileList: [],
      ...getDefaultCreateViewData(), ...curModels, curApi, rules,
      ...{
        dialogTitle: '文件上传',
        model: curModels.create,
        roleTypes: [],
        companies: [],
        roles: [],
        departs: [],
        jitaiNames: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  methods: {
    ...crud,
    async initCreateBefore() {
      this.departs = this.$parent.departs
      this.roleTypes = this.$parent.roleTypes
      this.companies = this.$parent.companies
      this.getJiTaiName()
      if (this.user.roleType === 3) {
        this.model.roleType = 4
        this.model.companyId = this.user.companyId
      }
      // 页面刷新，丢失数据
      this.getRoles(this.model.roleType, this.model.companyId)
    },

    // 获取机台名称下拉列表
    getJiTaiName() {
      api.equipmentManagement.search.getSelectlist().then(res => {
        this.jitaiNames = res.data || []
      }).catch(reject => {
      })
    },
    // 重写提交方法
    submitCreate() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        if (this.fileList.length<=0) {
          this.$message({
            message: "附件不能为空",
            type: "warning"
          })
          return false
        }
        this.loading = true
        // 钩子，添加提交前执行。返回true，执行删除；返回false，退出
        if (this.submitCreateBefore) {
          if (!this.submitCreateBefore()) {
            this.loading = false
            return false
          }
        }
        // 拷贝数据提交
        const data = _.pick(this.model, Object.keys(this.createReal))
        data.deptName = this.$refs.selectDept.selected.label
        console.log(this.fileList[0].url)
        var fileNameList = this.fileList[0].url.split("/")
        data.fileName = fileNameList[3]
        console.log(fileNameList)
        console.log(data)
        this.curApi
          .create(data)
          .then(() => {
            // 钩子，添加提交后执行。无返回值
            this.$refs['form'].resetFields()
            this.visible = false
            if (this.submitCreateAfter) this.submitCreateAfter()
            // 重新加载列表页
            this.$parent.getDatas()
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      })
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
    submitCreateAfter() {
      // 清空部分数据
      this.model.deptId = null
      this.model.deptName = null
      this.model.deviceName = null
      this.model.fileName = null
      this.fileList = []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

