import * as types from '../mutation-types'

// initial state
const state = {
  menu_width: '190px',
  menu_flag: true
}

// getters
const getters = {
  menu_width: state => state.menu_width,
  menu_flag: state => state.menu_flag
}

// actions
const actions = {
  set_menu_open: ({
    commit
  }) => {
    commit(types.SET_MENU_OPEN)
  },
  set_menu_close: ({
    commit
  }) => {
    commit(types.SET_MENU_CLOSE)
  }
}

// mutations
const mutations = {
  [types.SET_MENU_OPEN] (state) {
    state.menu_width = '190px'
    state.menu_flag = true
  },
  [types.SET_MENU_CLOSE] (state) {
    state.menu_width = '50px'
    state.menu_flag = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
