type Library = {
  [selector: string]: {
    node: Text
    onLine: number
  }
}

export default {
  library: {} as Library,
  get element() {
    const styleElement = document.createElement('style')
    styleElement.setAttribute('engine', '🎨style-hook')
    document.head.appendChild(styleElement)
    Object.defineProperty(this, 'element', {
      writable: false,
      value: styleElement
    })
    return styleElement
  },
  addStyle(code: string) {
    const textNode = document.createTextNode(code)
    this.element.append(textNode)
  },
  removeStyle(code: string) {
    for (const node of this.element.childNodes)
      if (node.textContent === code)
        return this.element.removeChild(node)
  },
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
    if (style.onLine === 0) {
      style.node.remove()
      setTimeout(() => { // anti-shake
        if (style.onLine === 0)
          delete this.library[id] // release memory
      }, 1000)
    }
  }
}
