<template>
  <div class="tag-view-container">
    <router-link
      class="tag-view-item"
      v-for="(tag, index) in tagViewList"
      :key="tag.fullPath"
      :to="tag.path"
      :class="{ active: tag.path === $route.path }"
      :style="{
        background:
          tag.path === $route.path ? $store.getters.cssVar.menuBg : '',
        borderColor:
          tag.path === $route.path ? $store.getters.cssVar.menuBg : ''
      }"
    >
      {{ tag.title }}
      <el-icon @click.prevent="closeTag(tag, index)"><Close /></el-icon>
    </router-link>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
// 标签列表
const tagViewList = ref([])

// 关闭该标签
const closeTag = (tag, index) => {
  const tagViewListVal = tagViewList.value
  // 1.标签列表只有一个
  if (tagViewListVal.length === 1) {
    // 1.1 是个人中心，不给删
    if (tag.path === '/profile') {
      return
    } else {
      router.push('/profile')
    }
  } else {
    // 2.删除的是选中的标签
    if (tag.path === route.path) {
      // 2.1 index为1，路由跳转到后一个标签
      if (index === 0) {
        router.push(tagViewListVal[index + 1].path)
      } else {
        // 2.2 否则路由跳到前一个标签
        router.push(tagViewListVal[index - 1].path)
      }
    }
    // 3.删除的是未选中的标签，直接删
  }
  store.commit('app/removeTag', tag)
}

// 监听语言变化，更改标签列表的title
watch(
  () => store.getters.language,
  () => {
    store.commit('app/changeTagViewList')
    tagViewList.value = store.getters.tagViewList
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.tag-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px rgba($color: #000000, $alpha: 0.1);

  .tag-view-item {
    display: inline-block;
    position: relative;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    background: #fff;
    padding: 0 8px;
    margin-left: 5px;
    margin-top: 4px;
    font-size: 12px;
    color: #495060;
    cursor: pointer;

    &.active {
      color: #fff;
      &::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 4px;
      }
    }

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    .el-icon {
      width: 16px;
      height: 16px;
      line-height: 10px;
      position: relative;
      top: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.2s;

      &:hover {
        background: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
