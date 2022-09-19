// 处理主题色的vuex
import { setItem, getItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variables from '@/assets/styles/variables.module.scss'

const theme = {
  namespaced: true,
  state () {
    return {
      mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
      variables
    }
  },
  mutations: {
    // 设置主题色
    setMainColor (state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}

export default theme
