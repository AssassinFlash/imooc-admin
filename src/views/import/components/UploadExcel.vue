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
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <div
      class="drop"
      @dragenter.stop.prevent="handleDragover"
      @dragover.stop.enter="handleDragover"
      @drop.stop.prevent="handleDrop"
    >
      <el-icon><upload /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup></script>
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
