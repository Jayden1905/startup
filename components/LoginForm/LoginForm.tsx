'use client'
import { OAuthButtonGroup } from '@/components/LoginForm/OAuthButtonGroup'
import { onSubmitAtom, onSubmitSuccessAtom } from '@/utils/store'
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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Field, Formik, FormikHelpers } from 'formik'
import { useAtom } from 'jotai'
import { HiEye, HiEyeOff } from 'react-icons/hi'

type Props = {
  submitForm: (
    email: string,
    password: string,
    actions: FormikHelpers<{ email: string; password: string }>
  ) => void
}

export default function LoginForm({ submitForm }: Props) {
  const [onSubmit] = useAtom(onSubmitAtom)
  const [onSubmitSuccess] = useAtom(onSubmitSuccessAtom)

  const { isOpen, onToggle } = useDisclosure()

  const onClickReveal = () => {
    onToggle()
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
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values, actions) => {
              submitForm(values.email, values.password, actions)
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form action="submit" onSubmit={handleSubmit}>
                <Stack spacing="6">
                  <Stack spacing="5">
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
                  <HStack justify="space-between">
                    <Checkbox isChecked defaultChecked>
                      Remember me
                    </Checkbox>
                    <Button variant="link" colorScheme="blue" size="sm">
                      Forgot password?
                    </Button>
                  </HStack>
                  <Stack spacing="6">
                    <Button
                      isLoading={onSubmit}
                      loadingText={'Logging in...'}
                      colorScheme="blue"
                      type="submit"
                    >
                      {onSubmitSuccess ? <CheckIcon /> : 'Login'}
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
