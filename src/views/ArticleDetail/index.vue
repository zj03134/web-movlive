<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ artObj.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="artObj.aut_name" :label="artObj.pudate">
        <template #icon>
          <img :src="artObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="artObj.is_followed" @click="follwedFn(true)">已关注</van-button>
            <van-button icon="plus" type="info" v-else size="mini" plain @click="follwedFn(false)">关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small" v-if="artObj.attitude === 1" @click="LoveFn(false)"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="LoveFn(true)">点赞</van-button>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="cmt-list" :class="cmtShow ? 'art-cmt-container-1' : 'art-cmt-container-2'">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <comment-list :obj="commentList"></comment-list>
      </van-list>
    </div>
    <!-- 文章评论底部容器 -->
    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="cmtShow">
      <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="cmtShow = false">发表评论</div>
      <div class="icon-box">
        <van-badge :content="totalCount" max="99">
          <van-icon @click="moveFn" name="comment-o" size="0.53333334rem" />
        </van-badge>
        <van-icon name="star-o" size="0.53333334rem" />
        <van-icon name="share-o" size="0.53333334rem" />
      </div>
    </div>

    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else>
      <textarea v-model="commentText" @blur="blurFn" placeholder="友善评论、理性发言、阳光心灵" v-fofo></textarea>
      <van-button @click="sendFn" type="default" :disabled="commentText.length === 0">发布</van-button>
    </div>
  </div>
</template>

<script>
import { articleAPI, unFollowedUserAPI, authorFollwedAPI, authorLikeAPI, articleDisLikeAPI } from '@/api/article.js'
// 文章下属的评论列表(发起人引是文章详情页面，把输入传给commentList展示)
import { commitListAPI, commentSendAPI } from '@/api/comment.js'

import CommentList from './Commenlist'
export default {
  components: {
    CommentList
  },
  data() {
    return {
      // 文章详情对象
      artObj: {},
      // 评论列表
      commentList: [],
      // 评论区域（默认第一套显示）
      cmtShow: true,
      // 评论总数量
      totalCount: 0,
      // 评论的内容
      commentText: '',
      // 底部加载状态
      loading: false,
      // 底部完成状态
      finished: false,
      // 下一页(偏移id), 一定初始值null(第一页不需要传, axios遇到null忽略此参数)
      lastId: null
    }
  },
  methods: {
    // 获取文章详情
    async getArticle() {
      const res = await articleAPI({
        art_id: this.$route.params.aid
      })
      this.artObj = res.data.data
      console.log(res)
    },
    // 关注
    async follwedFn(bool) {
      // 用户点击的是已关注按钮
      if (bool === true) {
        // 业务------>取消关注
        // 调用接口 --->取消关注接口
        // 页面要显示 -->关注按钮
        this.artObj.is_followed = false
        await authorFollwedAPI({
          aut_id: this.artObj.aut_id
        })
      } else {
        // 业务---->关注
        // 调用接口---->关注接口
        // 页面显示---->已关注按钮
        this.artObj.is_followed = true
        await unFollowedUserAPI({
          aut_id: this.artObj.aut_id
        })
      }
    },
    // 点赞
    async LoveFn(fool) {
      // 用户点在了点赞按钮上
      if (fool === true) {
        // 业务-----点赞文章
        // 显示-----已点赞文章
        this.artObj.attitude = 1
        await authorLikeAPI({
          target: this.$route.params.aid
        })
      } else {
        // 用户点在了取消点赞按钮
        // 业务----取消点赞文章
        // 显示-----点赞文章
        this.artObj.attitude = -1
        await articleDisLikeAPI({
          artId: this.$route.params.aid
        })
      }
    },
    // 拿到评论列表数据
    async getCommentListFn() {
      const res = await commitListAPI({
        // 拿路由的(artObj需要网络请求)
        artId: this.$route.params.aid,
        // 分页
        lastId: this.lastId
      })
      // 保存下一页起始的评论id
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
      this.lastId = res.data.data.last_id
      // 数据合并
      this.commentList = [...this.commentList, ...res.data.data.results]
      // console.log(this.commentList)
      // 总数量(如果前面为0.直接显示空字符串(徽标上声明都不要))
      this.totalCount = res.data.data.total_count || ''
      // 关闭加载状态
      this.loading = false
    },
    // 移动到评论区
    moveFn() {
      // 在真是的DOM上获取点赞容器，让他出现在屏幕的顶端
      document.querySelector('.like-box').scrollIntoView({
        // 添加一个过渡动画(固定的)
        behavior: 'smooth'
      })
    },
    // 评论失焦事件
    blurFn() {
      setTimeout(() => {
        this.cmtShow = true
      })
    },
    // 发布评论
    // 为何点击发布，这里不执行，因为v-if和v-else失去焦点了
    // ，发布评论2标签销毁了，来不及执行事件方法
    // 解决： 失去焦点，在定时器中修改cmtShow的值，先让点击事件执行
    // 评论失去焦点事件
    async sendFn() {
      // console.log(this.commentText)
      const res = await commentSendAPI({
        // 传给后台
        artId: this.artObj.art_id,
        // 传给后台
        sendText: this.commentText
      })
      // console.log(res)
      this.commentList.unshift(res.data.data.new_obj)
      // 评论总数量加1
      this.totalCount++
      // 问题：为何获取不到最新的Dom标签
      // 原因：数据改变-->真实Dom更新异步的(下面的代码先执行了，获取不到最新的DOM)
      // 解决：$nextTick等待当前环节真实DOm更新后，在执行函数里的代码
      // this.$nextTick(() => {
      //   const result = document.querySelectorAll('.cmy-item')
      //   result[0].scrollIntoView({
      //     // 添加动画
      //     behavior: 'smooth'
      //   })
      // })
      // 让最新的评论展示
      this.moveFn()
    },
    // 加载更多
    onLoad() {
      // 重新加载 修改BUG
      if (this.commentList.length > 0) {
        this.getCommentListFn()
      }
      // this.getCommentListFn()
    }
  },
  created() {
    this.getArticle()
    this.getCommentListFn()
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
