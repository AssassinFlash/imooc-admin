<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button type="primary" size="large" round @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      type="file"
      class="excel-upload-input"
      ref="excelInputRef"
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <div
      class="drop"
      @dragenter.stop.prevent="handleDragover"
      @dragover.stop.prevent="handleDragover"
      @drop.stop.prevent="handleDrop"
    >
      <el-icon><Upload /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow } from './utils'

const props = defineProps({
  // 上传前回调
  beforeUpload: {
    type: Function
  },
  // 上传成功的回调
  onSuccess: {
    type: Function
  }
})

const excelInputRef = ref(null) // input表单对象
const loading = ref(false) // 加载状态

// 加载数据
const renderData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // onload事件触发时机在读取操作完成的时候，要写在readAsArrayBuffer前面
    reader.onload = (e) => {
      // 1.XLSX对数据进行解析，获取第一张表格的数据
      const data = XLSX.read(e.target.result, { type: 'array' })
      const firstSheetName = data.SheetNames[0]
      const workSheet = data.Sheets[firstSheetName]
      // 2.解析数据，并传入解析之后的数据
      const header = getHeaderRow(workSheet)
      const body = XLSX.utils.sheet_to_json(workSheet)
      generateData({ header, body })
      // 3.异步完成
      loading.value = false
      resolve()
    }

    reader.readAsArrayBuffer(rawFile)
  })
}

// 生成数据
const generateData = (data) => {
  props.onSuccess(data)
}

// 上传事件
const upload = (rawFile) => {
  if (!props.beforeUpload) {
    renderData(rawFile)
    return
  }
  // 如果指定了上传前回调，必须要返回true才可继续执行下面的步骤
  const flag = props.beforeUpload(rawFile)
  if (flag) {
    renderData(rawFile)
  }
}

// 点击上传
const handleUpload = () => {
  excelInputRef.value.click()
}

// 上传文件后触发change事件
const handleChange = (e) => {
  const rawFile = e.target.files[0]
  upload(rawFile)
}

// 拖拽事件的处理
const handleDragover = (e) => {
  // dataTransfer.dropEffect：控制在拖放操作中给用户的反馈
  // 当dropEffect设置为字符串时，读这个值会实施值对应的操作
  // 'copy'：在新位置生成该项的副本
  e.dataTransfer.dropEffect = 'copy'
}

// 当拖拽松开
const handleDrop = (e) => {
  if (loading.value) return
  console.log(e.dataTransfer)
}
</script>
<script>
export default {
  name: 'UploadExcel'
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;

  .btn-upload,
  .drop {
    width: 350px;
    height: 160px;
    line-height: 160px;
    border: 1px dashed #bbb;
    text-align: center;
  }

  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
    font-size: 20px;

    .el-icon {
      font-size: 60px;
    }
  }

  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
}
</style>
