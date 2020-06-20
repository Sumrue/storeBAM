import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import store from '@/store/index'
import { Message } from 'element-ui'
import userList from '@/page/users/userList'
import roleList from '@/page/auth/roleList'
import authList from '@/page/auth/authList'
import goodsSort from '@/page/goods/goodsSort'
import sortPara from '@/page/goods/sortPara'
import goodsList from '@/page/goods/goodsList'
import goodsAdd from '@/page/goods/goodsAdd'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/userList',
      children: [
        // 角色列表
        {
          path: '/userList',
          component: userList
        },
        // 用户列表
        {
          path: '/roleList',
          component: roleList
        },
        // 权限列表
        {
          path: '/authList',
          component: authList
        },
        // 商品分类
        {
          path: '/goodsSort',
          component: goodsSort
        },
        // 商品参数
        {
          path: '/sortPara',
          component: sortPara
        },
        // 商品列表
        {
          path: '/goodsList',
          component: goodsList
        },
        // 商品列表商品添加
        {
          path: '/goodsAdd',
          component: goodsAdd
        }
      ]
    }
  ]
})

// 设置路由导航前置守卫 判断登录权限
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  if (to.path === '/Login') { // 判断是否是去登录页
    if (!token) { // 是登录页的情况，也要判断是否已登录，已登录就发送错误消息提示，不是则去登录页  通过是否有token来判断
      store.commit('ChangeFullPath', Router.path) // vuex中设置一个共享参数，存放当前的路由地址，方便登陆成功后返回到当前页面
      next()
    } else {
      Message({
        message: '您已经登录，请勿重复登录',
        type: 'error',
        duration: 2000
      })
    }
  } else { // 不是去登录页的情况下
    if (to.meta.requireAuth) { // 判断当前要去的页面的权限， 是否需要验证
      if (!token) {
        store.commit('ChangeFullPath', to.path) // vuex中设置一个共享参数，存放原来要去的路由地址，方便登陆成功后返回原本要去的路由
        next({path: '/Login'})
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
