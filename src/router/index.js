import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Modules/Login/Login.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: to => {
      return 'login'
    },
    hidden: true
  },
  {
    path: '/login',
    name: '登录',
    component: Login,
    hidden: true
  }
]

const router = new Router({
  // mode:'history', //这样url就没有/#/XXX,而是常见的url形式
  routes: routes, // short for routes: routes
  linkActiveClass: 'active', // router-link的选中状态的class，也有一个默认的值
  history: true
})

export default router
