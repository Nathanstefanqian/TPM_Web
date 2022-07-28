import api from '@/api'

const state = {
  enums: {
    roleType: [],
    userState: [],
    buoyStatus: [],
    gpsStatus: []
  }
}

const mutations = {
  INIT_ENUMS: (state, enums) => {
    state.enums = enums
  }
}

const actions = {
  init({ commit }) {
    api.enumerate.getAll().then(response => {
      const enums = response.data
      commit('INIT_ENUMS', enums)
    }).catch(reject => {
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

