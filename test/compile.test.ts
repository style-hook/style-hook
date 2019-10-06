import compile from "../src/compile"

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
  const sourceCode = `color:red`
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
    const sourceCode = `body{background:#f8f8f8;}`
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

describe('rpx compile', () => {
  test('2rpx = 1px in iphone6', () => {
    innerWidth = 375
    const code = compile('width:20rpx', '')
    expect(code).toContain('width:10px')
  })
  test('relative width 750rpx in any screen', () => {
    innerWidth = 414
    const code = compile('width:20rpx', '')
    expect(code).toContain('width:11px')
  })
})
