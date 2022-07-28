<template>
  <div class="app-container from">
    <div class="fullscreen">
      <el-form ref="form" v-loading="loading" class="form-body" label-position="right" :model="model" :rules="rules" :label-width="labelWidth||'120px'">
        <el-row>
          <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input v-model="model.oldPassword" type="password" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="model.newPassword" type="password" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
            <el-form-item label="确认新密码" prop="checkNewPassword">
              <el-input v-model="model.checkNewPassword" type="password" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="form-footer">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import setRule from '@/utils/validate'

export default {
  name: 'ChangePassword',
  data() {
    return {
      loading: false,
      labelWidth: '120px',
      model: {
        oldPassword: null,
        newPassword: null,
        checkNewPassword: null
      },
      rules: {
        oldPassword: setRule('原密码', [{ required: true }]),
        newPassword: setRule('新密码', [{ required: true }, { length: [0, 20] }]),
        checkNewPassword: setRule('确认新密码', [{ required: true }, { validator: this.checkNewPassword }])
      }
    }
  },
  methods: {
    checkNewPassword(rule, value, callback) {
      if (value !== this.model.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.loading = true
        api.account.changePassword(this.model).then(response => {
          this.reset()
          this.loading = false
        }).catch(reject => {
          this.loading = false
        })
      })
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
