<template>
  <div class="navbar">
    <div class="left-menu">
      <!-- 菜单栏收缩展开按钮 -->
      <Hamburger />
      <!-- 面包屑 -->
      <Breadcrumb />
    </div>
    <div class="right-menu">
      <div class="right-menu-item">
        <!-- 更换主题色组件 -->
        <ThemeSelect />
        <!-- 语言切换组件 -->
        <LangSelect />
        <!-- 头像 -->
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <el-avatar
              shape="circle"
              :size="40"
              :src="$store.getters.userInfo.avatar"
            />
            <el-icon>
              <setting />
            </el-icon>
          </div>
          <!-- 下拉菜单 -->
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <router-link to="/">
                <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
              </router-link>
              <a href="#" target="__blank">
                <el-dropdown-item>
                  {{ $t('msg.navBar.course') }}
                </el-dropdown-item>
              </a>
              <el-dropdown-item divided @click="$store.dispatch('user/logout')">
                {{ $t('msg.navBar.logout') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemeSelect from '@/components/ThemeSelect'
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-menu {
    height: 50px;
    display: flex;
    align-items: center;
  }

  .right-menu {
    height: 50px;
    line-height: 50px;
    padding-right: 16px;

    .avatar-container {
      position: relative;
      top: 5px;
      cursor: pointer;

      .el-avatar {
        margin-right: 7px;
      }
    }
  }
}
</style>
