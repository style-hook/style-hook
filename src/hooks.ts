import { useLayoutEffect, useMemo } from 'react'
import compile from './compile'
import ClassName from './ClassName'
import StyleSheetsManager from './StyleSheetsManager'
import css from './css'

function useStyleCode(id: string, getCode: () => string) {
  useLayoutEffect(() => {
    StyleSheetsManager.useStyle(id, getCode)
    return () => StyleSheetsManager.unUseStyle(id)
  }, [id])
}

export function useStyle(template: TemplateStringsArray, ...substitutions: any[]) {
  const sourceCode = css(template, ...substitutions)
  const className = ClassName(sourceCode)
  useStyleCode(className, () => (
    compile(sourceCode, `.${className}`)
  ))
  return className
}

export function useGlobalStyle(template: TemplateStringsArray, ...substitutions: any[]) {
  const sourceCode = css(template, ...substitutions)
  const hash = ClassName(sourceCode)
  useStyleCode(`${hash}[global]`, () => (
    compile(sourceCode, '').replace(/(^|\})\{/, '$1html{')
  ))
}

export function useModuleStyle(template: TemplateStringsArray, ...substitutions: any[]) {
  let sourceCode = css(template, ...substitutions)
  const hash = ClassName(sourceCode)
  const styles: any = useMemo(() => {
    const styles: {[name: string]: string} = {}
    sourceCode = sourceCode.replace(/\.([a-zA-Z_][-\w]*)/g, (_, $1) => {
      const className = `${hash}-${$1}`
      styles[$1] = className
      return `.${className}`
    })
    return styles
  }, [hash])
  useStyleCode(`${hash}[module]`, () => (
    compile(sourceCode, '')
  ))
  return styles
}
