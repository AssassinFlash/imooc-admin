<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb" appear>
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadCrumbData.length - 1" class="no-redirect">
        {{ item.meta.title }}
      </span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const router = useRouter()
// 面包屑数据
const breadCrumbData = ref([])
const getBreadcrumbData = () => {
  breadCrumbData.value = route.matched.filter(route => route.meta.icon && route.meta.title)
  console.log(breadCrumbData.value)
}

// 处理跳转点击
const onLinkClick = (route) => {
  router.push(route.path)
}

watch(route, () => {
  // 当前路由的路由表，比如：在/user/manage中，route.match = [{path: '/user'}, {path: '/user/manage'}]
  // 拿到菜单项对应的路由
  getBreadcrumbData()
}, { immediate: true })

const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>
<script>
export default {
  name: 'Breadcrumb'
}
</script>

<style lang="scss" scoped>
// 将来需要主题替换，所以hover的颜色设置为主题颜色
.breadcrumb {
  height: 50px;
  line-height: 50px;
  display: inline-block;
  margin-left: 10px;

  .redirect {
    color: #666 !important;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: v-bind(linkHoverColor) !important;
    }
  }

  .no-redirect {
    font-size: 16px;
    color: #97a8be !important;
    cursor: text;
  }
}

// 动画
.breadcrumb-enter-from, .breadcrumb-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.breadcrumb-enter-active, .breadcrumb-leave-active {
  transition: all 0.3s;
}

.breadcrumb-enter-to, .breadcrumb-leave-from {
  transform: none;
  opacity: 1;
}
</style>
