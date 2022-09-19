// 国际化
// 1.创建数据源
// 2.创建语言变量
// 3.创建i18n实例并配置数据源和语言变量
import { createI18n } from 'vue-i18n'
import enLang from './lang/en'
import zhLang from './lang/zh'
import store from '@/store'

const message = {
  en: {
    msg: {
      ...enLang
    }
  },
  zh: {
    msg: {
      ...zhLang
    }
  }
}

function getLanguage () {
  if (store && store.getters && store.getters.language) {
    return store.getters.language
  }
}

const locale = getLanguage()

const i18n = createI18n({
  legacy: false, // Composition API
  globalInjection: true, // 全局注入$t函数
  messages: message,
  locale
})

export default i18n
