<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white" @click="onHide" />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span
          >我的频道
          <span class="small-title"> 点击{{ isEdit ? '删除' : '进入' }}频道 </span>
        </span>
        <span @click="editFn">{{ isEdit ? '完成' : '编辑' }}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="obj in userChannelList" :key="obj.id" @click="removeFn(obj)">
          <div class="channel-item van-hairline--surround">
            {{ obj.name }}
            <!-- 删除的徽标 -->
            <van-badge color="transparent" class="cross-badge" v-show="isEdit && obj.name !== '推荐'">
              <template #content>
                <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="0.32rem" />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="obj in unChannelList" :key="obj.id" @click="moreFn(obj)">
          <div class="channel-item van-hairline--surround">{{ obj.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { allChannelListAPI } from '@/api/index.js'
export default {
  props: {
    // 用户已选的
    userChannelList: Array
  },
  data() {
    return {
      // 所有频道
      allChannelList: [],
      isEdit: false
    }
  },
  methods: {
    // 点击编辑的时候让小叉号显示
    editFn() {
      // console.log(123)
      this.isEdit = !this.isEdit
    },
    // 关闭
    onHide() {
      this.isEdit = false
    },
    // 更多频道点击事件
    moreFn(thisObj) {
      // 判断只有在编辑状态下在，才可以添加 thisObj是传过来的对象
      if (this.isEdit) {
        this.$emit('add', thisObj)
        // 把当前用户已选的频道数组传给后台
      }
    },
    // 删除频道/进入频道
    removeFn(theObj) {
      if (this.isEdit && theObj.name !== '推荐') {
        this.$emit('remove', theObj)
      } else if (this.isEdit === false) {
        this.$emit('changeChannel', theObj)
        this.$emit('close') // 关闭弹窗
      }
    }
  },
  computed: {
    unChannelList() {
      // 简单写法:
      //   const newArr = []
      //   // (1) 遍历大数组, 取出每个对象
      //   this.allChannelList.forEach((obj) => {
      //     // (2)在小数组里找找在不在?(遍历小数组挨个比较)
      //     const index = this.userChannelList.findIndex(item => {
      //       return item.id === obj.id
      //     })

      //     // 在: 跳过
      //     // 不在: 收集到一个新数组里
      //     if (index === -1) {
      //       newArr.push(obj)
      //     }
      //   })
      //   console.log(newArr)
      //   return newArr

      // filter过滤数组: 函数返回true, filter内部会用新数组收集当前对象, 等待遍历结束, 返回新数组
      return this.allChannelList.filter(obj => {
        return this.userChannelList.findIndex(item => item.id === obj.id) === -1
      })
    }
  },
  async created() {
    const res = await allChannelListAPI()
    console.log(res)
    this.allChannelList = res.data.data.channels
  }
}
</script>

<style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>
