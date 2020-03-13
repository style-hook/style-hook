import StyleSheetsManager from '../src/StyleSheetsManager'

describe('use one style once', () => {
  test('will add code to style element', () => {
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    const el = StyleSheetsManager.element
    expect(el.innerHTML).toBe('.abcd{color:red;}')
    StyleSheetsManager.unUseStyle('abcd')
  })
  test('unUse will remove the code from style element', () => {
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    const el = StyleSheetsManager.element
    StyleSheetsManager.unUseStyle('abcd')
    expect(el.innerHTML).toBe('')
  })
})

describe('useStyle same id many times', () => {
  test('will add code to style element once', () => {
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    const el = StyleSheetsManager.element
    expect(el.innerHTML).toBe('.abcd{color:red;}')
    StyleSheetsManager.unUseStyle('abcd')
    StyleSheetsManager.unUseStyle('abcd')
    expect(el.innerHTML).toBe('')
  })
  test('should unUse same times', () => {
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    const el = StyleSheetsManager.element
    StyleSheetsManager.unUseStyle('abcd')
    expect(el.innerHTML).toBe('.abcd{color:red;}')
    expect(StyleSheetsManager.library.abcd.onLine).toBe(1)
    StyleSheetsManager.unUseStyle('abcd')
    expect(el.innerHTML).toBe('')
  })
})

describe('use different codes', () => {
  test('will add different code to style element', () => {
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    StyleSheetsManager.useStyle('www', () => '.www{color:red;}')
    const el = StyleSheetsManager.element
    expect(el.innerHTML).toBe('.abcd{color:red;}.www{color:red;}')
    StyleSheetsManager.unUseStyle('abcd')
    StyleSheetsManager.unUseStyle('www')
  })
  test('unUse the one will remain the others', () => {
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    StyleSheetsManager.useStyle('www', () => '.www{color:red;}')
    const el = StyleSheetsManager.element
    StyleSheetsManager.unUseStyle('abcd')
    expect(el.innerHTML).toBe('.www{color:red;}')
    StyleSheetsManager.unUseStyle('www')
  })
})

describe('cache compile', () => {
  test('only compile once if the style id is same', () => {
    delete StyleSheetsManager.library.abcd
    const compile = jest.fn(() => '.abcd{color:red;}')
    StyleSheetsManager.useStyle('abcd', compile)
    StyleSheetsManager.useStyle('abcd', compile)
    StyleSheetsManager.unUseStyle('abcd')
    StyleSheetsManager.unUseStyle('abcd')
    expect(compile).toBeCalledTimes(1)
  })
  test('delete the node from th library when offline and then no one use it in 1s', () => {
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    StyleSheetsManager.unUseStyle('abcd')
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(StyleSheetsManager.library.abcd).toBeUndefined()
        resolve()
      }, 1000)
    })
  })
})
