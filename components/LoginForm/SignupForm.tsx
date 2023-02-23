'use client'
import { OAuthButtonGroup } from '@/components/LoginForm/OAuthButtonGroup'
import { PasswordField } from '@/components/LoginForm/PasswordField'
import { loginAtom, onSubmitAtom, onSubmitSuccessAtom } from '@/utils/store'
import { CheckIcon } from '@chakra-ui/icons'
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
  displayName: string
  setDisplayName: (value: string) => void
  displayNameValidation: boolean
  setDisplayNameValidation: (value: boolean) => void
}

export default function SignupForm({
  pageDescription,
  title,
  forwardTo,
  forwardToPath,
  handleSubmit,
  emailValidation,
  passwordValidation,
  setEmailValidation,
  setPasswordValidation,
  displayName,
  setDisplayName,
  displayNameValidation,
  setDisplayNameValidation,
}: Props) {
  const [login, setLogin] = useAtom(loginAtom)

  const checkBoxRef = useRef<HTMLInputElement>(null)

  const [onSubmit] = useAtom(onSubmitAtom)
  const [onSubmitSuccess] = useAtom(onSubmitSuccessAtom)

  return (
    <>
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
              <FormControl isInvalid={displayNameValidation}>
                <FormLabel htmlFor="displayName">Name</FormLabel>
                <Input
                  id="displayName"
                  type="displayName"
                  value={displayName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length < 3) {
                      setDisplayNameValidation(true)
                    } else {
                      setDisplayNameValidation(false)
                    }
                    setDisplayName(e.target.value)
                  }}
                />
                {displayNameValidation && (
                  <FormErrorMessage>Invalid username</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={emailValidation}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(login.email, login.password)
                    }
                  }}
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
                handleSubmit={handleSubmit}
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
                isLoading={onSubmit}
                loadingText={
                  title === 'Sign in' ? 'Loggin in...' : 'Creating...'
                }
                colorScheme="blue"
                onClick={() => handleSubmit(login.email, login.password)}
              >
                {onSubmitSuccess ? <CheckIcon /> : title}
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
    </>
  )
}
