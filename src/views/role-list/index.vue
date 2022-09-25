<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" style="width: 100%" border>
        <!-- 序号 -->
        <el-table-column
          :label="$t('msg.role.index')"
          type="index"
          width="120"
        />
        <!-- 名称 -->
        <el-table-column :label="$t('msg.role.name')" prop="title" />
        <!-- 描述 -->
        <el-table-column :label="$t('msg.role.desc')" prop="describe" />
        <!-- 分配权限 -->
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onDistributePermissionClick(row)"
              v-permission="'distributeRole'"
            >
              {{ $t('msg.role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限弹窗 -->
    <DistributePermission
      :roleId="selectedRoleId"
      v-model="distributePermissionVisible"
    />
  </div>
</template>

<script setup>
import DistributePermission from './components/DistributePermission'
import { roleList } from '@/api/role'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'

const store = useStore()

const allRoles = ref([]) // 角色列表

const distributePermissionVisible = ref(false) // 控制分配权限弹窗是否显示
const selectedRoleId = ref('') // 选中的角色id
const onDistributePermissionClick = (row) => {
  selectedRoleId.value = row.id
  distributePermissionVisible.value = true
}

// 获取角色列表
const getRoleList = async () => {
  allRoles.value = await roleList()
}

// 解决bug：只有点击不同的角色，弹窗才能重新获取当前角色的权限
// 只要弹窗显示为false，就设置当前选中角色为空，这样弹窗会判断你每次都更改了id，就可重新获取
watch(distributePermissionVisible, (val) => {
  if (!val) selectedRoleId.value = ''
})

// 监听语言切换，重新获取角色列表
watch(
  () => store.getters.language,
  () => {
    getRoleList()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
