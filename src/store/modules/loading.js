import * as types from '../mutation-types'

// initial state
const state = {
  ajax_loading: false
}

// getters
const getters = {
}

// actions
const actions = {
  show_loading: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING)
      resolve()
    })
  },

  hide_loading: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.HIDE_LOADING)
      resolve()
    })
  }
}

// mutations
const mutations = {
  [types.SHOW_LOADING] (state) {
    state.ajax_loading = true
  },

  [types.HIDE_LOADING] (state) {
    state.ajax_loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
