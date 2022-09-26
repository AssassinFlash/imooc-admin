import getDynamicData from './DynamicData'
import store from '@/store'
import { ref, watch } from 'vue'

const dynamicData = ref(getDynamicData()) // table所有的列表头
const selectLabel = ref([]) // 多选框中选中的列表头
const tableColumns = ref([]) // 选中的要展示到table的列表头

// 初始化时默认全部选中
const initSelectLabel = () => {
  selectLabel.value = dynamicData.value.map((column) => column.label)
}

// 监听语言变化，重新获取国际化后的列表头
watch(
  () => store.getters.language,
  () => {
    dynamicData.value = getDynamicData()
    initSelectLabel()
  },
  { immediate: true }
)
// 监听多选框中选中的列表头，动态更新要展示到table的列表头
watch(
  selectLabel,
  (list) => {
    tableColumns.value = []
    // 从所有列表头中筛选出选中的列表头
    const selectColumns = dynamicData.value.filter((column) => {
      return list.includes(column.label)
    })
    tableColumns.value.push(...selectColumns)
  },
  { immediate: true }
)

export {
  dynamicData,
  selectLabel,
  tableColumns
}
