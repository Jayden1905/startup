import { ColorMode, extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode:
    (localStorage.getItem('chakra-ui-color-mode') as ColorMode) || 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({ config })

export default theme
