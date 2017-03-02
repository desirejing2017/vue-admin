import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/userinfo'
import loading from './modules/loading'
import router from './modules/router'
import leftmenu from './modules/leftmenu'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    loading,
    router,
    leftmenu
  },
  strict: debug
})

