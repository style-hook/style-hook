import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { useStyle } from '../src/api'
import StyleSheetsManager from '../src/StyleSheetsManager'

let container: HTMLDivElement
const styleEl = document.querySelector('style')!

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
