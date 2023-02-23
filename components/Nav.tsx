'use client'
import { auth } from '@/utils/firebase'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Button,
  HStack,
  IconButton,
  Link as CharLink,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'

export const NavBar = () => {
  const { toggleColorMode } = useColorMode()
  const [user] = useAuthState(auth)

  return (
    <HStack justifyContent={'space-between'} alignItems="center">
      <CharLink style={{ fontSize: '2rem', textDecoration: 'none' }} href={'/'}>
        Oddinary
      </CharLink>
      <HStack gap={'1'}>
        <IconButton
          aria-label={'theme-switcher'}
          bg={'transparent'}
          size="lg"
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
        />
        {user ? (
          <Button
            rounded={'lg'}
            size={'md'}
            onClick={() => auth.signOut()}
            variant="outline"
          >
            Sign Out
          </Button>
        ) : (
          <Link href={'auth/signup'}>
            <Button rounded={'lg'} size={'md'} variant="outline">
              Join Now
            </Button>
          </Link>
        )}
      </HStack>
    </HStack>
  )
}
