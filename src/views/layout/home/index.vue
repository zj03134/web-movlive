<template>
  <div>
    <!-- 头部header区域 -->
    <van-nav-bar fixed>
      <template #left>
        <!-- <img class="logo" src="../../assets/toutiao_logo.png" alt="" /> -->
        <img class="logo" :src="imgObj" />
      </template>
      <template #right>
        <van-icon name="search" size="0.48rem" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 频道导航 -->
    <van-tabs offset-top="1.226667rem" v-model="channelId" sticky animated>
      <van-tab v-for="item in channelList" :name="item.id" :key="item.id" :title="item.name">
        <!-- 下拉加载更多 使用的vant中的list -->
        <ArticleList :chnId="channelId"></ArticleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 图片的路径
import logoPng from '@/assets/images/logo.png'
// 获取到频道数据调用这个函数
import { userChaneListAPI } from '@/api/index.js'
// 注册组件
import ArticleList from './ArticleList'
export default {
  // 注册子路由
  components: {
    ArticleList
  },
  // 调试的时候方便程序员代码的调试
  name: 'Home',
  data() {
    return {
      // logo图片
      imgObj: logoPng,
      // 频道数组
      channelList: [],
      // 记录当前激活频道的ID 默认是推荐
      channelId: 0
    }
  },
  async created() {
    // 获取的是用户选中的列表
    const res = await userChaneListAPI()
    // 把从后台获取的数据赋值给channelList数组，然后循环这个数组中的对象
    this.channelList = res.data.data.channels
  }
}
</script>

<style scoped lang="less">
.logo {
  width: 100px;
  height: 30px;
}
/* tab内容距离tab导航的距离 */
/deep/ .van-tabs__content {
  padding-top: 44px;
}
</style>
