'use client'
import { auth } from '@/utils/firebase'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Link as CharLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MdOutlineLogout, MdPayment, MdSwitchAccount } from 'react-icons/md'

export const NavBar = () => {
  const { toggleColorMode } = useColorMode()
  const [user] = useAuthState(auth)
  const router = useRouter()

  return (
    <HStack justifyContent={'space-between'} alignItems='center'>
      <CharLink
        style={{ fontSize: '1.5rem', textDecoration: 'none' }}
        href={'/'}
      >
        Oddinary
      </CharLink>
      <HStack gap={'2'}>
        <IconButton
          aria-label={'theme-switcher'}
          size={'lg'}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
          variant={'ghost'}
        />
        {user ? (
          <Menu>
            <MenuButton>
              <Avatar
                name={auth.currentUser?.displayName!}
                src={auth.currentUser?.photoURL!}
                size='sm'
              />
            </MenuButton>
            <MenuList fontSize={'15px'}>
              <MenuItem>
                <MdSwitchAccount
                  style={{ fontSize: '15px', marginRight: '12px' }}
                />
                Account
              </MenuItem>
              <MenuItem>
                <MdPayment style={{ fontSize: '15px', marginRight: '12px' }} />
                Billing
              </MenuItem>
              <MenuItem
                onClick={() => {
                  auth.signOut()
                  router.push('/auth/login')
                }}
              >
                <MdOutlineLogout
                  style={{ fontSize: '15px', marginRight: '12px' }}
                />
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link href={'auth/signup'}>
            <Button colorScheme={'blue'} size='sm' rounded={'md'}>
              Join Now
            </Button>
          </Link>
        )}
      </HStack>
    </HStack>
  )
}
