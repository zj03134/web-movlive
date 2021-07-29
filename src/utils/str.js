// str要被匹配和修改字符串, targetStr是关键字
const lightFn = (str, taegetStr) => {
  // "我是中国人" => "<span>我</span>是中国人"
  // "Java是世界上第二的语言", 'java'

  // / 创建正则对象, i是忽略大小写, g是全局匹配
  const reg = new RegExp(taegetStr, 'ig')
  return str.replace(reg, match => {
    // match就是正则关键字, 匹配到原本字符串里的值
    return `<span style='color: red;'>${match}</span>`
  })
}

export {
  lightFn
}
