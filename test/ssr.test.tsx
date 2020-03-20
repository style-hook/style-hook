/**
 * @jest-environment node
 */

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createModuleStyle, useGlobalStyle } from '../src/api'


describe('ssr', () => {
  test('render hook correct without jsdom', () => {
    function Test() {
      useGlobalStyle`color: red;`
      return <div>ok</div>
    }
    const html = ReactDOMServer.renderToString(<Test />)
    expect(html).toMatchSnapshot()
  })
  test('render createStyle correct without jsdom', () => {
    const styles = createModuleStyle ` .a {} .b {} .c {} `
    expect(Object.keys(styles)).toEqual(['a', 'b', 'c'])
  })
})
