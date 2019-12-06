import { useLayoutEffect, useMemo } from 'react'
import compile from './compile'
import ClassName from './ClassName'
import StyleSheetsManager from './StyleSheetsManager'
import css from './css'

function useCss(template: TemplateStringsArray, ...substitutions: any[]) {
  const sourceCode = css(template, ...substitutions)
  const className = useMemo(() => ClassName(sourceCode), substitutions)
  return { sourceCode, className }
}

function useStyleCode(id: string, getCode: () => string) {
  useLayoutEffect(() => {
    StyleSheetsManager.useStyle(id, getCode)
    return () => StyleSheetsManager.unUseStyle(id)
  }, [id])
}

export function useStyle(template: TemplateStringsArray, ...substitutions: any[]) {
  const { sourceCode, className } = useCss(template, ...substitutions)
  useStyleCode(className, () => (
    compile(sourceCode, `.${className}`)
  ))
  return className
}

export function useGlobalStyle(template: TemplateStringsArray, ...substitutions: any[]) {
  const { sourceCode, className: hash } = useCss(template, ...substitutions)
  useStyleCode(`${hash}[global]`, () => (
    compile(sourceCode, '').replace(/(^|\})\{/, '$1html{')
  ))
}

export interface CSSModule {
  [className: string]: string
}
export function useModuleStyle(template: TemplateStringsArray, ...substitutions: any[]): CSSModule {
  let { sourceCode, className: moduleName } = useCss(template, ...substitutions)
  const styles: any = useMemo(() => {
    const styles: CSSModule = {}
    sourceCode = sourceCode.replace(/\.([a-zA-Z_][-\w]*)/g, (_, $1) => {
      const className = `${moduleName}-${$1}`
      styles[$1] = className
      return `.${className}`
    })
    return styles
  }, [moduleName])
  useStyleCode(`${moduleName}[module]`, () => (
    compile(sourceCode, '')
  ))
  return styles
}
