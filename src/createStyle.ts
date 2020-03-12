import css from './css'
import { CSSModule } from './hooks'
import ClassName from './ClassName'
import compile from './compile'
import StyleSheetsManager from './StyleSheetsManager'

export function createModuleStyle(template: TemplateStringsArray, ...substitutions: any[]): CSSModule {
  let sourceCode = css(template, ...substitutions)
  const moduleName = ClassName(sourceCode)
  const styles: CSSModule = {}
  let cssCode = ''
  const updateStyle = () => {
    if (cssCode) StyleSheetsManager.removeStyle(cssCode)
    cssCode = compile(sourceCode.replace(/\.([a-zA-Z_][-\w]*)/g, (_, $1) => {
      const className = `${moduleName}-${$1}`
      styles[$1] = className
      return `.${className}`
    }), '')
    StyleSheetsManager.addStyle(cssCode)
  }
  updateStyle()
  window.addEventListener('resize', updateStyle)
  return styles
}
