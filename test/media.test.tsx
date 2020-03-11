import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MediaQuery } from '../src/media'

describe('media break point toString', () => {
  test('XS', () => {
    expect(`${MediaQuery.XS}`).toMatchSnapshot()
  })
  test('S', () => {
    expect(`${MediaQuery.S}`).toMatchSnapshot()
  })
  test('M', () => {
    expect(`${MediaQuery.M}`).toMatchSnapshot()
  })
  test('L', () => {
    expect(`${MediaQuery.L}`).toMatchSnapshot()
  })
  test('XL', () => {
    expect(`${MediaQuery.XL}`).toMatchSnapshot()
  })
  test('XXL', () => {
    expect(`${MediaQuery.XXL}`).toMatchSnapshot()
  })

  test('media query range', () => {
    expect(MediaQuery.range('XS'))
  })
})

describe('media query range', () => {
  test('second param is undefined', () => {
    expect(MediaQuery.range('XS')).toBe(MediaQuery.XS.toString())
  })
  test('range between XS and S', () => {
    expect(MediaQuery.range('XS', 'S')).toMatchSnapshot()
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
