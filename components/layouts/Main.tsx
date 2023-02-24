'use client'
import { auth } from '@/utils/firebase'
import theme from '@/utils/theme'
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Container,
} from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loader from '../Loader'
import { NavBar } from '../Nav'

interface Props {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  const [_user, loading] = useAuthState(auth)
  return (
    <main>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {loading ? (
          <Loader />
        ) : (
          <Container
            mt={'4'}
            maxW={'8xl'}
            gap={'6'}
            display="flex"
            flexDirection={'column'}
          >
            <NavBar />
            <Box>{children}</Box>
          </Container>
        )}
      </ChakraProvider>
    </main>
  )
}

export default MainLayout
