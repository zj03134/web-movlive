<template>
  <div class="article-item_containe">
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ obj.title }}</span>
          <!-- 单图  判断如果图片等于1张则图片显示这几个图片-->
          <img v-if="obj.cover.type === 1" class="thumb" :src="obj.cover.images[0]" />
        </div>
        <!-- 三张图片  判断如果图片大于1张则图片显示这几个图片-->
        <div class="thumb-box" v-if="obj.cover.type > 1">
          <!-- urlStr:图片的地址字符串 -->
          <img class="thumb" :src="urlStr" v-for="(urlStr, index) in obj.cover.images" :key="index" />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ obj.aut_name }}</span>
            <span>{{ obj.comm_count }}评论</span>
            <span>{{ obj.pubdate }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click="show1 = true" />
        </div>
      </template>
    </van-cell>
    <!-- 一级反馈面版 -->
    <van-action-sheet
      cancel-text="取消"
      get-container="body"
      v-model="show1"
      :actions="actions1"
      @select="onSelectFn"
    />
    <!-- 二级返回面版 -->
    <van-action-sheet
      cancel-text="返回"
      get-container="body"
      v-model="show2"
      :actions="actions2"
      @select="onSelectFn"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { ACTION_SHEET_LEVEL1, ACTION_SHEET_LEVEL2 } from '@/constant'
// 调用请求接口
// import { articleDisLikeAPI } from '@/api/index.js'
export default {
  props: {
    // 文章信息对象
    obj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 一级反馈面板的可见性
      show1: false,
      // 二级面板的可见性
      show2: false,
      // 一级反馈面板的数据
      actions1: ACTION_SHEET_LEVEL1,
      // 二级反馈面板的数据
      actions2: ACTION_SHEET_LEVEL2
    }
  },
  methods: {
    onSelectFn(action) {
      // console.log(action)
      // action绑定的数据对象, index是索引
      if (action.id === 22) {
        // 证明点击的是反馈垃圾内容
        this.show1 = false
        this.show2 = true
      } else if (action.id === 11) {
        this.$emit('dislike', this.action)
        this.show = false // 关闭弹窗
        // await articleDisLikeAPI({
        //   artId:this.artcleObj.art_id
        // })
      }
    },
    // 二级反馈的返回事件
    onCancel() {
      this.show1 = true
      this.show2 = false
    }
  },
  created() {
    // console.log(this.obj)
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
