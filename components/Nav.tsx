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
    <HStack justifyContent={'space-between'} alignItems="center">
      <CharLink style={{ fontSize: '2rem', textDecoration: 'none' }} href={'/'}>
        Oddinary
      </CharLink>
      <HStack gap={'1'}>
        <IconButton
          aria-label={'theme-switcher'}
          size="lg"
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
        />
        {user ? (
          <Menu>
            <MenuButton>
              <Avatar
                name={auth.currentUser?.displayName!}
                src={auth.currentUser?.photoURL!}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <MdSwitchAccount
                  style={{ fontSize: '20px', marginRight: '10px' }}
                />
                Account
              </MenuItem>
              <MenuItem>
                <MdPayment style={{ fontSize: '20px', marginRight: '10px' }} />
                Payments
              </MenuItem>
              <MenuItem
                onClick={() => {
                  auth.signOut()
                  router.replace('/auth/login')
                }}
              >
                <MdOutlineLogout
                  style={{ fontSize: '20px', marginRight: '10px' }}
                />
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link href={'auth/signup'}>
            <Button
              rounded={'full'}
              size={'lg'}
              fontSize={'md'}
              variant="outline"
            >
              Join Now
            </Button>
          </Link>
        )}
      </HStack>
    </HStack>
  )
}
