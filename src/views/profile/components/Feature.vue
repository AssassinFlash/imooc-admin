<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item
      v-for="item in features"
      :key="item.id"
      :name="item.id"
      :title="item.title"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  features: {
    type: Array,
    required: true
  }
})

const activeNames = ref(['1'])
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}
</style>
