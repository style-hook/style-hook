import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { useStyle, useGlobalStyle, useModuleStyle } from '../src/hooks'
import StyleSheetsManager from '../src/StyleSheetsManager'
import options from '../src/options'

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

describe('useModuleStyle', () => {
  function ModuleStyle(props: {onStyles: (styles: any) => void}) {
    const styles = useModuleStyle`
      .a { color: blue }
      .b::after { color: blue }
      .c div { width: 11.1px }
      .a.d, .b.e {
        .f { opacity: 0.3 }
      }
    `
    props.onStyles(styles)
    return <></>
  }
  test('return module name mapping object', () => {
    let styles: any = {}
    render(<ModuleStyle onStyles={s => styles = s} />)
    expect(Object.keys(styles)).toEqual(['a','b','c','d','e','f'])
  })
  test('style contain the mapping name', () => {
    let styles: any = {}
    render(<ModuleStyle onStyles={s => styles = s} />)
    const styleHTML = styleEl.innerHTML
    Object.keys(styles).forEach(key => {
      expect(styleHTML).toContain(`.${styles[key]}`)
    })
  })
})

describe('window resize', () => {
  function resizeWidth(width: number) {
    // @ts-ignore
    window.innerWidth = width
    window.dispatchEvent(new Event('resize'))
  }
  test('dynamic px will recount when window resize', () => {
    function DynamicPx() {
      const cName = useStyle`
        width: 375px;
      `
      return <div className={cName} />
    }
    resizeWidth(375)
    options.DYNAMIC_PX = true
    render(<DynamicPx />)
    expect(styleEl.textContent).toContain('width:375px')
    act(() => { resizeWidth(320) })
    expect(styleEl.textContent).toContain('width:320px')
    options.DYNAMIC_PX = false
  })
})
