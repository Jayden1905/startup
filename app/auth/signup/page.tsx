'use client'
import LoginForm from '@/components/LoginForm/LoginForm'
import { auth } from '@/utils/firebase'
import { loginAtom, onSubmitAtom, onSubmitSuccessAtom } from '@/utils/store'
import { useToast } from '@chakra-ui/react'
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function LoginPage() {
  const [login, setLogin] = useAtom(loginAtom)
  const [user] = useAuthState(auth)

  const router = useRouter()

  const toast = useToast()

  const [emailValidation, setEmailValidation] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState(false)

  const [_onSubmit, setOnSubmit] = useAtom(onSubmitAtom)
  const [_onSubmitSuccess, setSubmitScueess] = useAtom(onSubmitSuccessAtom)

  const pageDescription = {
    title: 'Create a new account',
    subtitle: 'Already have an account?',
  }

  const handleSubmit = async (email: string, password: string) => {
    setOnSubmit(true)
    if (
      login.email === '' ||
      !login.email.includes('@') ||
      login.password === ''
    ) {
      setEmailValidation(true)
      setPasswordValidation(true)
      setOnSubmit(false)
    } else {
      const users = await fetchSignInMethodsForEmail(auth, email)

      if (users.length === 0) {
        try {
          setSubmitScueess(true)
          await createUserWithEmailAndPassword(auth, email, password)
          setOnSubmit(false)
          setLogin({ email: '', password: '' })
          router.replace('/')
        } catch (error) {
          console.log(error)
        }
      } else {
        setSubmitScueess(false)
        setOnSubmit(false)
        toast({
          position: 'top',
          title: 'User already exist. Please login with your account.',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
        setLogin({ email: '', password: '' })
      }
    }
  }

  useEffect(() => {
    setSubmitScueess(false)

    if (user) {
      router.replace('/')
    }
  }, [])

  return (
    <>
      <LoginForm
        pageDescription={pageDescription}
        title="Create new account"
        forwardTo="Sing in"
        forwardToPath="/auth/login"
        emailValidation={emailValidation}
        setEmailValidation={setEmailValidation}
        passwordValidation={passwordValidation}
        setPasswordValidation={setPasswordValidation}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
