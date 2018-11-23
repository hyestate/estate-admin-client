import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    /*
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue')
    },
    {
      path: '/sysUser',
      name: 'sysUser',
      component: () => import('./views/SysUser.vue')
    },
    */
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['./components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children:[
        {
            path: '/dashboard',
            component: resolve => require(['./components/page/Dashboard.vue'], resolve),
            meta: { title: '系统首页' }
        },
        {
          path: '/table',
          component: resolve => require(['./components/page/BaseTable.vue'], resolve),
          meta: { title: '基础表格' }
        },
        {
            path: '/404',
            component: resolve => require(['./components/page/404.vue'], resolve),
            meta: { title: '404' }
        },
        {
            path: '/403',
            component: resolve => require(['./components/page/403.vue'], resolve),
            meta: { title: '403' }
        }
      ]
    },
    {
        path: '*',
        redirect: '/404'
    }
  ]
})
