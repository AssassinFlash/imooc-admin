// 处理主题色的vuex
import { setItem, getItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'

const theme = {
  namespaced: true,
  state () {
    return {
      mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
    }
  },
  mutations: {
    // 设置主题色
    setMainColor (state, newColor) {
      state.mainColor = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}

export default theme
