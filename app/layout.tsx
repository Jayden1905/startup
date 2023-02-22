'use client'

import { NavBar } from '@/components/Nav'
import theme from '@/utils/theme'
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Container,
  useColorModeValue,
} from '@chakra-ui/react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <Container mt={'4'} maxW={'8xl'}>
            <NavBar />
            <Box>{children}</Box>
          </Container>
        </ChakraProvider>
      </body>
    </html>
  )
}
