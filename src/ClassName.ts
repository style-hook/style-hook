/** convert the charCode to [0-9A-Za-z] */
function toWord(charCode: number) {
  // 0-9 : 48-57
  // A-Z : 65-90
  // a-z : 97-122
  const scope = 10 + 26 + 26
  charCode = charCode % scope
  if(charCode < 10)
    return String.fromCharCode(48 + charCode)
  charCode -= 10
  if(charCode < 26)
    return String.fromCharCode(65 + charCode)
  charCode -= 26
  return String.fromCharCode(97 + charCode)
}

const ICON_EMOJI = '🎨'  // to avoid className start with number

/** compute the hash of the code simply */
export default function (code: string, length = 8) {
  const classNameCodes: number[] = new Array(length).fill(code.length)
  for(let i=0; i<code.length; i++)
    classNameCodes[i%length] += code.charCodeAt(i)
  return ICON_EMOJI + classNameCodes.map(toWord).join('')
}
