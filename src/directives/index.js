// 自定义指令
import print from 'vue3-print-nb'
import permission from './permission'

export default function installDirective(app) {
  app.use(print)
  app.directive('permission', permission)
}
