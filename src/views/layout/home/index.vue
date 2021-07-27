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
    <!-- 编辑频道图标 -->
    <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="show = true" />

    <!-- 弹出层组件 -->
    <van-popup v-model="show" class="edit_wrap">
      <!-- 弹出层的主体区域 -->
      <ChanneEdit
        @close="closeFn"
        :userChannelList="channelList"
        @add="addFn"
        @remove="removeFn"
        @changeChannel="channgeChannelFn"
      ></ChanneEdit>
    </van-popup>
  </div>
</template>

<script>
// 图片的路径
import logoPng from '@/assets/images/logo.png'
// 获取到频道数据调用这个函数
import { userChaneListAPI, updateChannelListAPI } from '@/api/index.js'
// 注册组件
import ArticleList from './ArticleList'
import ChanneEdit from './ChanneEdit'
export default {
  // 注册子路由
  components: {
    ArticleList,
    ChanneEdit
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
      channelId: 0,
      show: false
    }
  },
  async created() {
    // 获取的是用户选中的列表
    const res = await userChaneListAPI()
    // 把从后台获取的数据赋值给channelList数组，然后循环这个数组中的对象
    this.channelList = res.data.data.channels
  },
  methods: {
    // 对象-加入到数组里
    // async addFn(obj) {
    //   this.channelList.push(obj)
    //   this.editFn()
    // },
    // 弹层关闭-重置编辑频道状态
    // 数据处理
    async editFn(obj, index, type) {
      // 编辑频道
      if (type === 'add') {
        this.channelList.push(obj)
      }
      const arr = this.channelList.filter(obj => {
        return obj.id !== 0
      }) // 先过滤掉id为0的推荐频道, 把剩余的数组返回
      console.log(arr)

      const resultList = arr.map((item, index) => {
        const newObj = { ...item } // 浅拷贝(让对象和原数组脱离关系)
        newObj.seq = index + 1
        delete newObj.name // 删除对象里name键值对
        return newObj
      })
      // map会收集每次遍历return的值形成一个新数组
      console.log(resultList)
      await updateChannelListAPI({
        channels: resultList
      })
    },
    // 删除用户频道id
    removeFn(obj) {
      const index = this.channelList.findIndex(item => item.id === obj.id)
      this.channelList.splice(index, 1)
      this.updateFn()
    },
    // 切换频道
    channgeChannelFn(obj) {
      this.channelId = obj.id // 传过来的频道ID, 影响tabs默认v-model的选择
    },
    // 关闭弹出层
    closeFn() {
      // 设置为false
      this.show = false
    }
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
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
/* 频道编辑弹出层铺满屏幕 */
.edit_wrap {
  width: 100%;
  height: 100%;
}
</style>
