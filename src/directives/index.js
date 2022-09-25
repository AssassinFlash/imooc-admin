// 自定义指令
import print from 'vue3-print-nb'

export default function installDirective(app) {
  app.use(print)
}
