![logo](https://avatars1.githubusercontent.com/u/54980825?s=200&v=4)

# style-hook

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
yarn add -D style-hook
```

# usage
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

# F&Q
## can I add a global style
yes, you can use the `useGlobalStyle` api,
and it's very useful when you want different bg in the spa.
```jsx
import React from 'react'
import { useGlobalStyle } from 'style-hook'
function RoutePage() {
  useGlobalStyle `
    body { background: #f8f8f8 }
  `
  return <div>when I mount, the bg of page will be gray.</div>
}
```

## can I write my code like cssModule?
you can use useModuleStyle api
```jsx
import React from 'react'
import { useModuleStyle } from 'style-hook'
function RoutePage() {
  const s = useModuleStyle `
    .red { color: red }
    .blue { color: blue }
  `
  return (
    <div>
      <div className={s.red}>red</div>
      <div className={s.blue}>blue</div>
    </div>
  )
}
```

## can I set css properties from props
yes, the template is dynamic, so you can insert any dynamic style codes.
the code will be lazy compiled when it change and then cache the result, so it's very fast.
``` tsx
function Hello(props) {
  const s = useStyle `
    font-size: ${props.big ? 20 : 15}px;
    color: ${props.color || 'black'};
    ::after {
      content: "${props.text}";
    }
  `
  return <div className={s}>hello world</div>
}
```

## how to add the extra styles elegantly, I don't want to use the `condition ? code : '' `
you can use `&&`, we will filter the falsy value like as null, false, undefined
```js
export default function(props) {
  const s = useStyle `
    ${!!props.transparent && css `
      opacity: 0;
    `}
  `
  return <div className={s}>you can't see me, when the `props.transparent` is `true`</div>
}
```
when `props.transparent` is true, the style will have `opacity: 0`

## how to write media query
```jsx
import {useStyle} from 'style-hook'
export default function(props) {
  const className = useStyle `
    @media screen and (max-width: 576px) {
      color: red;
    }
  `
  return <div className={className}>will be red in the phone</div>
}
```

## have scss features
``` tsx
import {useStyle} from 'style-hook'
export default function(props) {
  const className = useStyle `
    color: red;
    :hover {
      color: blue;
    }
    .a {
      font-size: 25px;
    }
    .b {
      font-size: 15px;
    }
    &.self {
      margin: 10;
    }
    .parent & {
      padding: 10;
    }
  `
  return (
    <div className="parent">
      <div className={[className, 'self'].join(' ')}>
        <div className="a">I am A.</div>
        <div className="b">I am B.</div>
      </div>
    </div>
  )
}
```

## what's rpx?
rpx is a unit for webapp.

2rpx = 1px in iphone6, it like your UI size (750 * 1334).

if you use rpx instand of px to write your webapp and it look OK in iphone6,
then it well look the same in any phone screen except the height.

[reference](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxss.html#Dimension%20Unit)

# typescript
support by default

# Highlight and IntelliSense
* [vscode extension](https://marketplace.visualstudio.com/items?itemName=coppy.style-hook)

# compress es6 tagged template plugin
* [babel-plugin-style-hook](https://github.com/style-hook/babel-plugin-style-hook)

# todo list
see [TODO](./TODO)

# support me
if you like this project, star it, let more one konw.

# Credits
* [styled-components](https://github.com/styled-components/styled-components)
* [stylis](https://github.com/thysultan/stylis.js)
