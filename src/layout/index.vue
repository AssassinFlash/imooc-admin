<template>
  <div
    class="app-wrapper"
    :class="{ hideSidebar: !$store.getters.sidebarOpened }"
  >
    <!-- 左侧Menu -->
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 头部 -->
        <Navbar />
      </div>
      <!-- 主体内容 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/index'
import Navbar from '@/layout/components/Navbar'
import AppMain from '@/layout/components/AppMain'
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.module.scss';
@import '~@/assets/styles/mixin.scss';

.app-wrapper {
  @include relative;
  @include clearfix;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.3s;
}

.hideSidebar {
  .fixed-header {
    width: calc(100% - #{$hideSidebarWidth});
  }
}
</style>
