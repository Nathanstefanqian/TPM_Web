import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 过滤路由
 * @param routes asyncRoutes
 * @param access
 */
export function filterAsyncRoutes(routes, access) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (typeof route.access === 'undefined') {
      res.push(tmp)
    } else if (access[route.access] && access[route.access].allow) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, access[route.access])
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, access) {
    return new Promise(resolve => {
      let accessedRoutes = []
      accessedRoutes = filterAsyncRoutes(asyncRoutes, access)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
