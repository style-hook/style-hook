const styleEl = document.createElement('style')
document.head.appendChild(styleEl)

type Library = {
  [selector: string]: {
    node: Text
    onLine: number
  }
}

export default {
  library: {} as Library,
  useStyle(id: string, code: string): void {
    if(this.library[id])
      return void this.library[id].onLine ++
    const textNode = document.createTextNode(code)
    this.library[id] = { onLine: 1, node: textNode }
    styleEl.append(textNode)
  },
  unUseStyle(id: string) {
    const style = this.library[id]
    style.onLine --
    if(style.onLine) return
    style.node.remove()
    delete this.library[id]
  }
}
