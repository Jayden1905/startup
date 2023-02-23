'use client'
import { OAuthButtonGroup } from '@/components/LoginForm/OAuthButtonGroup'
import { PasswordField } from '@/components/LoginForm/PasswordField'
import { auth } from '@/utils/firebase'
import { loginAtom } from '@/utils/store'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function LoginPage() {
  const [login, setLogin] = useAtom(loginAtom)
  const [user] = useAuthState(auth)
  const router = useRouter()

  const handleLogin = () => {
    console.log(login)
    setLogin({ email: '', password: '' })
  }

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user])

  return (
    <>
      {!user && (
        <Container
          maxW='lg'
          py={{ base: '12', md: '24' }}
          px={{ base: '0', sm: '8' }}
        >
          <Stack spacing='8' mb={'6'}>
            <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
              <Heading size={'lg'}>Log in to your account</Heading>
              <HStack spacing='1' justify='center'>
                <Text color='muted'>Don't have an account?</Text>
                <Button variant='link' colorScheme='blue'>
                  Sign up
                </Button>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg-surface' }}
            boxShadow={{ base: 'none', sm: 'lg' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    id='email'
                    type='email'
                    value={login.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setLogin({ ...login, email: e.target.value })
                    }}
                  />
                </FormControl>
                <PasswordField />
              </Stack>
              <HStack justify='space-between'>
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant='link' colorScheme='blue' size='sm'>
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing='6'>
                <Button colorScheme='blue' onClick={handleLogin}>
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </Box>
        </Container>
      )}
    </>
  )
}
