import { useLayoutEffect } from 'react'
import compile from './compile'
import ClassName from './ClassName'
import StyleSheetsManager from './StyleSheetsManager'
import css from './css'

export default function(template: TemplateStringsArray, ...substitutions: any[]) {
  let sourceCode = css(template, ...substitutions)
  const className = ClassName(sourceCode)
  useLayoutEffect(() => {
    const getCode = () => compile(sourceCode, `.${className}`)
    StyleSheetsManager.useStyle(className, getCode)
    return () => StyleSheetsManager.unUseStyle(className)
  }, [className])
  return className
}
