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
## easy to change css properties
``` tsx
import {useStyle} from 'style-hook'
export default function(props) {
  const className = useStyle `
    font-size: ${props.fontSize || 20}px;
    color: ${props.color || 'blue'};
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


# editor extension
* will complete soon

# compress es6 template plugin
* will complete soon

# todo list
* useCssModule
* useGlobalStyle

* compile rpx unit
* compile auto add browser prefix if need
* media query support
