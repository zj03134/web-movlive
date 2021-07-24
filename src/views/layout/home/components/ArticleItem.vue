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
          <van-icon name="cross" @click="show = true" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet get-container="body" v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { Toast } from 'vant'
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
      show: false,
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
    }
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      Toast(item.name)
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
