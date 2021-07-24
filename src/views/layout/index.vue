<template>
  <div>
    <div class="home_container">
      <router-view />
    </div>
    <!-- 底部导航  replace替换路由路径（无法回退）-->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/layout/home" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/layout/user" replace>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout'
}
</script>

<style>
/* 内容底部内边距(把内容往上挤压, 防止内部被底部导航挡住) */
.home_container {
  padding-bottom: 50px;
}
/* 底部导航上边框 */
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
