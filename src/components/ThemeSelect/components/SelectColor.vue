<template>
  <el-dialog
    :model-value="modelValue"
    @close="closed"
    width="22%"
    :title="$t('msg.theme.themeColorChange')"
    :close-on-click-modal="false"
  >
    <div class="center">
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColor"
      />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">
          {{ $t('msg.universal.cancel') }}
        </el-button>
        <el-button @click="confirm" type="primary">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme2'

const store = useStore()

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const mColor = ref(store.getters.mainColor) // 主题色
// 预置颜色
const predefineColor = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

// 弹窗关闭时通知父组件
const closed = () => {
  emit('update:modelValue', false)
}
/***
 * 点击确认要做的事：
 * 1.保存最新的主题色
 * 2.关闭弹窗
 */
const confirm = async () => {
  store.commit('theme/setMainColor', mColor.value)
  const newStyle = await generateNewStyle(mColor.value)
  writeNewStyle(newStyle)
  closed()
}
</script>
<script>
export default {
  name: 'SelectColor'
}
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
