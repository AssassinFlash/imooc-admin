// 国际化实现：
// 1.创建message数据源
// 2.创建locale语言变量
// 3.根据语言变量和key切换数据源该显示的值
const message = {
  en: {
    msg: 'hello world'
  },
  zh: {
    msg: '你好世界'
  }
}

const locale = 'zh'
const key = 'msg'
console.log(message[locale][key])
