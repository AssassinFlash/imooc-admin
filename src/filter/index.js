import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import store from '@/store'

const dataFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

// 处理相对时间
dayjs.extend(rt)
const relativeTime = (val) => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

// 将上面的函数挂载到app对象的全局属性上
export default function installFilter(app) {
  app.config.globalProperties.$filter = {
    dataFilter: dataFilter,
    relativeTime: relativeTime
  }
}
