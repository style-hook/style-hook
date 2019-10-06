import stylis from 'stylis'

/** rpx plugin */
stylis.use((context, content) => {
  if (context !== 1) return
  const compileRPX = (_: string, $1: string) => {
    const n = +$1
    return `${(n * (innerWidth / 750)).toFixed(0)}px`
  }
  return content.replace(/([\d.]+)rpx/g, compileRPX)
})

/** compile the source code to css */
export default function(code: string, selector: string): string {
  return stylis(selector, code)
}
