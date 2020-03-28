![logo](https://avatars1.githubusercontent.com/u/54980825?s=200&v=4)

# style-hook
easy to write dynamic css

[![Build Status](https://www.travis-ci.org/style-hook/style-hook.svg?branch=master)](https://www.travis-ci.org/style-hook/style-hook)
[![codecov](https://codecov.io/gh/style-hook/style-hook/branch/master/graph/badge.svg)](https://codecov.io/gh/style-hook/style-hook)

# features
* use css in react hook
* easy to get started

# install
use npm
```bash
npm i -S style-hook
```
or use yarn
```bash
yarn add style-hook
```

## minify css in js (recommend)
add babel plugin to your .babelrc
```json
{
  "plugins": [
    "style-hook/babel"
  ]
}
```

# usage
## say hello world to get started
``` jsx
import React from 'react'
import { useStyle } from 'style-hook'
export default function() {
  const s = useStyle `
    font-size: 30px;
    margin: 20px;
    color: red;
  `
  return <div className={s}>hello world</div>
}
```

## a dynamic style example
all grammars are js, one you need to learn is js.
``` jsx
import React from 'react'
import { css, useStyle } from 'style-hook'
function HelloWorld(props) {
  const cName = useStyle `
    font-size: 30px;
    width: ${100/3}%;
    margin: ${props.margin || 10}px;
    color: ${props.color};
    :hover {
      ${props.hoverStyle}
    }
  `
  return <div className={cName}>hello world</div>
}
export default () => {
  const hoverStyle = css `color: red;`
  return (
    <HelloWorld color="pink" hoverStyle={hoverStyle} />
  )
}
```

## more usages
see the wiki: [api](https://github.com/style-hook/style-hook/wiki/api) and [F&Q](https://github.com/style-hook/style-hook/wiki/F&Q)

# typescript
support by default

# Highlight and IntelliSense (recommend)
* [vscode extension](https://marketplace.visualstudio.com/items?itemName=coppy.style-hook)

# todo list
see [TODO](./TODO)

# support me
if you like this project, star it, let more one know.

# Credits
* [styled-components](https://github.com/styled-components/styled-components)
* [stylis](https://github.com/thysultan/stylis.js)
