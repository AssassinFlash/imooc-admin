<template>
  <!-- 渲染多级menu菜单 -->
  <el-sub-menu
    v-if="route.children && route.children.length > 0"
    :index="route.path"
  >
    <template #title>
      <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
    </template>
    <!-- 循环渲染，自己调用自己，如果没children就会渲染MenuItem -->
    <SidebarItem v-for="item in route.children" :key="item.path" :route="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
  </el-menu-item>
</template>

<script setup>
import MenuItem from '@/layout/components/Sidebar/MenuItem'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>

</style>
