import * as babel from '@babel/core'
import babelPluginStyleHook, { cssMinify } from '../src/babel'

describe('css minify', () => {
  describe('remove comments', () => {
    test('one comment', () => {
      const code = '/* 123 */color:red'
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('color:red')
    })
    test('many comments', () => {
      const code = '/* 123 *//* set red */color:red/*xxxx*/'
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('color:red')
    })
    test('disturb comment', () => {
      const code = '/***** /* hell * world ////* ** *****/color:red'
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('color:red')
    })
  })

  describe('remove sapces', () => {
    test('trim spaces', () => {
      const code = ' color:red '
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('color:red')
    })
    test('spaces with \\n', () => {
      const code = `
      border:
        1px
        red
        solid
    `
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('border:1px red solid')
    })
    test('spaces with :', () => {
      const code = 'color: red'
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('color:red')
    })
    test('spaces with ;', () => {
      const code = 'color:red  ;  '
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('color:red')
    })
    test('spaces with ( , )', () => {
      const code = `
    background:linear-gradient(
      180deg,
      rgb( 51, 163, 244 ) 0,
      rgba( 51, 163, 244, 0 ) 100%
    )
    `
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('background:linear-gradient(180deg,rgb(51,163,244) 0,rgba(51,163,244,0) 100%)')
    })
    test('dont delete the space before (', () => {
      const code = cssMinify('@media   screen   and    ( max-width:480px )')
      expect(code).toBe('@media screen and (max-width:480px)')
    })
    test('spaces with { }', () => {
      const code = `
      .p {
        color:red;
        font-size:30px
      }
    `
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('.p{color:red;font-size:30px}')
    })
  })

  describe('remove semicolon', () => {
    test('repeat semicolons', () => {
      const code = 'color:red;;;;;;;;;;;;;color:green'
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('color:red;color:green')
    })
    test('endline semicolon', () => {
      const code = '.p{color:red;}color:red;'
      const transformedCode = cssMinify(code)
      expect(transformedCode).toBe('.p{color:red}color:red')
    })
  })

  describe('shorter number', () => {
    test('0.xx', () => {
      const code = cssMinify('opacity:0.544')
      expect(code).toBe('opacity:.544')
    })
    test('zero value', () => {
      const code = cssMinify('width:0px')
      expect(code).toBe('width:0')
    })
  })
})

describe('minify with babel', () => {
  const example = `
  useStyle \`
    color: blue;
    font-size: 30px;
    .p {
      color: \${GREEN};
    }
    \${css \`
      color: blue;
    \`}
  \`
  useGlobalStyle \`
    color: blue;
    font-size: 30px;
    .p {
      color: green;
    }
  \`
  useModuleStyle \`
    .p {
      color: red;
      border: 1px \${Palette.BLUE}   dashed;
      disturb-rule: VAR0;
    }
  \`
  `

  test('transform correctly', () => {
    const { code } = babel.transform(example, { plugins: [babelPluginStyleHook] })!
    expect(code).toMatchSnapshot()
  })
})
