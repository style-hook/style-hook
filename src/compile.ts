import stylis from 'stylis'
import { MediaQuery } from './media'
import options from './options'

/** ignore illegal rule */
stylis.use((context, content) => {
  if (context !== 1) return
  const [, value] = content.split(':')
  if (!value) return ''
})

/** unit less plugin */
stylis.use((context, content) => {
  if (context !== 1) return
  if (!options.UNIT_LESS) return
  const isUnitlessNumber = [
    'animation-iteration-count',
    'border-image-outset',
    'border-image-slice',
    'border-image-width',
    'box-flex',
    'box-flex-group',
    'box-ordinal-group',
    'column-count',
    'columns',
    'flex',
    'flex-grow',
    'flex-positive',
    'flex-shrink',
    'flex-negative',
    'flex-order',
    'grid-area',
    'grid-row',
    'grid-row-end',
    'grid-row-span',
    'grid-row-start',
    'grid-column',
    'grid-column-end',
    'grid-column-span',
    'grid-column-start',
    'font-weight',
    'line-clamp',
    'line-height',
    'opacity',
    'order',
    'orphans',
    'tab-size',
    'widows',
    'z-index',
    'zoom',

    // -s-v-g-related properties
    'fill-opacity',
    'flood-opacity',
    'stop-opacity',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
  ]
  const [name, value] = content.split(':')
  if (!isUnitlessNumber.includes(name) && /^(\d+)?\.?\d+$/.test(value))
    return `${name}:${value}px`
})

/** dynamic px unit */
stylis.use((context, content) => {
  if (context !== 1) return
  if (!options.DYNAMIC_PX) return
  if (innerWidth > MediaQuery.XS.maxWidth) return
  return content.replace(/\b((?:\d+)?\.?\d+)px\b/g, (_, $1) => (
    `${(+$1 * (innerWidth / 375)).toFixed(0)}px`
  ))
})

/** rpx plugin */
stylis.use((context, content) => {
  if (context !== 1) return
  if (!options.UNIT_RPX) return
  return content.replace(/\b((?:\d+)?\.?\d+)rpx\b/g, (_, $1) => (
    `${(+$1 * (innerWidth / 750)).toFixed(0)}px`
  ))
})

/** compile the source code to css */
export default function (code: string, selector: string): string {
  return stylis(selector, code)
}
