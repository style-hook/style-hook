import css from '../src/css'

test('look like String.raw', () => {
  expect(`
    xxxxxxxx
    ${11111111}
    yyyyyyyyyyyy
  `).toBe(`
    xxxxxxxx
    ${11111111}
    yyyyyyyyyyyy
  `)
})

describe('empty value', () => {
  test('null', () => {
    expect(css `${null}`).toBe('')
  })
  test('falsy', () => {
    expect(css `${false}`).toBe('')
  })
  test('undefined', () => {
    expect(css `${undefined}`).toBe('')
  })
})
