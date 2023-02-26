'use client'
import { OAuthButtonGroup } from '@/components/LoginForm/OAuthButtonGroup'
import { onSubmitAtom, onSubmitSuccessAtom } from '@/utils/store'
import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Field, Formik } from 'formik'
import { useAtom } from 'jotai'
import { useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

type Props = {
  submitForm: (username: string, email: string, password: string) => void
}

export default function SignupForm({ submitForm }: Props) {
  const [onSubmit] = useAtom(onSubmitAtom)
  const [onSubmitSuccess] = useAtom(onSubmitSuccessAtom)

  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

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
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            onSubmit={(values) =>
              submitForm(values.username, values.email, values.password)
            }
          >
            {({ handleSubmit, errors, touched }) => (
              <form action="submit" onSubmit={handleSubmit}>
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl
                      isInvalid={!!errors.username && touched.username}
                    >
                      <FormLabel htmlFor="username">Name</FormLabel>
                      <Field
                        as={Input}
                        id="username"
                        name="username"
                        type="username"
                        validate={(value: string) => {
                          if (value.length === 0) {
                            return 'Username is required'
                          } else if (value.length < 3) {
                            return 'Username must be at least 3 characters'
                          }
                        }}
                      />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        type="email"
                        name="email"
                        validate={(value: string) => {
                          if (value.length === 0) {
                            return 'Email is required'
                          } else if (!value.includes('@')) {
                            return 'Email is invalid'
                          }
                        }}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup>
                        <InputRightElement>
                          <IconButton
                            variant="link"
                            aria-label={
                              isOpen ? 'Mask password' : 'Reveal password'
                            }
                            icon={isOpen ? <HiEyeOff /> : <HiEye />}
                            onClick={onClickReveal}
                          />
                        </InputRightElement>
                        <Field
                          as={Input}
                          id="password"
                          ref={inputRef}
                          name="password"
                          type={isOpen ? 'text' : 'password'}
                          autoComplete="current-password"
                          validate={(value: string) => {
                            if (value.length === 0) {
                              return 'Password is required'
                            } else if (value.length < 8) {
                              return 'Password must be at least 8 characters'
                            }
                          }}
                        />
                      </InputGroup>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                    <Button
                      isLoading={onSubmit}
                      loadingText={'Creating...'}
                      colorScheme="blue"
                      type="submit"
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
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  )
}
