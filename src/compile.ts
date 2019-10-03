import stylis from 'stylis'

/** compile the source code to css */
export default function(code: string, selector: string) {
  return stylis(selector, code)
}
