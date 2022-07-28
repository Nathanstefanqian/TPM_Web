import * as accountApi from '@/api/account/index'
import { setToken } from '@/utils/token'
import router, { resetRouter } from '@/router'
import store from '@/store'

const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  access: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    localStorage.setItem('token', token)
    state.token = token
  },
  SET_USER: (state, user) => {
    localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  },
  SET_ACCESS: (state, access) => {
    state.access = access
  }
}

const actions = {
  // 登录
  login({ commit }, loginModel) {
    return new Promise((resolve, reject) => {
      accountApi.login(loginModel).then(response => {
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', response.data.user)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取权限
  getAccess({ commit }) {
    return new Promise((resolve, reject) => {
      accountApi.getAccess().then(response => {
        const access = response.data
        if (!access) {
          reject('请重新登录！')
        }
        // 缓存access
        commit('SET_ACCESS', access)
        resolve({ access })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      accountApi.logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        localStorage.removeItem('token')
        commit('SET_USER', { userName: null, roleType: null, roleName: null })
        localStorage.removeItem('user')
        commit('SET_ACCESS', null)
        store.dispatch('tagsView/delAllVisitedViews')
        // store. commit('DEL_ALL_VISITED_VIEWS')
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      localStorage.removeItem('token')
      commit('SET_USER', { userName: null, roleType: null, roleName: null })
      localStorage.removeItem('user')
      commit('SET_ACCESS', null)
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { access } = await dispatch('getAccess')

      resetRouter()

      // generate accessible routes map based on access
      const accessRoutes = await dispatch('permission/generateRoutes', access, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
