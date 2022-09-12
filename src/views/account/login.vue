<template>
  <div class="login">
    <div class="title-container">
      <h3 class="title">{{ title }}</h3>
    </div>
    <el-form ref="loginForm" :model="loginAccount" :rules="rules" class="login-form" autocomplete="on" label-position="left">
      <el-form-item prop="username">
        <span class="input-left-icon">
          <i class="iconfont vue-icon-user" />
        </span>
        <el-input
          ref="username"
          v-model="loginAccount.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip v-model="capslockTooltip" content="大写锁定已打开" placement="right" manual>
        <el-form-item prop="password">
          <span class="input-left-icon">
            <i class="iconfont vue-icon-keys" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginAccount.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capslockTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="input-right-icon" @click="passwordVisible=!passwordVisible">
            <i class="iconfont" :class="eyeStyle" />
          </span>
        </el-form-item>
      </el-tooltip>
      <!--      <el-form-item prop="captcha" class="captcha-input-container">-->
      <!--        <span class="input-left-icon">-->
      <!--          <i class="iconfont vue-icon-captcha" />-->
      <!--        </span>-->
      <!--        <el-input-->
      <!--          ref="captcha"-->
      <!--          v-model="loginAccount.captcha"-->
      <!--          placeholder="验证码"-->
      <!--          name="captcha"-->
      <!--          type="text"-->
      <!--          tabindex="3"-->
      <!--          autocomplete="off"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <div class="captcha-image-container">-->
      <!--        <img class="captcha" :src="captchaImage" alt="点击更换" height="46" width="120" @click="handleGetCaptcha">-->
      <!--      </div>-->
      <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">登 录</el-button>
    </el-form>
  </div>
</template>

<script>
import { title } from '@/settings'
import setRule from '@/utils/validate'
import api from '@/api'
import { parseTime } from '@/utils'
// import { Message } from 'element-ui'

export default {
  name: 'Login',
  data() {
    return {
      title,
      loginAccount: {
        username: process.env.NODE_ENV === 'development' ? 'superadmin' : null,
        password: process.env.NODE_ENV === 'development' ? '111111' : null,
        captcha: null,
        captchaToken: null
      },
      rules: {
        username: setRule('账号', [{ required: true, trigger: 'change' }]),
        password: setRule('密码', [{ required: true, trigger: 'change' }])
        // captcha: setRule('验证码', [{ required: true, trigger: 'change' }, { fixedLength: 4 }])
      },
      passwordVisible: false,
      capslockTooltip: false,
      loading: false,
      showDialog: false,
      captchaImage: null,
      redirect: undefined,
      otherQuery: {}
    }
  },
  computed: {
    passwordType() {
      return this.passwordVisible ? 'text' : 'password'
    },
    eyeStyle() {
      return this.passwordVisible ? 'vue-icon-eye-open' : 'vue-icon-eye-close'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // this.handleGetCaptcha()
  },
  mounted() {
    if (this.loginAccount.username === '') {
      this.$refs.username.focus()
    } else if (this.loginAccount.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        this.capslockTooltip = shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')
      }
      if (key === 'CapsLock' && this.capslockTooltip === true) {
        this.capslockTooltip = false
      }
    },
    handleGetCaptcha() {
      this.loginAccount.captchaToken = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + (Math.floor(Math.random() * 9000) + 1000)
      api.account.getCaptcha(this.loginAccount.captchaToken).then(response => {
        this.captchaImage = response.data
      }).catch(reject => {
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('account/login', this.loginAccount)
            .then(() => {
              if (this.redirect.indexOf('/login')) this.redirect = null
              this.$router.push({ path: this.redirect || '/dashboard', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              // this.handleGetCaptcha()
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark-bg: #2d3a4b;
$darker-bg: #283443;
$dark-gray: #889aa4;
$light-gray: #eee;
$cursor: #fff;

.login {
  min-height: 100%;
  width: 100%;
  background-color: $dark-bg;
  overflow: hidden;

  .title-container {
    padding-top: 100px;
    padding-bottom: 20px;
    text-align: center;

    .title {
      display: inline-block !important;
      padding-left: 180px;
      font-size: 34px;
      font-weight: 400;
      color: $light-gray;
      height: 120px;
      line-height: 120px;
      margin: 0;
      background-image: url("/images/logo.png");
      background-position: left center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  &-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 30px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: $cursor;

      .el-input {
        display: inline-block;
        height: 48px;
        width: 85%;
        margin-left: 35px;

        /deep/ input {
          background: transparent;
          border: 0;
          -webkit-appearance: none;
          border-radius: 0;
          padding: 12px 5px 12px 15px;
          color: $light-gray;
          height: 48px;

          &:-webkit-autofill {
            box-shadow: 0 0 0 1000px $darker-bg inset !important;
            -webkit-text-fill-color: $cursor !important;
          }
        }
      }

      .input-left-icon {
        position: absolute;
        width: 48px;
        height: 48px;
        line-height: 48px;
        display: inline-block;
        padding: 0 12px;
        color: $dark-gray;

        .iconfont {
          font-size: 22px;
        }
      }

      .input-right-icon {
        position: absolute;
        right: 0;
        width: 48px;
        height: 48px;
        line-height: 48px;
        cursor: pointer;
        padding: 0 12px;
        user-select: none;
        color: $dark-gray;

        .iconfont {
          font-size: 22px;
        }
      }
    }

    .el-button {
      width: 100%;
      margin-bottom: 30px;
      font-size: 18px;
      line-height: 26px;
    }

    .captcha-input-container {
      width: 300px;
      float: left;
    }

    .captcha-image-container {
      float: right;
      width: 120px;
      height: 50px;
      margin-top: 2px;

      .captcha {
        float: left;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
}
</style>
