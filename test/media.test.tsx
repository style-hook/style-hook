import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MediaQuery } from '../src/media'

describe('media break point toString', () => {
  test('XS', () => {
    expect(`${MediaQuery.XS}`)
      .toBe(`max-width: ${MediaQuery.XS.maxWidth}px`)
  })
  test('S', () => {
    expect(`${MediaQuery.S}`)
      .toBe(`min-width: ${MediaQuery.S.minWidth}px`)
  })
  test('M', () => {
    expect(`${MediaQuery.M}`)
      .toBe(`min-width: ${MediaQuery.M.minWidth}px`)
  })
  test('L', () => {
    expect(`${MediaQuery.L}`)
      .toBe(`min-width: ${MediaQuery.L.minWidth}px`)
  })
  test('XL', () => {
    expect(`${MediaQuery.XL}`)
      .toBe(`min-width: ${MediaQuery.XL.minWidth}px`)
  })
  test('XXL', () => {
    expect(`${MediaQuery.XXL}`)
      .toBe(`min-width: ${MediaQuery.XXL.minWidth}px`)
  })
})

let container: HTMLDivElement

function render(element: JSX.Element) {
  act(() => { ReactDOM.render(element, container) })
}

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  act(() => { ReactDOM.render(<></>, container) })
  document.body.removeChild(container)
  void ((container as any) = null)
})


describe('MediaQuery', () => {
  function resizeWidth(width: number) {
    (window as any).innerWidth = width
    window.dispatchEvent(new Event('resize'))
  }
  test('break point query', () => {
    resizeWidth(375)
    render(<MediaQuery breakPoint="XS">hello</MediaQuery>)
    expect(container.textContent).toBe('hello')
  })
  test('resize width', () => {
    resizeWidth(375)
    render(<MediaQuery breakPoint="XS">hello</MediaQuery>)
    act(() => { resizeWidth(750) })
    expect(container.textContent).not.toBe('hello')
  })
})
