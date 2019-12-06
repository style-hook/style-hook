class Colors extends Array<string> {
  toString() {
    return String(this[5])
  }
  toRGBA(opacity: number, i = 5) {
    const color = this[i].slice(1)
    const Hex = (hex: string) => {
      hex = hex.toLowerCase()
      if (/[a-f]/.test(hex))
        return hex.charCodeAt(0) - 87
      return +hex
    }
    const Color256 = (hex: string) => {
      const [a, b] = hex
      return Hex(a) * 16 + Hex(b)
    }
    const r = Color256(color.slice(0, 2))
    const g = Color256(color.slice(2, 4))
    const b = Color256(color.slice(4, 6))
    return `rgba(${r},${g},${b},${opacity})`
  }
}

export const Palette = {
  RED: new Colors(
    '#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350',
    '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c',
  ),
  GREEN: new Colors(
    '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a',
    '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20',
  ),
  BLUE: new Colors(
    '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5',
    '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1',
  ),
  PINK: new Colors(
    '#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a',
    '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f',
  ),
  PURPLE: new Colors(
    '#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc',
    '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c',
  ),
  CYAN: new Colors(
    '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da',
    '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064',
  ),
  YELLOW: new Colors(
    '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58',
    '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17',
  ),
  ORANGE: new Colors(
    '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726',
    '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100',
  ),
  GRAY: new Colors(
    '#9e9e9e', '#fafafa', '#f5f5f5', '#eeeeee', '#bdbdbd',
    '#9e9e9e', '#757575', '#616161', '#424242', '#212121',
  ),
}
