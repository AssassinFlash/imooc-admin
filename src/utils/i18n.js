// 处理侧边栏菜单和面包屑的国际化问题
import i18n from '@/i18n'

export function generateTitle (title) {
  return i18n.global.t('msg.route.' + title)
}
