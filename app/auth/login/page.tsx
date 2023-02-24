'use client'
import withoutAuth from '@/components/auth/withoutAuth'
import LoginForm from '@/components/LoginForm/LoginForm'
import { auth } from '@/utils/firebase'
import { loginAtom, onSubmitAtom, onSubmitSuccessAtom } from '@/utils/store'
import { useToast } from '@chakra-ui/react'
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const LoginPage = () => {
  const [login, setLogin] = useAtom(loginAtom)
  const [user] = useAuthState(auth)

  const router = useRouter()

  const toast = useToast()

  const [emailValidation, setEmailValidation] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState(false)

  const [_onSubmit, setOnSubmit] = useAtom(onSubmitAtom)
  const [_onSubmitSuccess, setSubmitScueess] = useAtom(onSubmitSuccessAtom)

  const pageDescription = {
    title: 'Log in to your account',
    subtitle: "Don't have an account?",
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
        setOnSubmit(false)
        setLogin({ email: '', password: '' })
        toast({
          position: 'top',
          title: "User doesn't exist. Please sign up.",
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      } else {
        try {
          setSubmitScueess(true)
          await signInWithEmailAndPassword(auth, email, password)

          setOnSubmit(false)
          setLogin({ email: '', password: '' })
          router.push('/')
        } catch (error: any) {
          setSubmitScueess(false)
          setOnSubmit(false)
          if (error.code === 'auth/wrong-password') {
            setLogin({ ...login, password: '' })
            setPasswordValidation(true)
          }
        }
      }
    }
  }

  useEffect(() => {
    setSubmitScueess(false)
  }, [])

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

export default withoutAuth(LoginPage)
