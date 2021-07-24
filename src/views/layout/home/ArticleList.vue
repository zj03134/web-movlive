<template>
  <div>
    <!-- 下拉加载更多 -->
    <van-pull-refresh v-model="isLoading" @refresh="pullDownRefreshFn">
      <!-- 底部加载更多 -->
      <van-list v-model="loading" :finished="down" finished-text="没有更多了" @load="onLoad">
        <Articleltem v-for="item in articleList" :key="item.art_id" :obj="item"></Articleltem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Articleltem from './components/ArticleItem'
import { articleListAPI } from '@/api/index.js'
// 导入时间格式化后的js文件
import { timeAgo } from '@/utils/data.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      articleList: [],
      // 底部加载状态
      loading: false,
      // 底部是否全部加载完成
      down: false,
      // 保存的是下一页第一条发布的时间
      nextTime: null,
      // 是否处于下拉刷新状态
      isLoading: false
    }
  },
  methods: {
    timeAgo: timeAgo,
    // 底部加载更多
    onLoad() {
      // console.log('下拉加载')
      // 如果有第一页的数据以后，onload再触发请求
      if (this.articleList.length > 0) {
        this.getArticleList()
      }
    },
    // 获取文章的列表
    async getArticleList() {
      // 先调用列表数据
      const resp = await articleListAPI({
        // 这里的channeId 一定要与请求的请求参数必须一致，否则回报错
        channeId: this.chnId,
        timestamp: this.nextTime
      })
      // // 回来的数据进行预处理, 把时间转成多久多久之前
      resp.data.data.results.forEach(obj => {
        // 把获取到的时间对象，赋值给现在的数据
        obj.pubdate = this.timeAgo(obj.pubdate)
      })
      // console.log(res)
      if (resp.data.data.results.length < 10) {
        // 告诉list组件直接底部显示没有更多数据
        this.down = true
      } else {
        // 保存下一页数据的时间(做分页用)
        this.nextTime = resp.data.data.pre_timestamp
        // 把获取到的文章数据赋值给定义的文章数组
        // 把下一页和上一页的数组合并起来
        this.articleList = [...this.articleList, ...resp.data.data.results]
        this.loading = false
      }
    },
    // 点击事件
    chnneiClickFn(channeId) {
      // console.log(channeId)
      // 把获取到的频道ID保存的data变量上
      this.channelId = channeId
      this.getArticleList()
    },
    // 下拉刷新
    async pullDownRefreshFn() {
      // 1、调用了请求
      const resp = await articleListAPI({
        //  直接传递channelId:
        channeId: this.chnId
      })
      // // 把上一页和下一页的数组合并起来
      const { pre_timestamp, results } = resp.data.data
      if (pre_timestamp !== null) {
        // 没有最新的数据
        Toast('没有最新的数据，请稍后重试')
        this.isLoading = false
      } else {
        // 赋值最新的数据
        this.articleList = results
        this.isLoading = false
      }
    }
  },
  components: {
    Articleltem
  },
  props: {
    chnId: Number
  },
  created() {
    this.getArticleList()
  }
}
</script>

<style></style>
