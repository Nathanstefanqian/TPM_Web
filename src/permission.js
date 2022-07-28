import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/token'
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') { // 直接访问
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.access) { // 访问权限数据是否存在（刷新页面后消失）
        next()
      } else {
        try {
          // 重新获取权限
          const { access } = await store.dispatch('account/getAccess')
          // 生成动态路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', access)
          // 添加路由
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('account/resetToken')
          Message.error(error || '权限获取发生错误')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else { // 无token
    if (whiteList.indexOf(to.path) !== -1) { // 白名单内，直接访问
      next()
    } else { // 跳转登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
