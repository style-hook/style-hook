import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { useStyle, useGlobalStyle } from '../src/hooks'
import StyleSheetsManager from '../src/StyleSheetsManager'

let container: HTMLDivElement
const styleEl = StyleSheetsManager.element

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

describe('useStyle', () => {
  function ColorText(props: {color: string}) {
    const className = useStyle `
      color:${props.color};
    `
    return <div className={className}>{props.color}</div>
  }

  test('after render will have a style', () => {
    render(<ColorText color="blue" />)
    const div = container.querySelector('div')!
    expect(styleEl.innerHTML).toBe(`.${div.className}{color:blue;}`)
  })

  test('change code, the style will change', () => {
    render(<ColorText color="blue" />)
    const div = container.querySelector('div')!
    expect(styleEl.innerHTML).toBe(`.${div.className}{color:blue;}`)
    render(<ColorText color="red" />)
    expect(styleEl.innerHTML).toBe(`.${div.className}{color:red;}`)
  })

  test('if code don\'t change, StyleSheetsManager will don\'t call', () => {
    const useStyle = jest.spyOn(StyleSheetsManager, 'useStyle')
    render(<ColorText color="blue" />)
    expect(useStyle).toBeCalled()
    useStyle.mockClear()
    render(<ColorText color="blue" />)
    expect(useStyle).not.toBeCalled()
    render(<ColorText color="red" />)
    expect(useStyle).toBeCalled()
  })
})

describe('useGlobalStyle', () => {
  function GlobalStyle() {
    useGlobalStyle `
      body {
        background:#f8f8f8;
      }
    `
    return <></>
  }

  test('global style will work when the component mount', () => {
    render(<GlobalStyle />)
    expect(styleEl.innerHTML).toBe('body{background:#f8f8f8;}')
  })
  test('global style will be removed when the component unmount', () => {
    render(<GlobalStyle />)
    render(<></>)
    expect(styleEl.innerHTML).toBe('')
  })
})
