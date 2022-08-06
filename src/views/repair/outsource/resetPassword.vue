<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-resetPassword'" title="重置密码" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :model="model" :rules="rules" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="密码" prop="password">
            <el-input v-model="model.password" type="password" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import api from '@/api'
import setRule from '@/utils/validate'

export default {
  data() {
    return {
      visible: false,
      loading: false,
      labelWidth: '120px',
      model: { id: null, password: null },
      rules: {
        password: setRule('密码', [{ required: true }, { length: [0, 20] }])
      }
    }
  },
  methods: {
    init(row) {
      this.model.id = row.id
      this.visible = true
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.loading = true
        api.system.user.resetPassword(this.model).then(response => {
          this.model.password = null
          this.loading = false
        }).catch(reject => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
