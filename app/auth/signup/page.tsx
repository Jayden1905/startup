'use client'
import LoginForm from '@/components/LoginForm/LoginForm'
import { auth } from '@/utils/firebase'
import { loginAtom } from '@/utils/store'
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

  const pageDescription = {
    title: 'Create a new account',
    subtitle: 'Already have an account?',
  }

  const handleSubmit = async (email: string, password: string) => {
    if (
      login.email === '' ||
      !login.email.includes('@') ||
      login.password === ''
    ) {
      setEmailValidation(true)
      setPasswordValidation(true)
    } else {
      const users = await fetchSignInMethodsForEmail(auth, email)

      if (users.length === 0) {
        await createUserWithEmailAndPassword(auth, email, password)
        setLogin({ email: '', password: '' })
        router.replace('/')
      } else {
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
    if (user) {
      router.replace('/')
    }
  }, [user])

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
