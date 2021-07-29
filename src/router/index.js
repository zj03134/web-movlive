import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/index'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/layout/home/index.vue'
import User from '@/views/layout/User/index.vue'
import Search from '@/views/Search/index.vue'
import SeachResult from '@/views/Search/SearchResult.vue'
import ArticleDetail from '@/views/ArticleDetail'

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
  children: [{
    path: 'home',
    component: Home
  }, {
    path: 'user',
    component: User
  }]
}, {
  path: '/search',
  component: Search
}, {
  // 动态路由第二段路径请传递搜索关键字
  path: '/search/:kewords',
  component: SeachResult
}, {
  path: '/article/:aid',
  component: ArticleDetail
}
]

const router = new VueRouter({
  routes
})

export default router
