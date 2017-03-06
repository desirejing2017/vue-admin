import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Modules/Login/Login'
import Home from '../components/Routerview/Home'
import Content from '../components/Routerview/Content'
import NotFound from '../components/Routerview/NotFound'
import UserList from '../components/Modules/User/List'
import UserEdit from '../components/Modules/User/Edit'

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
  },
  {
    path: '/404',
    component: Home,
    hidden: true,
    children: [{
      path: '',
      component: NotFound
    }]
  },
  {
    path: '/module',
    name: '内容模块',
    component: Home,
    children: [{
      hidden: true,
      path: '',
      redirect: to => {
        return 'user'
      }
    },
    {
      path: 'user',
      name: '用户管理',
      icon: 'inbox',
      component: Content,
      children: [{
        path: '',
        hidden: true,
        redirect: to => {
          return 'list'
        }
      },
      {
        path: 'list',
        name: '用户列表',
        icon: 'reorder',
        component: UserList
      },
      {
        path: 'edit',
        hidden: true,
        name: '编辑用户',
        icon: 'edit',
        component: UserEdit
      }]
    }]
  }
]

const router = new Router({
  // mode:'history', //这样url就没有/#/XXX,而是常见的url形式
  routes: routes, // short for routes: routes
  linkActiveClass: 'active', // router-link的选中状态的class，也有一个默认的值
  history: true
})

export default router
