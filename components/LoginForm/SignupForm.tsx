'use client'
import { OAuthButtonGroup } from '@/components/LoginForm/OAuthButtonGroup'
import { PasswordField } from '@/components/LoginForm/PasswordField'
import {
  formValidationAtom,
  loginAtom,
  onSubmitAtom,
  onSubmitSuccessAtom,
} from '@/utils/store'
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
  handleSubmit: (email: string, password: string) => void
}

export default function SignupForm({ handleSubmit }: Props) {
  const [login, setLogin] = useAtom(loginAtom)

  const checkBoxRef = useRef<HTMLInputElement>(null)

  const [onSubmit] = useAtom(onSubmitAtom)
  const [onSubmitSuccess] = useAtom(onSubmitSuccessAtom)
  const [formValidation, setFormValidation] = useAtom(formValidationAtom)

  return (
    <>
      <Container
        maxW="lg"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
        <Stack spacing="8" mb={'6'}>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={'lg'}>Create a new account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Link href={'/auth/login'}>
                <Button variant="link" colorScheme="blue">
                  Sign in
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
              <FormControl isInvalid={formValidation.usernmae}>
                <FormLabel htmlFor="displayName">Name</FormLabel>
                <Input
                  id="displayName"
                  type="displayName"
                  value={login.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length < 3) {
                      setFormValidation({ ...formValidation, usernmae: true })
                    } else {
                      setFormValidation({ ...formValidation, usernmae: false })
                    }
                    setLogin({ ...login, username: e.target.value })
                  }}
                />
                {formValidation.usernmae && (
                  <FormErrorMessage>Invalid username</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={formValidation.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={login.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.value.includes('@')) {
                      setFormValidation({ ...formValidation, email: true })
                    } else {
                      setFormValidation({ ...formValidation, email: false })
                    }
                    setLogin({ ...login, email: e.target.value })
                  }}
                />
                {formValidation.email && (
                  <FormErrorMessage>Invalid email</FormErrorMessage>
                )}
              </FormControl>
              <PasswordField handleSubmit={handleSubmit} />
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
                loadingText={'Creating...'}
                colorScheme="blue"
                onClick={() => handleSubmit(login.email, login.password)}
              >
                {onSubmitSuccess ? <CheckIcon /> : 'Sign up'}
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
