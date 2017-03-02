import * as types from '../mutation-types'
// import {user as UserApi} from '../../config/api.js'
import store from '../../util/store.js'

// initial state
const state = {
  userinfo: store.get('userinfo') || {}
}

// getters
const getters = {
  getUserinfo: state => state.userinfo,
  getToken: state => state.userinfo && state.userinfo.token ? state.userinfo.token : ''
}

// actions
const actions = {
  update_userinfo: ({commit}, {
    userinfo
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_USERINFO, {
        userinfo
      })
      resolve()
    })
  },
  remove_userinfo: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_USERINFO)
      resolve()
    })
  }
}

// mutations
const mutations = {
  [types.UPDATE_USERINFO] (state, userDb) {
    state.userinfo = userDb.userinfo || {}
    store.set('userinfo', state.userinfo)
  },

  [types.REMOVE_USERINFO] (state) {
    store.remove('userinfo')
    state.userinfo = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
