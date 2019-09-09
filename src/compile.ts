/** compile the source code to css */
export default function(code: string, selector: string) {
  const codes = code.trim()
    .replace(/\s*([;{}])\s*/g, '$1\n')
    .split(/\n/)
    .filter(x => x)
  type Styles = {[selector: string]: string}
  const mediaStyles = {} as {[meida: string]: Styles}
  const selectorStack: string[] = [] // not include currentSelector
  let currentSelector = selector
  let currentMedia = ''
  let hideScoped = false
  const getCurrentStyles = () => {
    if(!mediaStyles[currentMedia])
      mediaStyles[currentMedia] = {}
    return mediaStyles[currentMedia]
  }
  const toChil = (chilSelector: string): void => {
    // TODO: split with ","
    if(chilSelector.startsWith('@media')) {
      currentMedia = chilSelector
      if(!mediaStyles[currentMedia])
        mediaStyles[currentMedia] = {}
      return
    }
    selectorStack.push(currentSelector)
    if(chilSelector.startsWith('false')) {
      hideScoped = true
      currentSelector = 'false'
      return
    }
    chilSelector = chilSelector.replace(/^true\s*/, '')
    if(chilSelector.startsWith('&'))
      currentSelector = currentSelector + chilSelector.slice(1)
    else if(chilSelector.endsWith('&'))
      currentSelector = chilSelector.slice(0, -1) + currentSelector
    else if(chilSelector.startsWith(':'))
      currentSelector = currentSelector + chilSelector
    else
      currentSelector = [currentSelector, chilSelector].join(' ').trim()
  }
  const toParent = (code: string): void => {
    if(code.length > 1)
      addCodeToCurrentScope(code.replace(/;?\s*\}/, ';'))
    if(hideScoped && selectorStack.every(selector => selector !== 'false'))
      hideScoped = false
    if(currentMedia) return void(currentMedia = '')
    const parentSelector = selectorStack.pop()
    if(!parentSelector) throw 'selectorStack error'
    currentSelector = parentSelector
  }
  const addCodeToCurrentScope = (code: string) => {
    if(hideScoped) return
    let styleSheets = getCurrentStyles()
    if(!styleSheets[currentSelector])
      styleSheets[currentSelector] = ''
    // TODO: rpx prefix
    styleSheets[currentSelector] += code
  }
  for(let codeLine of codes) {
    if(codeLine.endsWith(';'))
      addCodeToCurrentScope(codeLine)
    else if(codeLine.endsWith('{'))
      toChil(codeLine.slice(0, -1).trim())
    else if(codeLine.endsWith('}'))
      toParent(codeLine)
    else
      addCodeToCurrentScope(codeLine + ';')
  }
  return Object.entries(mediaStyles).map(([media, styles]) => {
    const code = Object.entries(styles)
      .map(([selector, code]) => `${selector}{${code}}`)
      .join('\n')
    if(media) return `${media}{\n${code}\n}`
    return code
  }).join('\n')
}
