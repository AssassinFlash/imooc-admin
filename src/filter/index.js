import dayjs from 'dayjs'

const dataFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

// 将上面的函数挂载到app对象的全局属性上
export default function installFilter(app) {
  app.config.globalProperties.$filter = {
    dataFilter: dataFilter
  }
}
