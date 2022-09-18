<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>
<script>
export default {
  name: 'Hamburger'
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
