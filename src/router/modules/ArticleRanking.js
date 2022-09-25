// 文章排名
import Layout from '@/layout'

const ArticleRanking = {
  // 指定父路由
  path: '/article',
  component: Layout,
  redirect: '/article/ranking',
  // 指定自己是什么路由
  name: 'articleRanking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    // 对于文章排名页来说，它有一个文章排名页和一个文章详情页
    {
      path: '/article/ranking',
      component: () => import('@/views/article-ranking'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      component: () => import('@/views/article-detail'),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}

export default ArticleRanking
