// 密码验证规则
export function validatePassword (rule, value, callback) {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (value.length < 6) {
    callback(new Error('密码不能少于6个字符'))
  } else {
    callback()
  }
}
