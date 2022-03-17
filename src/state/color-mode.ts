import { atom, selector } from 'recoil'

export const colorModeState = atom<'light' | 'dark'>({
  key: 'colorMode',
  default: 'light'
})

export const isSystemState = atom<boolean>({
  key: 'isSystem',
  default: false,
})

export const trueColorMode = selector({
  key: 'trueColorMode',
  get: ({ get }) => {
    const isSystem = get(isSystemState)
    const color = get(colorModeState)
    return isSystem ? 'auto' : color
  }
})
