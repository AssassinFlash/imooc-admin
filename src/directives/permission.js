// 自定义指令，根据数据隐藏按钮
import store from '@/store'

function checkPermission(el, binding) {
  // 获取绑定的值
  const { value } = binding
  // 获取该用户的功能指令
  const { points } = store.getters.userInfo.permission
  // 匹配用户的功能指令和按键的功能指令，存在则说明该按键可被用户使用
  const hasPermission = points.includes(value)
  if (!hasPermission) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}

const permission = {
  // 在绑定元素的父组件及他自己的所有子节点都挂载完毕后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在绑定元素的父组件及他自己的所有子节点都更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
export default permission
