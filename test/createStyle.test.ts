import { createModuleStyle } from '../src/api'
import StyleSheetsManager from '../src/StyleSheetsManager'

const { element } = StyleSheetsManager

afterEach(() => {
  element.innerHTML = ''
})

function resizeWidth(width: number) {
  (window as any).innerWidth = width
  window.dispatchEvent(new Event('resize'))
}

describe('createModuleStyle', () => {
  test('will add style to StyleSheetsManger', () => {
    const styles = createModuleStyle `
      .p {color:red}
    `
    expect(element.textContent).toContain('color:red')
    expect(Object.keys(styles)).toEqual(['p'])
  })
  test('should rebuild after resize window', () => {
    resizeWidth(375)
    createModuleStyle `
      .p {width: 750rpx}
    `
    const style1 = element.textContent
    resizeWidth(400)
    const style2 = element.textContent
    expect(style1).not.toBe(style2)
  })
})
