const styleElement = document.createElement('style')
styleElement.setAttribute('engine', '🎨style-hook')
document.head.appendChild(styleElement)

type Library = {
  [selector: string]: {
    node: Text
    onLine: number
  }
}

export default {
  library: {} as Library,
  element: styleElement,
  createStyle(id: string, code: string) {
    const textNode = document.createTextNode(code)
    this.library[id] = { onLine: 0, node: textNode }
  },
  useStyle(id: string, getCode: () => string): void {
    if(!this.library[id])
      this.createStyle(id, getCode())
    const style = this.library[id]
    if(!style.onLine)
      this.element.append(style.node)
    style.onLine ++
  },
  unUseStyle(id: string) {
    const style = this.library[id]
    style.onLine --
    if(style.onLine === 0)
      style.node.remove()
  }
}
