import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(async (config) => {
  config.headers.icode = '82F03EE2D9784438'
  if (store.getters.token) {
    // 在请求拦截器中判断token是否超时
    if (isCheckTimeout()) {
      await store.dispatch('user/logout')
      ElMessage.error('token超时')
      return Promise.reject(new Error('token超时'))
    } else {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const {
    success,
    message,
    data
  } = response.data
  if (success) {
    return data
  } else {
    // 提示错误信息
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  // 当token超时，服务器会自动通知，前端被动处理token超时
  if (error.response && error.response.data && error.response.data.code === 401) {
    store.dispatch('user/logout')
  }
  ElMessage.error(error.message)
  return Promise.reject(error)
})

export default service
