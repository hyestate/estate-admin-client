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
          path:'/templateModify',
          component: resolve => require(['./components/common/modify.vue'], resolve),
          meta:{
            keepAlive: false,
            title: '数据编辑',
          },
        },
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
          path: '/users',
          component: resolve => require(['./components/page/users.vue'], resolve),
          meta: { title: '用户管理' }
        },
        {
          path: '/sys_users',
          component: resolve => require(['./components/priv/sysUsers.vue'], resolve),
          meta: { title: '管理员管理' }
        },
        {
          path: '/sys_roles',
          component: resolve => require(['./components/priv/sysRoles.vue'], resolve),
          meta: { title: '角色管理' }
        },
        {
          path: '/sys_user_roles',
          component: resolve => require(['./components/priv/sysUserRoles.vue'], resolve),
          meta: { title: '用户角色关系管理' }
        },
        {
          path: '/sys_table_privs',
          component: resolve => require(['./components/priv/sysTablePrivs.vue'], resolve),
          meta: { title: '表权限管理' }
        },
        {
          path: '/sys_column_privs',
          component: resolve => require(['./components/priv/sysColumnPrivs.vue'], resolve),
          meta: { title: '字段权限管理' }
        },
        {
          path: '/mytest',
          component: resolve => require(['./components/test/MyTest.vue'], resolve),
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
