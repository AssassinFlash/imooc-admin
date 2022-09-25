<template>
  <div class="">
    <el-card>
      <!-- 渲染树形结构，必须要指定row-key，指定row中的hasChildren来指定哪些行包含子节点 -->
      <el-table
        :data="allPermission"
        style="width: 100%; margin-bottom: 20px"
        border
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <!-- 权限名称 -->
        <el-table-column
          :label="$t('msg.permission.name')"
          prop="permissionName"
          width="180"
        />
        <!-- 权限备注 -->
        <el-table-column
          :label="$t('msg.permission.mark')"
          prop="permissionMark"
          width="180"
        />
        <!-- 权限描述 -->
        <el-table-column
          :label="$t('msg.permission.desc')"
          prop="permissionDesc"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'

const store = useStore()

const allPermission = ref([]) // 权限列表

// 获取权限列表
const getPermissionList = async () => {
  allPermission.value = await permissionList()
  console.log(allPermission.value)
}

// 监听语言切换，重新获取权限列表
watch(
  () => store.getters.language,
  () => {
    getPermissionList()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
