<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  box-sizing: border-box;
  padding: 61px 20px 20px 20px;
  overflow: hidden;
}
</style>
