<template>
  <!-- 因为menu的index都是通过path来绑定的，所以指定激活菜单直接使用path即可 -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="$route.path"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <template
      v-for="(route, i) in generateMenus(filterRoutes($router.getRoutes()))"
      :key="i"
    >
      <SidebarItem :route="route"/>
    </template>
  </el-menu>
</template>

<script setup>
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem'
</script>

<style scoped>

</style>
