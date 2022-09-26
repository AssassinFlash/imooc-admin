import { ref } from 'vue'
import Sortable from 'sortablejs'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const tableRef = ref(null) // 表格对象

// 设置拖拽
const initSortable = (tableData, cb) => {
  // 1.要拖拽的元素
  const el = tableRef.value.$el.querySelector('.el-table__body-wrapper tbody')

  // 配置对象
  Sortable.create(el, {
    // 拖拽时元素的类名
    ghostClass: 'sortable-ghost',
    // 结束时的回调
    async onEnd(event) {
      // 拖拽元素最新的索引和最初的索引
      const { newIndex, oldIndex } = event
      const initRanking = tableData.value[oldIndex].ranking
      const finalRanking = tableData.value[newIndex].ranking

      await articleSort(initRanking, finalRanking)
      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))

      // 解决bug：直接重新获取tableData，表格并不会刷新，需要先将数据置空
      tableData.value = []
      if (cb) {
        await cb()
      }
    }
  })
}

export { tableRef, initSortable }
