<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        maxlength="20"
        clearable
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
      />
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <Markdown
            ref="markdownRef"
            :detail="detail"
            @create="onCreateArticle"
            @update="onUpdateArticle"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { articleDetail, createArticle, editArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Markdown from '@/views/article-create/components/Markdown'

const i18n = useI18n()
const route = useRoute()
const router = useRouter()

const markdownRef = ref(null) // markdown组件对象

const title = ref('') // 文章标题
const detail = ref({}) // 文章内容
const activeName = ref('markdown')

// 监听提交按钮，触发创建文章
const onCreateArticle = async (content) => {
  if (title.value === '') {
    ElMessage.error('文章标题不能为空')
    return
  }
  await createArticle(title.value, content)
  ElMessage.success(i18n.t('msg.article.createSuccess'))
  title.value = ''
  markdownRef.value.clearContent()
}

// 监听提交按钮，触发修改文章
const onUpdateArticle = async (content) => {
  if (title.value === '') {
    ElMessage.error('文章标题不能为空')
  }
  await editArticle(route.params.id, title.value, content)
  ElMessage.success(i18n.t('msg.article.editSuccess'))
  title.value = ''
  markdownRef.value.clearContent()
  await router.push(`/article/${route.params.id}`)
}

// 监听文章ID，看是否有传值
watch(() => route.params.id, async () => {
  if (route.params.id) {
    // 有文章ID就获取文章详情
    detail.value = await articleDetail(route.params.id)
    title.value = detail.value.title
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
