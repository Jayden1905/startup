'use client'
import { auth } from '@/utils/firebase'
import { Button, HStack, Link as CharLink } from '@chakra-ui/react'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'

export const NavBar = () => {
  const [user] = useAuthState(auth)

  return (
    <HStack justifyContent={'space-between'} alignItems="center">
      <CharLink href={'/'}>Logo</CharLink>
      <div>
        {user ? (
          <Button rounded={'full'} px="4" onClick={() => auth.signOut()}>
            Sign Out
          </Button>
        ) : (
          <Link href={'auth/login'}>
            <Button rounded={'full'} px="4">
              Join Now
            </Button>
          </Link>
        )}
      </div>
    </HStack>
  )
}
