import { createStore } from 'vuex'
import getters from '@/store/getters'
import user from './modules/user'
import app from './modules/app'
import theme from '@/store/modules/theme'
export default createStore({
  modules: {
    user,
    app,
    theme
  },
  getters
})
