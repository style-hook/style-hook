import compile from '../src/compile'
import StyleHook from '../src/api'

beforeEach(() => {
  StyleHook.DYNAMIC_PX = false
})

test('compile with empty code', () => {
  const code = compile('', '#root')
  expect(code).toBe('')
  expect(code).not.toBe('#root{}')
})

describe('layout test', () => {
  test('single layout compile', () => {
    const sourceCode = `
      color:red;
      margin:50px;
    `
    const code = compile(sourceCode, '#root')
    expect(code).toBe('#root{color:red;margin:50px;}')
  })
  test('multiple layer compile', () => {
    const sourceCode = `
      color:red;
      .box {
        margin:50px;
        .mini {
          height:30px;
        }
      }
      font-size:20px;
    `
    const code = compile(sourceCode, '#root')
    expect(code).toBe([
      '#root{color:red;font-size:20px;}',
      '#root .box{margin:50px;}',
      '#root .box .mini{height:30px;}',
    ].join(''))
  })
})

describe('special compile', () => {
  test('start with &', () => {
    const sourceCode = `
      &.b {
        color:red;
      }
    `
    const code = compile(sourceCode, '.a')
    expect(code).toBe('.a.b{color:red;}')
  })
  test('end with &', () => {
    const sourceCode = `
      .parent & {
        color:red;
      }
    `
    const code = compile(sourceCode, '.chil')
    expect(code).toBe('.parent .chil{color:red;}')
  })
  test('start with ":"', () => {
    const sourceCode = `
      :hover {
        color:red;
      }
    `
    const code = compile(sourceCode, '.a')
    expect(code).toBe('.a:hover{color:red;}')
  })
})

describe('without semicolon in the end line', () => {
  test('single layout', () => {
    const sourceCode = `
      color:red;
      margin:50px
    `
    const code = compile(sourceCode, '#root')
    expect(code).toBe('#root{color:red;margin:50px;}')
  })
  test('multiple layout', () => {
    const sourceCode = `
      color:blue;
      .box {
        color:red
      }
      margin:50px
    `
    const code = compile(sourceCode, '#root')
    expect(code).toBe('#root{color:blue;margin:50px;}#root .box{color:red;}')
  })
})

describe('with any selector', () => {
  const sourceCode = 'color:red'
  test('with tag selector', () => {
    const code = compile(sourceCode, 'html')
    expect(code).toBe('html{color:red;}')
  })
  test('with class selector', () => {
    const code = compile(sourceCode, '.red')
    expect(code).toBe('.red{color:red;}')
  })
  test('with id selector', () => {
    const code = compile(sourceCode, '#root')
    expect(code).toBe('#root{color:red;}')
  })
  test('without empty selector', () => {
    const sourceCode = 'body{background:#f8f8f8;}'
    const code = compile(sourceCode, '')
    expect(code).toBe('body{background:#f8f8f8;}')
  })
})

describe('@media test', () => {
  test('with one layout', () => {
    const sourceCode = `
      @media screen and (min-width:900px) {
        color:red;
      }
    `
    const code = compile(sourceCode, '.abc')
    expect(code).toBe([
      '@media screen and (min-width:900px){',
      '.abc{color:red;}',
      '}',
    ].join(''))
  })
  test('with multiple layout', () => {
    const sourceCode = `
      .a {
        color:blue;
        @media screen and (min-width:900px) {
          color:red;
          .b {
            color:yellow;
          }
        }
      }
    `
    const code = compile(sourceCode, '.abc')
    expect(code).toBe([
      '.abc .a{color:blue;}',
      '@media screen and (min-width:900px){',
      '.abc .a{color:red;}',
      '.abc .a .b{color:yellow;}',
      '}',
    ].join(''))
  })
  test('with many media queries', () => {
    const sourceCode = `
      @media screen and (min-width:900px) {
        color:red;
      }
      @media screen and (max-width:450px) {
        color:blue;
      }
    `
    const code = compile(sourceCode, '.abc')
    expect(code).toBe([
      '@media screen and (min-width:900px){',
      '.abc{color:red;}',
      '}',
      '@media screen and (max-width:450px){',
      '.abc{color:blue;}',
      '}',
    ].join(''))
  })
})

describe('ignore illegal rule plugin', () => {
  test('don\'t have value', () => {
    const code = compile('width:', '')
    expect(code).not.toContain('width')
  })
})

describe('unit less plugin', () => {
  test('add px unit when unit less', () => {
    const code = compile('width:20', '')
    expect(code).toContain('width:20px')
  })
  test('add px unit when value is float', () => {
    const code = compile('width:2.5', '')
    expect(code).toContain('width:2.5px')
  })
  test('add px unit when value is start with `.`', () => {
    const code = compile('width:.5', '')
    expect(code).toContain('width:.5px')
  })
  test('dont\'t px unit when the property is unit less originally', () => {
    const code = compile('flex:1', '')
    expect(code).not.toContain('flex:1px')
  })
})

describe('dynamic px plugin', () => {
  test('1px = 1px in iphone6', () => {
    // @ts-ignore
    window.innerWidth = 375
    StyleHook.DYNAMIC_PX = true
    const code = compile('width:10px', '')
    expect(code).toContain('width:10px')
  })
  test('relative width 375px in other mobile screen', () => {
    // @ts-ignore
    window.innerWidth = 320
    StyleHook.DYNAMIC_PX = true
    const code = compile('width:100px', '')
    expect(code).toContain('width:85px')
  })
  test('1px = 1px in PC screen', () => {
    // @ts-ignore
    window.innerWidth = 1920
    StyleHook.DYNAMIC_PX = true
    const code = compile('width:100px', '')
    expect(code).toContain('width:100px')
  })
})

describe('rpx compile', () => {
  test('2rpx = 1px in iphone6', () => {
    (window as any).innerWidth = 375
    const code = compile('width:20rpx', '')
    expect(code).toContain('width:10px')
  })
  test('relative width 750rpx in any screen', () => {
    (window as any).innerWidth = 414
    const code = compile('width:20rpx', '')
    expect(code).toContain('width:11px')
  })
})
