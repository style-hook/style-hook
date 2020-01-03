import { createModuleStyle } from '../src/api'
import StyleSheetsManager from '../src/StyleSheetsManager'

const { element } = StyleSheetsManager

afterEach(() => {
  element.innerHTML = ''
})

describe('createModuleStyle', () => {
  test('will add style to StyleSheetsManger', () => {
    const styles = createModuleStyle `
      .p {color:red}
    `
    expect(element.textContent).toContain('color:red')
    expect(Object.keys(styles)).toEqual(['p'])
  })
})
