![logo](https://avatars1.githubusercontent.com/u/54980825?s=200&v=4)

# style-hook

[![Build Status](https://www.travis-ci.org/style-hook/style-hook.svg?branch=master)](https://www.travis-ci.org/style-hook/style-hook)
[![codecov](https://codecov.io/gh/style-hook/style-hook/branch/master/graph/badge.svg)](https://codecov.io/gh/style-hook/style-hook)

* use css in react hook
* only one api
* easy to use

# install
use npm
```bash
npm i -S style-hook
```
or use yarn
```bash
yarn add -D style-hook
```

# features
## easy to use in a function component
``` tsx
import {useStyle} from 'style-hook'
export default function() {
  const className = useStyle `
    font-size: 30px;
    margin: 20px;
    color: red;
  `
  return <div className={className}>hello world</div>
}
```
## easy to set css properties
``` tsx
import {useStyle} from 'style-hook'
export default function(props) {
  const className = useStyle `
    font-size: ${props.fontSize}px;
    color: ${props.color};
    ::after {
      content: "${props.text}";
    }
  `
  return <div className={className}>hello world</div>
}
```
## easy to create some animations
``` tsx
import {useState} from 'react'
import {useStyle} from 'style-hook'
export default function(props) {
  const [big, setBig] = useState(false)
  const className = useStyle `
    font-size: ${big ? 50 : 20}px;
    transition: all .5s;
  `
  return <div className={className} onclick={() => setBig(!big)}>change size</div>
}
```
## easy to add some extra styles
``` tsx
import {useState} from 'react'
import {useStyle} from 'style-hook'
export default function(props) {
  const [active, setActive] = useState(false)
  const className = useStyle `
    ${active} {
      color: blue;
      font-size: 30px;
    }
  `
  return <div className={className} onclick={() => setActive(!active)}>change</div>
}
```
## media query support
```tsx
import {useStyle} from 'style-hook'
export default function(props) {
  const className = useStyle `
    @media screen and (max-width: 450px) {
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
