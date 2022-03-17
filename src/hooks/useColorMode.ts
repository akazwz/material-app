import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { colorModeState, isSystemState } from '../state/color-mode'
import { useMediaQuery } from '@mui/material'

export const useColorMode = () => {
  const [colorMode, setColorMode] = useRecoilState(colorModeState)
  const [isSystem, setIsSystem] = useRecoilState(isSystemState)
  const [isReady, setIsReady] = useState<boolean>(false)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const preferredMode = prefersDarkMode ? 'dark' : 'light'

  useEffect(() => {
    const colorModeLocal = localStorage.getItem('colorMode')
    switch (colorModeLocal) {
      case 'dark':
        setIsSystem(false)
        setColorMode('dark')
        break
      case 'light':
        setIsSystem(false)
        setColorMode('light')
        break
      default:
        setIsSystem(true)
        setColorMode(preferredMode)
        break
    }
    setIsReady(true)
  }, [preferredMode, prefersDarkMode, setColorMode, setIsSystem])

  const toggleColorMode = () => {
    if (colorMode === 'dark') {
      setLight()
    }
    setDark()
  }

  const setDark = () => {
    setIsSystem(false)
    setColorMode('dark')
    localStorage.setItem('colorMode', 'dark')
  }

  const setLight = () => {
    setIsSystem(false)
    setColorMode('light')
    localStorage.setItem('colorMode', 'light')
  }

  const followSystem = () => {
    setIsSystem(true)
    localStorage.setItem('colorMode', 'auto')
    setColorMode(preferredMode)
    return
  }

  return {
    colorMode,
    isReady,
    isSystem,
    toggleColorMode,
    setDark,
    setLight,
    followSystem,
  }
}