<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <!-- 搜索列表结果 -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <ArtivleItem
          v-for="item in articleList"
          :key="item.art_id"
          :obj="item"
          @click="clickFn(item.art_id)"
        ></ArtivleItem>
      </van-list>
    </div>
  </div>
</template>

<script>
// 自定义组件上的事件(事件都是自定义事件)
import ArtivleItem from '@/components/ArticleItem.vue'
import { searchListAPI } from '@/api/search.js'
// import { timeAgo } from '@/utils/data.js'
export default {
  name: 'SearchResult',
  // 注册
  components: {
    ArtivleItem
  },
  data() {
    return {
      // 搜索结果列表
      articleList: [],
      // 当前页码
      page: 1,
      // 底部加载状态(加载中)
      loading: false,
      // 底部是否加载完成
      finished: false
    }
  },
  methods: {
    // 触底执行事件
    onLoad() {
      this.page++
      this.getListFn()
    },
    // 获取列表
    async getListFn() {
      const res = await searchListAPI({
        q: this.$route.params.kewords, // 拿到关键词, keywords来源于router/index.js你定义的动态路由参数名
        page: this.page
      })
      console.log(res)
      if (res.data.data.results.length === 0) {
        // 没有数据了
        this.finished = true // 加载完成
      } else {
        this.articleList = [...this.articleList, ...res.data.data.results]
        this.loading = false // 本次加载完成
      }
    },
    // 点击跳转到详情页面
    clickFn(aid) {
      this.$router.push(`/article/${aid}`)
    }
  },
  created() {
    this.getListFn()
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
AS
