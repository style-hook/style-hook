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
yarn add style-hook
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

more useages see the wiki: [api](https://github.com/style-hook/style-hook/wiki/api) and [F&Q](https://github.com/style-hook/style-hook/wiki/F&Q)

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
