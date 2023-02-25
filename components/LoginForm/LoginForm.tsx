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

export default function LoginForm({ handleSubmit }: Props) {
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
            <Heading size={'lg'}>Log in to your account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Link href="/auth/signup">
                <Button variant="link" colorScheme="blue">
                  Sign up
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
                loadingText={'Loggin in...'}
                colorScheme="blue"
                onClick={() => handleSubmit(login.email, login.password)}
              >
                {onSubmitSuccess ? <CheckIcon /> : 'Sign in'}
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
