<template>
  <div class="article-detail-container">
    <h2 class="title">{{ detail.title }}</h2>
    <div class="header">
      <span class="author">
        {{ $t('msg.article.author') }}: {{ detail.author }}
      </span>
      <span class="time">
        {{ $t('msg.article.publicDate') }}:
        {{ $filter.relativeTime(detail.publicDate) }}
      </span>
      <el-button type="text" class="edit" @click="onEditClick">
        {{ $t('msg.article.edit') }}
      </el-button>
    </div>
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script setup>
import { articleDetail } from '@/api/article'
import { useRoute, useRouter } from 'vue-router'
import { ref, onActivated } from 'vue'

const route = useRoute()
const router = useRouter()

const detail = ref({}) // 文章详情

const getArticleDetail = async () => {
  detail.value = await articleDetail(route.params.id)
}
getArticleDetail()

// 点击编辑文章
const onEditClick = () => {
  router.push(`/article/editor/${route.params.id}`)
}

// 缓存组件重新激活时重新获取文章详情
onActivated(() => {
  getArticleDetail()
})
</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    padding: 12px 0;
    text-align: center;
    font-size: 22px;
  }

  .header {
    padding: 26px 0;

    .author {
      margin-right: 20px;
      font-size: 14px;
      color: #555666;
    }

    .time {
      margin-right: 20px;
      font-size: 14px;
      color: #999aaa;
    }

    .edit {
      float: right;
    }
  }

  .content {
    padding: 20px 0;
    font-size: 14px;
    border-top: 1px solid #d4d4d4;
  }
}
</style>
