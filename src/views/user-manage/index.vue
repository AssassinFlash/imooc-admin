<template>
  <div class="user-manage-container">
    <!-- 头部 -->
    <el-card class="header">
      <div>
        <el-button type="primary" @click="$router.push('/user/import')">
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button type="success">{{ $t('msg.excel.exportExcel') }}</el-button>
      </div>
    </el-card>
    <!-- 用户列表 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 序号 -->
        <el-table-column label="#" type="index" />
        <!-- 用户名 -->
        <el-table-column :label="$t('msg.excel.name')" prop="username" />
        <!-- 联系方式 -->
        <el-table-column :label="$t('msg.excel.mobile')" prop="mobile" />
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <!-- 拿到这一行的数据 -->
          <template #default="{ row }">
            <el-image
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
              style="width: 60px; height: 60px"
            />
          </template>
        </el-table-column>
        <!-- 用户角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filter.dataFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('msg.excel.action')" fixed="right">
          <template #default>
            <div>
              <el-button type="primary" size="small">
                {{ $t('msg.excel.show') }}
              </el-button>
              <el-button type="info" size="small">
                {{ $t('msg.excel.showRole') }}
              </el-button>
              <el-button type="danger" size="small">
                {{ $t('msg.excel.remove') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:currentPage="page"
        v-model:page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        background
        layout="total,prev,pager,next,sizes,jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { useStore } from 'vuex'

const store = useStore()

// 数据相关
const tableData = ref([]) // 表格数据
const total = ref(0) // 总数据条数
const page = ref(1) // 页码
const size = ref(5) // 每页显示条数

// 获取用户列表数据
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

// 监听页码和每页条数的变化，重新获取用户列表数据
watchEffect(async () => {
  await getListData()
})

// 监听语言变化，重新获取用户列表数据
watch(
  () => store.getters.language,
  () => {
    getListData()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

:deep(.el-pagination__sizes) {
  margin-left: 10px;
}
</style>
