'use client'

import { NavBar } from '@/components/Nav'
import { auth } from '@/utils/firebase'
import theme from '@/utils/theme'
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Container,
  Spinner,
} from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [_user, loading] = useAuthState(auth)

  return (
    <html lang="en">
      <head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          {loading ? (
            <Box
              width={'full'}
              height={'100vh'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Spinner size={'xl'} />
            </Box>
          ) : (
            <Container mt={'4'} maxW={'8xl'}>
              <NavBar />
              <Box>{children}</Box>
            </Container>
          )}
        </ChakraProvider>
      </body>
    </html>
  )
}
