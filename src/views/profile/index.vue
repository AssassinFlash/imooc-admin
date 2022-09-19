<template>
  <div class="">
    {{ $t('test.msg') }}

    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :page-count="1000"
    />
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
