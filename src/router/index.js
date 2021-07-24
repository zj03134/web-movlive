import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/index'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/layout/home/index.vue'
import User from '@/views/layout/User/index.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/layout' // 默认展示layout
},
{
  path: '/login',
  component: Login
}, {
  path: '/layout',
  component: Layout,
  name: 'Layout',
  redirect: '/layout/home', // 马上跳转二级路由显示
  children: [
    {
      path: 'home',
      component: Home
    }, {
      path: 'user',
      component: User
    }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router
