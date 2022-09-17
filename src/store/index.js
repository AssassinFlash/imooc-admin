import { createStore } from 'vuex'
import getters from '@/store/getters'
import user from './modules/user'
export default createStore({
  modules: {
    user
  },
  getters
})
