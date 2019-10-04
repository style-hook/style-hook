import { useLayoutEffect } from 'react'
import compile from './compile'
import ClassName from './ClassName'
import StyleSheetsManager from './StyleSheetsManager'
import css from './css'

export function useStyle(template: TemplateStringsArray, ...substitutions: any[]) {
  let sourceCode = css(template, ...substitutions)
  const className = ClassName(sourceCode)
  useLayoutEffect(() => {
    const getCode = () => compile(sourceCode, `.${className}`)
    StyleSheetsManager.useStyle(className, getCode)
    return () => StyleSheetsManager.unUseStyle(className)
  }, [className])
  return className
}

export function useGlobalStyle(template: TemplateStringsArray, ...substitutions: any[]) {
  let sourceCode = css(template, ...substitutions)
  const hash = 'global-' + ClassName(sourceCode)
  useLayoutEffect(() => {
    const getCode = () => compile(sourceCode, '')
      .replace(/(^|\})\{/, '$1html{')
    StyleSheetsManager.useStyle(hash, getCode)
    return () => StyleSheetsManager.unUseStyle(hash)
  }, [hash])
}
