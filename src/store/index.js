import { createStore } from 'vuex'
import getters from '@/store/getters'
import user from './modules/user'
import app from './modules/app'
import theme from '@/store/modules/theme'
import permission from './modules/permission'
export default createStore({
  modules: {
    user,
    app,
    theme,
    permission
  },
  getters
})
