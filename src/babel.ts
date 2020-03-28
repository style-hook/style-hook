export function cssMinify(code: string) {
  const trimWith = (s: string) => RegExp(`\\s*\\${s}\\s*`, 'g')
  const trimStartWith = (s: string) => RegExp(`\\s+\\${s}`, 'g')
  const trimEndWith = (s: string) => RegExp(`\\${s}\\s+`, 'g')
  return code
    .trim()

    // remove comments
    .replace(/\/\*.*?\*\//g, '')

    // remove unnecessary spaces
    .replace(/\s{2,}/g, ' ')
    .replace(trimWith(':'), ':')
    .replace(trimWith(';'), ';')
    .replace(trimWith(','), ',')
    .replace(trimEndWith('('), '(')
    .replace(trimStartWith(')'), ')')
    .replace(trimWith('{'), '{')
    .replace(trimWith('}'), '}')

    // remove unnecessary semicolons
    .replace(/;;+/, ';')
    .replace(/;(?=\})/, '')
    .replace(/;$/, '')

    // shorter number
    .replace(/\b0\.(\d+)/, '.$1')
    .replace(/\b0[a-zA-z]+/, '0')
}


type Babel = typeof import('@babel/core')

const apiName = [
  'useStyle',
  'useModuleStyle',
  'useGlobalStyle',
  'createStyleModule',
  'css',
]

export default function babelPluginStyleHook(babel: Babel): babel.PluginObj {
  const t = babel.types
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        const { tag, quasi } = path.node
        if (t.isIdentifier(tag) && apiName.includes(tag.name)) {
          const quasiPath = path.get('quasi')
          const { quasis, expressions } = quasi
          let expressionSymbol = 'VAR'
          while(quasis.map(tplEl => tplEl.value.raw).join(' ').includes(expressionSymbol))
            expressionSymbol += '_'
          const sourceCode = quasis.map((tplEl, i) => (
            tplEl.value.raw
            + (i !== quasis.length -1 ? `${expressionSymbol}${i}` : '')
          )).join('')
          const minCode = cssMinify(sourceCode)
          quasiPath.replaceWith(
            t.templateLiteral(
              minCode.split(RegExp(`${expressionSymbol}\\d+`)).map(raw => (
                t.templateElement({ raw, cooked: raw }, true)
              )),
              expressions.filter((_, i) => RegExp(`${expressionSymbol}${i}`).test(minCode))
            )
          )
        }
      }
    }
  }
}
