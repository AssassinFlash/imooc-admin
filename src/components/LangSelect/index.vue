<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
      <span>
        <svg-icon icon="language"></svg-icon>
      </span>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator (value) {
      return ['dark', 'light'].indexOf(value) > -1
    }
  }
})

const store = useStore()
const language = computed(() => store.getters.language)

// vuex处理语言切换
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLang', lang)
}
</script>
<script>
export default {
  name: 'LangSelect'
}
</script>

<style lang="scss" scoped>
.international {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin-right: 10px;
  text-align: center;
  cursor: pointer;

  :deep(.svg-icon) {
    width: 30px;
    height: 30px;
    position: relative;
    top: 8px;
  }
}
</style>
