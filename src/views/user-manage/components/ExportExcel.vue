<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    width="30%"
    :model-value="modelValue"
    @close="closed"
  >
    <el-input :placeholder="$t('msg.excel.placeholder')" v-model="excelName" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './ExportToExcelConstant'
import { ExportJsonToExcel } from '@/utils/Export2Excel'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const i18n = useI18n()
const store = useStore()

const excelName = ref('') // 导出的excel文件名
const loading = ref(false) // 加载状态
// 拿到全局对象
const ctx = getCurrentInstance()

// 导出excel包接收的是一个二维数组：
// [['张三','15315312151','管理员','2021-10-21'],[xxx]]
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    const data = []
    Object.keys(headers).forEach((key) => {
      // 要区分出role，因为role的数据是一个数组：[{id: 1, title: '管理员'}]
      if (headers[key] === 'role') {
        const value = JSON.stringify(
          item[headers[key]].map((role) => role.title)
        )
        data.push(value)
      } else if (headers[key] === 'openTime') {
        // 处理时间错误
        const time = ctx.appContext.config.globalProperties.$filter.dataFilter(
          item[headers[key]]
        )
        data.push(time)
      } else {
        data.push(item[headers[key]])
      }
    })
    return data
  })
}

// 弹窗关闭
const closed = () => {
  loading.value = false
  emit('update:modelValue', false)
}

// 点击确认按钮
const onConfirm = async () => {
  loading.value = true
  const allUser = await getUserManageAllList()
  // 处理数据，得到一个二维数组数据作为excel数据
  const result = formatJson(USER_RELATIONS, allUser.list)
  ExportJsonToExcel({
    header: Object.keys(USER_RELATIONS), // excel表头
    data: result, // excel数据
    filename: excelName.value || '员工管理表' // 文件名
  })
  closed()
}

// 监听语言切换，更改导出的excel文件名
watch(
  () => store.getters.language,
  () => {
    excelName.value = i18n.t('msg.excel.defaultName')
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
