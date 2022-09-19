// 更换element-plus的主题色
import formula from '@/constant/formula.json'
import rgbHex from 'rgb-hex'
import color from 'css-color-function'
import axios from 'axios'

// 1.根据主题色，替换formula，生成色值表对象
export const generateColors = primaryColor => {
  if (!primaryColor) return
  // 色值表对象
  const colors = {
    // 主题色
    primary: primaryColor
  }
  Object.keys(formula).forEach(key => {
    // 先替换掉formula中的'primary'字符串，为真实的主题色值："shade-1": "color(#00ff00, shade(10%))"
    const value = formula[key].replace(/primary/g, primaryColor)
    // 将记录"shade-1": "color(#00ff00, shade(10%))"转换成真实的十六进制颜色，记录到色值表对象中
    // colors: {"shade-1": #00ff00}
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  // 返回色值表对象
  return colors
}

// 2.获取默认的element-plus样式表
const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return data
}

// 3.对默认的样式表，在需要替换颜色的地方打上标记
const getMarkOriginalStyle = (data) => {
  // 需要打上标记的色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  Object.keys(colorMap).forEach(key => {
    // 在默认的样式表中找到色值，替换成标记
    data = data.replace(new RegExp(key, 'ig'), colorMap[key])
  })
  // 返回打上标记后的样式表
  return data
}

// 4.根据主题色，生成最新的样式表
const generateNewStyle = async primaryColor => {
  // 根据主题色，获取色值表对象
  const colors = generateColors(primaryColor)
  // 获取打上标记后的样式表
  const originalStyle = await getOriginalStyle()
  const markedStyle = getMarkOriginalStyle(originalStyle)
  // 遍历样式表，标记与色值表对象的key对应，从而替换掉标记为真实的色值
  let newStyle = null
  Object.keys(colors).forEach(key => {
    newStyle = markedStyle.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  return newStyle
}

// 写入新样式到style标签中
export const writeNewStyle = async (newColor) => {
  const styleEl = document.createElement('style')
  styleEl.innerText = await generateNewStyle(newColor)
  document.head.appendChild(styleEl)
}
