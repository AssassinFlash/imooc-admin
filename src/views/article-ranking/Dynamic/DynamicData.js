// 动态表格的列数据
import i18n from '@/i18n'

const t = i18n.global.t

// 导出是函数的话，每次调用都会重新创建，这样方便使用t函数实现国际化
// 如果导出的是数据，那么数据一开始就定死了，语言变化的时候数据也不会发生变化
const getDynamicData = () => {
  return [
    {
      label: t('msg.article.ranking'),
      prop: 'ranking'
    },
    {
      label: t('msg.article.title'),
      prop: 'title'
    },
    {
      label: t('msg.article.author'),
      prop: 'author'
    },
    {
      label: t('msg.article.publicDate'),
      prop: 'publicDate'
    },
    {
      label: t('msg.article.desc'),
      prop: 'desc'
    },
    {
      label: t('msg.article.action'),
      prop: 'action'
    }
  ]
}

export default getDynamicData
