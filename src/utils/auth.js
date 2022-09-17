// 前端主动处理token超时失效的问题
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem } from '@/utils/storage'

// 获取登录时记录的token时间戳
export function getTimeStamp () {
  return getItem(TIME_STAMP)
}

// 登录时设置记录token时间戳
export function setTimeStamp () {
  setItem(TIME_STAMP, Date.now())
}

// 判断是否超时(当前时间-登录时的时间)
export function isCheckTimeout () {
  const currentTime = Date.now()
  const loginTimeStamp = getTimeStamp()
  return currentTime - loginTimeStamp > TOKEN_TIMEOUT_VALUE
}
