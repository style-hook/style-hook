import { useLayoutEffect } from 'react'
import compile from './compile'
import ClassName from './ClassName'
import StyleSheetsManager from './StyleSheetsManager'

export default function(template: TemplateStringsArray, ...substitutions: any[]) {
  substitutions.push('')
  let sourceCode = template.map((tpl, i) => tpl + substitutions[i]).join('')
  const className = ClassName(sourceCode)
  useLayoutEffect(() => {
    const getCode = () => compile(sourceCode, `.${className}`)
    StyleSheetsManager.useStyle(className, getCode)
    return () => StyleSheetsManager.unUseStyle(className)
  }, [className])
  return className
}
