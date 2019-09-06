import compile from "../src/compile"

test('compile with empty code', () => {
  const code = compile('', '#root')
  expect(code).toBe('')
  expect(code).not.toBe('#root{}')
})

describe('layout test', () => {
  test('single layout compile', () => {
    const sourceCode = `
      color: red;
      margin: 50px;
    `
    const code = compile(sourceCode, '#root')
    expect(code).toBe('#root{color: red;margin: 50px;}')
  })
  test('multiple layer compile', () => {
    const sourceCode = `
      color: red;
      .box {
        margin: 50px;
        .mini {
          height: 30px;
        }
      }
      font-size: 20px;
    `
    const code = compile(sourceCode, '#root')
    expect(code).toBe([
      '#root{color: red;font-size: 20px;}',
      '#root .box{margin: 50px;}',
      '#root .box .mini{height: 30px;}',
    ].join('\n'))
  })
})

describe('special compile', () => {
  test('start with &', () => {
    const sourceCode = `
      &.b {
        color: red;
      }
    `
    const code = compile(sourceCode, '.a')
    expect(code).toBe('.a.b{color: red;}')
  })
  test('end with &', () => {
    const sourceCode = `
      .parent & {
        color: red;
      }
    `
    const code = compile(sourceCode, '.chil')
    expect(code).toBe('.parent .chil{color: red;}')
  })
  test('start with ":"', () => {
    const sourceCode = `
      :hover {
        color: red;
      }
    `
    const code = compile(sourceCode, '.a')
    expect(code).toBe('.a:hover{color: red;}')
  })
})

describe('without semicolon in the end line', () => {
  test('single layout', () => {
    const sourceCode = `
      color: red;
      margin: 50px
    `
    const code = compile(sourceCode, '#root')
    expect(code).toBe('#root{color: red;margin: 50px;}')
  })
  test('multiple layout', () => {
    const sourceCode = `
      color: blue;
      .box {
        color: red
      }
      margin: 50px
    `
    const code = compile(sourceCode, '#root')
    expect(code).toBe('#root{color: blue;margin: 50px;}\n#root .box{color: red;}')
  })
})

describe('with any selector', () => {
  const sourceCode = `color: red`
  test('with tag selector', () => {
    const code = compile(sourceCode, 'html')
    expect(code).toBe('html{color: red;}')
  })
  test('with class selector', () => {
    const code = compile(sourceCode, '.red')
    expect(code).toBe('.red{color: red;}')
  })
  test('with id selector', () => {
    const code = compile(sourceCode, '#root')
    expect(code).toBe('#root{color: red;}')
  })
  // test('without any selector', () => {
  //   const code = compile(sourceCode)
  //   expect(code).toBe('html{color: red;}')
  // })
})
