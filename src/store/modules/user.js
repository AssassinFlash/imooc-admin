import { getUserInfo, login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import { setTimeStamp } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import router from '@/router'

const user = {
  namespaced: true,
  state: () => {
    return {
      token: getItem(TOKEN) || '',
      userInfo: {}
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      // 存储到本地
      setItem(TOKEN, token)
      // 记录登录时间
      setTimeStamp()
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    login (context, userInfo) {
      const {
        username,
        password
      } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        }).then(data => {
          // 1.存储token和记录登录时间
          context.commit('setToken', data.token)
          // 2.消息提示
          ElMessage.success('登录成功')
          // 3.跳转到首页
          router.push('/')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    async getUserInfo (context) {
      const res = await getUserInfo()
      context.commit('setUserInfo', res)
      return res
    },
    // 退出登录
    logout (context) {
      // 1.清空vuex数据
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 2.清空本地存储的token
      removeItem(TOKEN)
      // 3.跳转回登录页
      router.push('/login')
    }
  }
}

export default user