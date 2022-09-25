// 创建文章
import Layout from '@/layout'

const ArticleCreate = {
  // 指定父路由
  path: '/article',
  component: Layout,
  redirect: '/article/ranking',
  // 指定自己是什么路由
  name: 'articleCreate',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    // 创建文章路由有一个显示在菜单的路由和一个不显示在菜单的路由
    {
      path: '/article/create',
      component: () => import('@/views/article-create'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () => import('@/views/article-create'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}

export default ArticleCreate
