<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list">
      <!-- 评论的 Item 项 -->
      <div class="cmt-item" v-for="item in obj" :key="item.com_id">
        <!-- 头部区域 -->
        <div class="cmt-header">
          <!-- 头部左侧 -->
          <div class="cmt-header-left">
            <img :src="item.aut_photo" alt="" class="avatar" />
            <span class="uname">{{ item.aut_name }}</span>
          </div>
          <!-- 头部右侧 -->
          <div class="cmt-header-right">
            <!-- true是点亮了，false是没有点亮 -->
            <van-icon name="like" size="16" color="red" @click="LoveFn(true, item)" v-if="item.is_liking === true" />
            <van-icon name="like-o" size="16" color="gray" @click="LoveFn(false, item)" v-else />
          </div>
        </div>
        <!-- 主体区域 -->
        <div class="cmt-body">
          {{ item.content }}
        </div>
        <!-- 尾部区域 -->
        <div class="cmt-footer">{{ item.pubdate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { commentUnLikeAPI, commentLikeAPI } from '@/api/comment.js'
export default {
  props: {
    obj: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // obj是传过来的对象
    LoveFn(bool, comObj) {
      // console.log(ObjEct)
      // 想法----点击取消
      if (bool === true) {
        // 点在了红星上
        // 业务----取消红星
        // 调用===>取消红星接口
        comObj.is_liking = false
        // 显示===>灰色星
        commentLikeAPI({
          comId: comObj.com_id
        })
      } else {
        // 点在了灰星上
        // 业务----显示红星
        // 调用===>红星接口
        // 显示===>红星
        comObj.is_liking = true
        commentUnLikeAPI({
          comId: comObj.com_id
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
</style>
