import { Palette } from '../src/palette'

test('color to string', () => {
  expect(String(Palette.GREEN)).toBe(Palette.GREEN[5])
})

test('to rgba', () => {
  expect(Palette.GREEN.toRGBA(0.1))
    .toMatch(/^rgba\(\d{1,3},\d{1,3},\d{1,3},0\.1\)$/)
})
