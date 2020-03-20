import css from './css'
import { CSSModule } from './hooks'
import compile from './compile'
import StyleSheetsManager from './StyleSheetsManager'
import { getCSSModule, isSSR } from './utils'

export function createModuleStyle(template: TemplateStringsArray, ...substitutions: any[]): CSSModule {
  let sourceCode = css(template, ...substitutions)
  if (isSSR) return getCSSModule(sourceCode).styles
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
