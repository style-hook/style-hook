import React, { useEffect, useState } from 'react'

interface MediaQueryProps {
  breakPoint?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
}
function mediaQuery(query: MediaQueryProps): boolean {
  if (query.breakPoint)
    return mediaQuery(MediaQuery[query.breakPoint])
  if (typeof query.maxWidth === 'number' && innerWidth > query.maxWidth)
    return false
  if (typeof query.minWidth === 'number' && innerWidth < query.minWidth)
    return false
  if (typeof query.maxHeight === 'number' && innerHeight > query.maxHeight)
    return false
  if (typeof query.minHeight === 'number' && innerHeight < query.minHeight)
    return false
  return true
}

export function useMediaQuery(query: MediaQueryProps) {
  const [match, setMatch] = useState(() => mediaQuery(query))
  useEffect(() => {
    const handleResize = () => setMatch(mediaQuery(query))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [query])
  return match
}

/**
 * @example <MediaQuery breakPoint="XS">you can see me in the phone.</MediaQuery>
 */
export function MediaQuery(props: React.PropsWithChildren<MediaQueryProps>) {
  const match = useMediaQuery(props)
  return match
    ? React.createElement(React.Fragment, {}, props.children )
    : null
}
/** Extra small devices (portrait phones, less than 576px) */
MediaQuery.XS = { maxWidth: 576 }
/** Small devices (landscape phones, 576px and up) */
MediaQuery.S = { minWidth: 576 }
/** Medium devices (tablets, 768px and up) */
MediaQuery.M = { minWidth: 768 }
/** Large devices (desktops, 992px and up) */
MediaQuery.L = { minWidth: 992 }
/** Extra large devices (large desktops, 1200px and up) */
MediaQuery.XL = { minWidth: 1200 }
/** Very very large devices (1K/2K/... desktops, 1920px and up) */
MediaQuery. XXL = { minWidth: 1920 }

{
  function toMediaQueryString(this: MediaQueryProps) {
    if (typeof this.minWidth === 'number')
      return `min-width: ${this.minWidth}px`
    if (typeof this.maxWidth === 'number')
      return `max-width: ${this.maxWidth}px`
    return ''
  }
  ['XS', 'S', 'M', 'L', 'XL', 'XXL'].forEach((key) => {
    Object.defineProperty(
      (MediaQuery as any)[key],
      'toString',
      { enumerable: false, value: toMediaQueryString }
    )
  })
}
