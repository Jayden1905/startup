'use client'
import LoginForm from '@/components/LoginForm/LoginForm'
import { auth } from '@/utils/firebase'
import { loginAtom } from '@/utils/store'
import { useToast } from '@chakra-ui/react'
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
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
    title: 'Log in to your account',
    subtitle: "Don't have an account?",
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
        toast({
          position: 'top',
          title: "User doesn't exist. Please sign up.",
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      } else {
        try {
          await signInWithEmailAndPassword(auth, email, password)
          setLogin({ email: '', password: '' })
        } catch (error: any) {
          if (error.code === 'auth/wrong-password') {
            setLogin({ ...login, password: '' })
            setPasswordValidation(true)
          }
        }
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
        title="Sign in"
        forwardTo="Sing up"
        forwardToPath="/auth/signup"
        emailValidation={emailValidation}
        setEmailValidation={setEmailValidation}
        passwordValidation={passwordValidation}
        setPasswordValidation={setPasswordValidation}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
