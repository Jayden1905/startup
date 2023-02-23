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
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { ChangeEvent, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
  pageDescription: { title: string; subtitle: string }
  title: string
  forwardTo: string
  forwardToPath: string
  handleSubmit: (email: string, password: string) => void
  emailValidation: boolean
  passwordValidation: boolean
  setEmailValidation: (value: boolean) => void
  setPasswordValidation: (value: boolean) => void
}

export default function LoginForm({
  pageDescription,
  title,
  forwardTo,
  forwardToPath,
  handleSubmit,
  emailValidation,
  passwordValidation,
  setEmailValidation,
  setPasswordValidation,
}: Props) {
  const [login, setLogin] = useAtom(loginAtom)
  const [user] = useAuthState(auth)

  const checkBoxRef = useRef<HTMLInputElement>(null)

  return (
    <>
      {!user && (
        <Container
          maxW="lg"
          py={{ base: '12', md: '24' }}
          px={{ base: '0', sm: '8' }}
        >
          <Stack spacing="8" mb={'6'}>
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={'lg'}>{pageDescription.title}</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">{pageDescription.subtitle}</Text>
                <Link href={forwardToPath}>
                  <Button variant="link" colorScheme="blue">
                    {forwardTo}
                  </Button>
                </Link>
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
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isInvalid={emailValidation}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={login.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (!e.target.value.includes('@')) {
                        setEmailValidation(true)
                      } else {
                        setEmailValidation(false)
                      }
                      setLogin({ ...login, email: e.target.value })
                    }}
                  />
                  {emailValidation && (
                    <FormErrorMessage>Invalid email</FormErrorMessage>
                  )}
                </FormControl>
                <PasswordField
                  passwordValidation={passwordValidation}
                  setPasswordValidation={setPasswordValidation}
                />
              </Stack>
              <HStack justify="space-between">
                <Checkbox ref={checkBoxRef} isChecked defaultChecked>
                  Remember me
                </Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button
                  colorScheme="blue"
                  onClick={() => handleSubmit(login.email, login.password)}
                >
                  {title}
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
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
