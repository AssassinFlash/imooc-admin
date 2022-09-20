<template>
  <div class="header-search" :class="{ show: isShow }">
    <span @click.stop="isShow = !isShow">
      <svg-icon icon="search" />
    </span>
    <el-select
      class="header-search-select"
      :placeholder="$t('msg.navBar.headerSearch')"
      ref="selectRef"
      v-model="searchVal"
      filterable
      clearable
      remote
      :remote-method="querySearch"
      @change="onSelect"
    >
      <el-option
        v-for="(option, index) in searchRes"
        :key="index"
        :label="option.item.title.join(' / ')"
        :value="option.item"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import { generateRoutes } from './FuseData'
import Fuse from 'fuse.js'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const searchVal = ref('') // 选择框内容
const isShow = ref(false) // 控制选择框是否显示
const searchRes = ref([]) // 搜索结果
const selectRef = ref(null) // 选择框对象

// 数据源：对于搜索来说，它要搜索的就是菜单，因此，侧边栏菜单为搜索数据源
let searchPool = null
let fuse = null

// 创建数据源
const initPool = () => {
  const routes = filterRoutes(router.getRoutes())
  const menus = generateMenus(routes)
  searchPool = generateRoutes(menus)
}

// 创建模糊搜索对象
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 按优先级排序
    shouldSort: true,
    // 匹配长度超过1就认为是匹配结果
    minMatchCharLength: 1,
    // fuse认为数据源应该是这样的：[{path: '/user/manage', title: ['用户', '用户管理']}]
    keys: [
      // 搜索的权重
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

// 当选择框有内容时，自动启用搜索
const querySearch = (query) => {
  searchRes.value = fuse.search(query)
}
// 当选中某一项时，跳转到该路由
const onSelect = () => {
  router.push(searchVal.value.path)
}

// 当点击其他地方时，关闭搜索，清空搜索框内容
const close = () => {
  isShow.value = false
  selectRef.value.blur()
  searchVal.value = ''
  searchRes.value = []
}
// 当点击其他地方时关闭搜索框
watch(isShow, () => {
  if (isShow.value) {
    document.body.addEventListener('click', close)
  } else {
    document.body.removeEventListener('click', close)
  }
})
// 当语言切换时重新生成数据源和模糊搜索对象
watch(
  () => store.getters.language,
  () => {
    initPool()
    initFuse(searchPool)
  },
  { immediate: true }
)
</script>

<script>
export default {
  name: 'HeaderSearch'
}
</script>

<style lang="scss" scoped>
.header-search {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-right: 10px;
  cursor: pointer;

  :deep(.svg-icon) {
    width: 22px;
    height: 22px;
    margin-right: 10px;
    position: relative;
    top: 5px;
  }

  .header-search-select {
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    transition: width 0.3s;
  }

  :deep(.el-input__inner) {
    font-size: 16px;
    color: #666;
  }

  &.show {
    .header-search-select {
      width: 210px;
    }
  }
}
</style>
