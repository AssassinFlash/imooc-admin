import SvgIcon from '@/components/SvgIcons'

const importFn = require.context('../svg', false, /\.svg$/)

importFn.keys().forEach(svgIcon => importFn(svgIcon))

export default function installIcon (app) {
  app.component('svg-icon', SvgIcon)
}
