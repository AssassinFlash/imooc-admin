<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <div>{{ item.content }}</div>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { chapter } from '@/api/user'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const chapterData = ref([])
const getChapterData = async () => {
  chapterData.value = await chapter()
}

// 监听语言变化，重新获取章节数据
watch(() => store.getters.language, () => {
  getChapterData()
}, { immediate: true })
</script>

<style lang="scss" scoped>

</style>
