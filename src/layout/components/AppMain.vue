<template>
  <div class="app-main">
    <!-- 带有切换动画和组件缓存的router-view -->
    <!-- 固定写法 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"/>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { isTag } from '@/utils/tags'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { watch } from 'vue'
import { generateTitle } from '@/utils/i18n'
// 在main中监听路由的变化，添加路由到标签列表
const route = useRoute()
const store = useStore()

watch(
  route,
  (to, from) => {
    if (isTag(to.path)) {
      const {
        fullPath,
        path,
        meta,
        name,
        params,
        query
      } = to
      store.commit('app/addTag', {
        fullPath,
        path,
        meta,
        name,
        params,
        query,
        title: generateTitle(meta.title)
      })
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  min-height: calc(100vh - 50px - 43px);
  position: relative;
  box-sizing: border-box;
  padding: 104px 20px 20px 20px;
  overflow: hidden;
}

.fade-enter-from, .fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-to, .fade-leave-from {
  transform: none;
  opacity: 1;
}
</style>
