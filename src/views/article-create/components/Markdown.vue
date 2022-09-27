<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  detail: {
    type: Object
  }
})

const emit = defineEmits(['create', 'update'])

const store = useStore()
const route = useRoute()

const content = ref('') // 文章内容
let mkEditor // markdown对象
let el // 目标元素

// 生成markdown对象
const initEditor = () => {
  mkEditor = new MKEditor({
    el,
    height: '500px',
    previewStyle: 'vertical', // 预览
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

// 点击提交
const onSubmitClick = () => {
  content.value = mkEditor.getHTML()
  // 如果有文章ID，则此次提交视为修改，如果没有文章ID，则此次提交视为创建
  if (route.params.id) {
    emit('update', content.value)
  } else {
    emit('create', content.value)
  }
}

// 清空mkEditor的内容
const clearContent = () => {
  content.value = ''
  mkEditor.reset()
}

// 由于要获取目标元素，因此要在onMounted中调用
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

// 监听语言变化，重新生成markdown
watch(() => store.getters.language, () => {
  if (!el) return
  content.value = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(content.value)
})

// 监听是否有文章详情传进来，有就赋值到内容中
watch(() => props.detail, () => {
  if (JSON.stringify(props.detail) !== '{}' && props.detail.content) {
    mkEditor.setHTML(props.detail.content)
  }
}, { immediate: true })

// 把清空内容方法导出去
defineExpose({ clearContent })
</script>

<style lang="scss" scoped>
.bottom {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
