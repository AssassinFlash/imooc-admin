import { setItem, getItem } from '@/utils/storage'
import { LANG, TAG_VIEW } from '@/constant'
import { generateTitle } from '@/utils/i18n'

const app = {
  namespaced: true,
  state() {
    return {
      sidebarOpened: true, // 侧边栏展开
      language: getItem(LANG) || 'en', // 语言
      tagViewList: getItem(TAG_VIEW) || [] // 标签列表
    }
  },
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLang(state, lang) {
      state.language = lang
      setItem(LANG, lang)
    },
    // 添加标签tag
    addTag(state, newTag) {
      // 处理重复
      const tag = state.tagViewList.find((tag) => tag.path === newTag.path)
      if (!tag) {
        state.tagViewList.push(newTag)
        setItem(TAG_VIEW, state.tagViewList)
      }
    },
    // 删除标签tag
    removeTag(state, tag) {
      const index = state.tagViewList.findIndex(
        (item) => tag.path === item.path
      )
      state.tagViewList.splice(index, 1)
      setItem(TAG_VIEW, state.tagViewList)
    },
    // 标签列表的国际化处理：修改title
    changeTagViewList(state) {
      state.tagViewList.forEach((tag) => {
        tag.title = generateTitle(tag.meta.title)
      })
      setItem(TAG_VIEW, state.tagViewList)
    }
  }
}

export default app
