// 不是所有的路由都要存入标签列表中，比如登录页
const whiteList = ['/login', '/404', '/401']

// 判断该路由是否可存入标签列表
export function isTag(path) {
  if (whiteList.indexOf(path) > -1) {
    return false
  } else {
    return true
  }
}
