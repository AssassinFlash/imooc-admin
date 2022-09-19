<template>
  <div class="screen-full" @click="toggle">
    <el-tooltip :content="$t('msg.navBar.screenfull')">
      <span>
        <svg-icon :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"/>
      </span>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

const isFullScreen = ref(false)

// 处理点击事件
const toggle = () => {
  screenfull.toggle()
}
// 监听screenfull
// on 监听
const change = () => {
  isFullScreen.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', change)
})
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
<script>
export default {
  name: 'ScreenFull'
}
</script>

<style lang="scss" scoped>
.screen-full {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-right: 10px;

  :deep(.svg-icon) {
    width: 30px;
    height: 30px;
    position: relative;
    top: 9px;
  }
}
</style>
