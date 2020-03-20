import { useLayoutEffect, useMemo, useEffect, useState } from 'react'
import compile from './compile'
import ClassName from './ClassName'
import StyleSheetsManager from './StyleSheetsManager'
import css from './css'
import { getCSSModule, isSSR } from './utils'

function useCss(template: TemplateStringsArray, ...substitutions: any[]) {
  const sourceCode = css(template, ...substitutions)
  const className = useMemo(() => ClassName(sourceCode), substitutions)
  return { sourceCode, className }
}

function useStyleCode(id: string, getCode: () => string) {
  if (isSSR) return
  useLayoutEffect(() => {
    StyleSheetsManager.useStyle(id, getCode)
    return () => StyleSheetsManager.unUseStyle(id)
  }, [id])
}

function useInnerWidth() {
  if (isSSR) return NaN
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth)
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])
  return width
}

export function useStyle(template: TemplateStringsArray, ...substitutions: any[]) {
  const { sourceCode, className } = useCss(template, ...substitutions)
  const innerWidth = useInnerWidth()
  useStyleCode(`${className}[#${innerWidth}]`, () => (
    compile(sourceCode, `.${className}`)
  ))
  return className
}

export function useGlobalStyle(template: TemplateStringsArray, ...substitutions: any[]) {
  const { sourceCode, className: hash } = useCss(template, ...substitutions)
  const innerWidth = useInnerWidth()
  useStyleCode(`${hash}[global][#${innerWidth}]`, () => (
    compile(sourceCode, '').replace(/(^|\})\{/, '$1html{')
  ))
}

export interface CSSModule {
  [className: string]: string
}
export function useModuleStyle(template: TemplateStringsArray, ...substitutions: any[]): CSSModule {
  const { sourceCode, className: moduleName } = useCss(template, ...substitutions)
  const innerWidth = useInnerWidth()
  const { styles, sourceCodeWithModuleId } = useMemo(() => {
    return getCSSModule(sourceCode, moduleName)
  }, [moduleName])
  useStyleCode(`${moduleName}[module][#${innerWidth}]`, () => (
    compile(sourceCodeWithModuleId, '')
  ))
  return styles
}
