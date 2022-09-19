<template>
  <el-dropdown
    trigger="click"
    class="theme-select"
    @command="handleSetColor"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <span>
          <svg-icon icon="change-theme"></svg-icon>
        </span>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 展示弹出层 -->
  <SelectColor v-model="selectColorVisible"/>
</template>

<script setup>
import SelectColor from '@/components/ThemeSelect/components/SelectColor'
import { ref } from 'vue'

const selectColorVisible = ref(false)

// 显示弹窗
const handleSetColor = () => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped>
.theme-select {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;

  :deep(.svg-icon) {
    width: 30px;
    height: 30px;
    position: relative;
    top: 9px;
  }
}
</style>
