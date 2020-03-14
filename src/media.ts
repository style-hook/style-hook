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
  }, [])
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


type ScreenSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
class Screen {
  static sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  static breakPoints = [576, 768, 992, 1200, 1920]
  size!: ScreenSize
  minWidth = 0
  maxWidth = Infinity
  constructor(size: ScreenSize) {
    const i = Screen.sizes.indexOf(size)
    this.size = size
    if (i !== -1) {
      if (size !== 'XS')
        this.minWidth = Screen.breakPoints[i - 1]
      if (size !== 'XXL')
        this.maxWidth = Screen.breakPoints[i] - 1
    }
  }
  toString() {
    const bebabCase = (name: string) => name.replace(/[A-Z]/g, $ => `-${$.toLowerCase()}`)
    return `@media screen ${
      (<('minWidth'|'maxWidth')[]>['minWidth', 'maxWidth'])
        .filter(property => ![0, Infinity].includes(this[property]))
        .map(property => `and (${bebabCase(property)}:${this[property]}px)`)
        .join(' ')
    }`
  }
}

/** Extra small devices (portrait phones, less than 576px) */
MediaQuery.XS = new Screen('XS')
/** Small devices (landscape phones, 576px and up, but less than 768px) */
MediaQuery.S = new Screen('S')
/** Medium devices (tablets, 768px and up, but less than 992px) */
MediaQuery.M = new Screen('M')
/** Large devices (desktops, 992px and up, but less than 1200px) */
MediaQuery.L = new Screen('L')
/** Extra large devices (large desktops, 1200px and up, but less than 1920px) */
MediaQuery.XL = new Screen('XL')
/** Very very large devices (1K/2K/... desktops, 1920px and up) */
MediaQuery. XXL = new Screen('XXL')

/** select the range between the screen */
MediaQuery.range = function (a: ScreenSize, b?: ScreenSize) {
  if (typeof b === 'undefined')
    return MediaQuery[a].toString()
  const minWidth = Math.min(
    MediaQuery[a].minWidth,
    MediaQuery[b].minWidth,
  )
  const maxWidth = Math.max(
    MediaQuery[a].maxWidth,
    MediaQuery[b].maxWidth,
  )
  return Screen.prototype.toString.call({
    minWidth, maxWidth
  })
}
