import { setItem, getItem } from '@/utils/storage'
import { LANG } from '@/constant'

const app = {
  namespaced: true,
  state () {
    return {
      sidebarOpened: true, // 侧边栏展开
      language: getItem(LANG) || 'en' // 语言
    }
  },
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLang (state, lang) {
      state.language = lang
      setItem(LANG, lang)
    }
  }
}

export default app
