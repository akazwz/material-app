import { atom } from 'recoil'

export const htmlIconState = atom<string>({
  key: 'htmlIcon',
  default: '/favicon.ico'
})

export const htmlTitleState = atom<string>({
  key: 'htmlTitle',
  default: 'mui-next'
})