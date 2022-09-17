// 存储数据
export function setItem (key, value) {
  // 1.简单数据类型
  // 2.复杂数据类型
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

// 获取数据
export function getItem (key) {
  const data = localStorage.getItem(key)
  // 1.复杂数据类型
  // 2.简单数据类型
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

// 删除数据
export function removeItem (key) {
  localStorage.removeItem(key)
}

// 删除所有数据
export function removeAllItem () {
  localStorage.clear()
}
