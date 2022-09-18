<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        imooc-admin
      </h1>
    </div>
    <el-scrollbar>
      <SidebarMenu/>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from '@/layout/components/Sidebar/SidebarMenu'

const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  .el-avatar {
    background: none;
  }

  .logo-title {
    margin-left: 10px;
    color: white;
    font-weight: normal;
    font-size: 20px;
    white-space: nowrap;
  }
}
</style>
