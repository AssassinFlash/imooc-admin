<template>
  <div class="import">
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const i18n = useI18n()

// 处理数据，将中文key改为英文key
const generateData = (result) => {
  const arr = result.map((item) => {
    const data = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        item[key] = formatDate(item[key])
      }
      data[USER_RELATIONS[key]] = item[key]
    })
    return data
  })
  return arr
}

// 导入成功后的回调函数
const onSuccess = async ({ header, body }) => {
  const res = generateData(body)
  await userBatchImport(res)
  ElMessage({
    type: 'success',
    message: res.length + i18n.t('msg.excel.importSuccess')
  })
  router.push('/user/manage')
}
</script>

<style lang="scss" scoped>
.import {
  height: 100%;
}
</style>
