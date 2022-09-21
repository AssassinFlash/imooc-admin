<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard class="user-card" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {} from 'vue'
import ProjectCard from './components/ProjectCard.vue'
</script>

<style lang="scss" scoped></style>
