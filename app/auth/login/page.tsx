'use client'
import withoutAuth from '@/components/auth/withoutAuth'
import LoginForm from '@/components/LoginForm/LoginForm'
import { auth } from '@/utils/firebase'
import {
  formValidationAtom,
  loginAtom,
  onSubmitAtom,
  onSubmitSuccessAtom,
} from '@/utils/store'
import { useToast } from '@chakra-ui/react'
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LoginPage = () => {
  const [login, setLogin] = useAtom(loginAtom)

  const router = useRouter()

  const toast = useToast()

  const [_onSubmit, setOnSubmit] = useAtom(onSubmitAtom)
  const [_onSubmitSuccess, setSubmitScueess] = useAtom(onSubmitSuccessAtom)
  const [formValidation, setFormValidation] = useAtom(formValidationAtom)

  const handleSubmit = async (email: string, password: string) => {
    setOnSubmit(true)
    if (
      login.email === '' ||
      !login.email.includes('@') ||
      login.password === ''
    ) {
      setFormValidation({ ...formValidation, email: true, password: true })
      setOnSubmit(false)
    } else {
      const users = await fetchSignInMethodsForEmail(auth, email)

      if (users.length === 0) {
        setOnSubmit(false)
        setLogin({ ...login, email: '', password: '' })
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
          setLogin({ ...login, email: '', password: '' })
          router.push('/')
        } catch (error: any) {
          setSubmitScueess(false)
          setOnSubmit(false)
          if (error.code === 'auth/wrong-password') {
            setLogin({ ...login, password: '' })
            setFormValidation({ ...formValidation, password: true })
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
      <LoginForm handleSubmit={handleSubmit} />
    </>
  )
}

export default withoutAuth(LoginPage)
