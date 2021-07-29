<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search
        v-model="kw"
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        v-fofo
        @input="inputFn"
        @keydown.enter="enterFn"
      />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length > 0">
      <div
        class="sugg-item"
        v-for="(str, index) in suggetList"
        :key="index"
        v-html="lightFn(str, kw)"
        @click="suggestClickFn"
      ></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon @click="delFn" name="delete" class="search-icon" />
        </template>
      </van-cell>

      <!-- 搜索历史列表 -->
      <div class="history-list">
        <span class="history-item" v-for="(item, index) in history" :key="index" @click="hisClickFn(item)">{{
          item
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/*
一、需求点击跳转搜索页面
 1、创建搜索页(html+css)
 2、router/index.js---->添加一个一级路由
 2、Home/index.vue----->点击搜索按钮跳转事件到/search路由·

二、需求：搜索框的防抖操作
定义一个防抖操作

三、需求：保存搜索历史
1、输入框回车、点击联想菜单，把关键字存放到history中
问题：切换回来页面不在了，因为页面切换会，重新创建，history为空数组
解决：history值，搜索记录，缓存到本地中
问题2、存了但是watch没有执行
原因：还是被切换，watch没有来得及执行
解决：跳转的push包在宏任务（最后执行）中(最后执行) */
import { suggestAPI } from '@/api/search.js'
import { lightFn } from '@/utils/str.js'
export default {
  data() {
    return {
      kw: '', // 搜索关键字
      // 1、 搜索防抖使用的定时器
      timer: null,
      // 建议关键字列表
      suggetList: [],
      // 搜索历史
      history: JSON.parse(localStorage.getItem('his'))
    }
  },
  methods: {
    // 搜索输入框的input事件
    async inputFn() {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // console.log(this.kw)
        if (this.kw.length === 0) return // 防止空内容触发下面的逻辑
        const res = await suggestAPI({
          q: this.kw
        })
        this.suggetList = res.data.data.options
        console.log(res)
      }, 500)
    },
    // 关键高亮
    lightFn,
    // 输入框的回撤事件
    enterFn() {
      // console.log(12131)
      this.history.push(this.kw)
      // 为了让history缓存起来，在跳转页面
      setTimeout(() => {
        this.$router.push(`/search/${this.kw}`)
      })
    },
    // 点击搜索建议列表显示，跳转到搜索结果
    suggestClickFn(str) {
      this.history.push(this.kw)
      setTimeout(() => {
        this.$router.push(`/search/${str}`)
      })
    },
    // 点击搜索历史跳转
    hisClickFn(str) {
      this.$router.push(`/search/${str}`)
    },
    // 清空搜索历史
    delFn() {
      this.history = []
    }
  },
  // 侦听器
  watch: {
    // history深度监听0
    history: {
      // history:是一个数组
      deep: true,
      // 当history值发生改变的时候，就自动执行方法
      handler() {
        // 本地只能存储字符串类型 把它们转换为字符串
        localStorage.setItem('his', JSON.stringify(this.history))
      }
    }
  },
  // 标签添加自动聚焦功能
  // 口诀当你太给标签扩展额外功能是，自定义指令
  directives: {
    fofo: {
      inserted(el) {
        // 指令所在的标签，被插入到真实Dom触发一次
        // el指令所在的标签
        el.querySelector('input').focus()
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
