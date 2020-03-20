import ClassName from './ClassName'
import { CSSModule } from './hooks'

export function getCSSModule(sourceCode: string, moduleName = ClassName(sourceCode)) {
  const styles: CSSModule = {}
  const sourceCodeWithModuleId = sourceCode.replace(/\.([a-zA-Z_][-\w]*)\b(?=[^;{}]*\{)/g, (_, $1) => {
    const className = `${moduleName}-${$1}`
    styles[$1] = className
    return `.${className}`
  })
  return {
    styles,
    sourceCodeWithModuleId,
  }
}

export const isSSR =
  typeof window === 'undefined'
  || typeof document === 'undefined'
