import ClassName from '../src/ClassName'

test('same code should have same className', () => {
  const code = 'console.log(0)'
  const className0 = ClassName(code)
  const className1 = ClassName(code)
  expect(className0).toBe(className1)
})

test('different code should have different hash', () => {
  const className0 = ClassName('console.log(0)')
  const className1 = ClassName('console.log(1)')
  expect(className0).not.toBe(className1)
})
