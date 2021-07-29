import Vue from 'vue'
// 标签添加自动聚焦功能
// 口诀：当你要给标签扩展额外的功能时，自定义指令
// 用法
Vue.directive('fofo', {
  // 指令所在标签，被插入到真实DOM触发一次(仅触发一次)
  inserted(el) {
    // el指令所在的标
    if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
      // el本身的标签名就是input/textarea就直接调用focus
      el.focus()
    } else {
      // 如果本身不是，就试着往里获取在调用focus
      el.querySelector('input').focus()
    }
  }
})
