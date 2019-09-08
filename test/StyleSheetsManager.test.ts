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

describe('lazy compile', () => {
  test('keep the node in the library when offline', () => {
    StyleSheetsManager.useStyle('abcd', () => '.abcd{color:red;}')
    StyleSheetsManager.unUseStyle('abcd')
    expect(StyleSheetsManager.library.abcd.node).toBeDefined()
    expect(StyleSheetsManager.library.abcd.onLine).toBe(0)
  })
})
