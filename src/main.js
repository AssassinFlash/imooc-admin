import { createApp } from 'vue'
import App from './App.vue'
// 引入国际化
import i18n from '@/i18n'
import store from './store'
import router from './router'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入样式重置
import './assets/styles/index.scss'
// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import installIcon from '@/components/SvgIcons/svg'
// 引入路由鉴权
import './permission'
// 引入过滤器
import installFilter from './filter'
// 引入自定义指令
import installDirective from './directives'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installIcon(app)
installFilter(app)
installDirective(app)
app.use(router).use(ElementPlus).use(store).use(i18n).mount('#app')
