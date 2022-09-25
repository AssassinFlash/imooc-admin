<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
    :close-on-click-modal="false"
  >
    <!-- 选中状态绑定的值：label，当选中label，就会把label值赋给v-model -->
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      />
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">
          {{ $t('msg.universal.cancel') }}
        </el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'updateRole'])

const store = useStore()
const i18n = useI18n()

const allRoleList = ref([]) // 所有角色
const userRoleTitleList = ref([]) // 多选框中选中的角色

// 获取所有角色
const getRoleList = async () => {
  allRoleList.value = await roleList()
}

// 获取当前用户所属的角色
const getUserRole = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
}

// 关闭弹窗
const closed = () => {
  emit('update:modelValue', false)
}

// 点击确认
const onConfirm = async () => {
  // 接口updateRole需要的数据：[{id:, title:, describe: xxx}]，所以需要先处理数据
  const selectedRoles = userRoleTitleList.value.map((item) => {
    const findRole = allRoleList.value.find((role) => role.title === item)
    return {
      id: findRole.id,
      title: findRole.title,
      describe: findRole.describe
    }
  })

  await updateRole(props.userId, selectedRoles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  emit('updateRole')
  closed()
}

// 因为一开始传来的id为空，所以要做非空处理，当真正传来id的时候才获取用户所属角色
watch(
  () => props.userId,
  () => {
    if (props.userId) {
      getUserRole()
    }
  }
)

// 监听语言变化，重新获取所有角色
watch(
  () => store.getters.language,
  async () => {
    await getRoleList()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
