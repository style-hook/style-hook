import css from './css'
import { CSSModule } from './hooks'
import ClassName from './ClassName'
import compile from './compile'
import StyleSheetsManager from './StyleSheetsManager'
import { getCSSModule } from './utils'

export function createModuleStyle(template: TemplateStringsArray, ...substitutions: any[]): CSSModule {
  let sourceCode = css(template, ...substitutions)
  const cssModule: CSSModule = {}
  let cssCode = ''
  const updateStyle = () => {
    if (cssCode) StyleSheetsManager.removeStyle(cssCode)
    const { styles, sourceCodeWithModuleId } = getCSSModule(sourceCode)
    Object.assign(cssModule, styles)
    cssCode = compile(sourceCodeWithModuleId, '')
    StyleSheetsManager.addStyle(cssCode)
  }
  updateStyle()
  window.addEventListener('resize', updateStyle)
  return cssModule
}
