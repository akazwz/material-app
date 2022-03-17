import { useColorMode } from './useColorMode'

export const useColorModeValue = <TLight = unknown, TDark = unknown> (light: TLight, dark: TDark) => {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}