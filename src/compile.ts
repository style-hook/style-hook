/** compile the source code to css */
export default function(code: string, selector: string) {
  const codes = code.trim().split(/(?<=[;{}])(\b|\B)\s*/).filter(x => x)
  const styles = {} as {[selector: string]: string}
  const selectorStack: string[] = [] // note include currentSelector
  let currentSelector = selector
  let hideScoped = false
  const toChil = (chilSelector: string) => {
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
  const toParent = (code: string) => {
    if(code.length > 1)
      addCodeToCurrentScope(code.replace(/;?\s*\}/, ';'))
    if(hideScoped && selectorStack.every(selector => selector !== 'false'))
      hideScoped = false
    const parentSelector = selectorStack.pop()
    if(!parentSelector) throw 'selectorStack error'
    currentSelector = parentSelector
  }
  const addCodeToCurrentScope = (code: string) => {
    if(hideScoped) return
    // TODO: rpx prefix
    if(!styles[currentSelector])
      styles[currentSelector] = ''
    styles[currentSelector] += code
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
  return Object.entries(styles)
    .map(([selector, code]) => `${selector}{${code}}`)
    .join('\n')
}
