<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="header-content">
        <span>动态展示列表数据：</span>
        <el-checkbox-group v-model="selectLabel">
          <el-checkbox
            v-for="column in dynamicData"
            :key="column.label"
            :label="column.label"
          />
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <!-- 表格数据 -->
      <el-table :data="tableData" border ref="tableRef">
        <el-table-column
          v-for="column in tableColumns"
          :key="column.label"
          :label="column.label"
          :prop="column.prop"
        >
          <!-- 创建时间 -->
          <template #default="{ row }" v-if="column.prop === 'publicDate'">
            {{ $filter.relativeTime(row.publicDate) }}
          </template>
          <!-- 操作 -->
          <template #default="{ row }" v-else-if="column.prop === 'action'">
            <el-button type="primary" size="small" @click="onShowClick(row)">
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        v-model:currentPage="page"
        v-model:page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[2, 5, 10, 20]"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { getArticleList, deleteArticle } from '@/api/article'
import { dynamicData, selectLabel, tableColumns } from './Dynamic'
import { tableRef, initSortable } from './sortable'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, watch, onActivated, onMounted } from 'vue'

const store = useStore()
const i18n = useI18n()
const router = useRouter()

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取文章数据
const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

// 当每页条数发生变化
const handleSizeChange = () => {
  getListData()
}
// 当页码发生变化
const handlePageChange = () => {
  getListData()
}

// 点击删除文章
const onRemoveClick = (row) => {
  // 弹出对话框
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    { type: 'warning' }
  )
    .then(async () => {
      // 点击确认
      await deleteArticle(row._id)
      ElMessage.success(i18n.t('msg.article.removeSuccess'))
      // 重新渲染数据
      getListData()
    })
    .catch(() => {
      console.log('取消')
    })
}

// 点击查看文章
const onShowClick = (row) => {
  // 跳转到文章详情页
  router.push(`/article/${row._id}`)
}

// 监听语言切换，重新获取文章数据
watch(
  () => store.getters.language,
  () => {
    getListData()
  },
  { immediate: true }
)

// 缓存组件被激活时调用
// 解决bug：当数据更新时table组件不更新
onActivated(() => {
  getListData()
})

// 由于要获取元素，所以拖拽要在onMounted中实现
onMounted(() => {
  // 解决bug：不能直接传value值，因为刚挂载上去时tableData.value还是空的，需要传响应式数据，这样就不会为空值
  initSortable(tableData, getListData)
})
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;

  .header-content {
    display: flex;
    align-items: center;

    span {
      margin-right: 20px;
    }
  }
}
.pagination {
  width: 500px;
  margin: 20px auto 0;
}

:deep(.sort-ghost) {
  color: #fff !important;
  opacity: 0.6 !important;
  background: #304156 !important;
}
</style>
