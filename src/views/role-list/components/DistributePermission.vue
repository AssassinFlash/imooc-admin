<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @closed="closed"
  >
    <!-- node-key：指定该行表示为该行对象的id属性值，也就是说，选中某项就是选中某项的id -->
    <el-tree
      ref="treeRef"
      :data="allPermission"
      :props="defaultProps"
      node-key="id"
      check-strictly
      show-checkbox
      default-expand-all
    />
    <template #footer>
      <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
      <el-button type="primary" @click="onConfirm">
        {{ $t('msg.universal.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { rolePermission, distributePermission } from '@/api/role'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'

// 树形结构的配置选项
const defaultProps = {
  children: 'children', // 指定要展示的子节点为该行节点对象的children属性
  label: 'permissionName' // 标签名为该行节点对象的permissionName属性
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const store = useStore()
const i18n = useI18n()

const treeRef = ref(null) // el-tree对象

const allPermission = ref([]) // 获取所有权限
const getPermissionList = async () => {
  allPermission.value = await permissionList()
  console.log(allPermission.value)
}

// 获取当前角色权限列表
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  console.log(checkedKeys)
  // el-tree对象提供setCheckedKeys方法，给el-tree传入选中的id值
  treeRef.value.setCheckedKeys(checkedKeys)
}

// 关闭弹窗
const closed = () => {
  emit('update:modelValue', false)
}

// 点击确认
const onConfirm = async () => {
  // 为角色分配权限
  // el-tree对象提供getCheckedKeys方法，获取el-tree中选中的值
  const permissions = treeRef.value.getCheckedKeys()
  await distributePermission(permissions, props.roleId)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

// 第一次传来的角色ID为空，所以要做非空判断，当角色id发生改变，重新获取角色对应的权限
watch(
  () => props.roleId,
  () => {
    if (props.roleId) {
      getRolePermission()
    }
  }
)

// 监听语言切换，重新获取所有权限列表
watch(
  () => store.getters.language,
  () => {
    getPermissionList()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
