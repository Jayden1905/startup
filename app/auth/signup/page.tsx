'use client'
import withoutAuth from '@/components/auth/withoutAuth'
import SignupForm from '@/components/LoginForm/SignupForm'
import { auth } from '@/utils/firebase'
import {
  formValidationAtom,
  loginAtom,
  onSubmitAtom,
  onSubmitSuccessAtom,
} from '@/utils/store'
import { useToast } from '@chakra-ui/react'
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from 'firebase/auth'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SignupPage = () => {
  const router = useRouter()

  const toast = useToast()

  const [login, setLogin] = useAtom(loginAtom)
  const [_onSubmit, setOnSubmit] = useAtom(onSubmitAtom)
  const [_onSubmitSuccess, setSubmitScueess] = useAtom(onSubmitSuccessAtom)
  const [formValidation, setFormValidation] = useAtom(formValidationAtom)

  const handleSubmit = async (email: string, password: string) => {
    setOnSubmit(true)
    if (
      login.email === '' ||
      !login.email.includes('@') ||
      login.password === '' ||
      login.username === ''
    ) {
      setFormValidation({
        ...formValidation,
        email: true,
        password: true,
        usernmae: true,
      })
      setOnSubmit(false)
    } else {
      const users = await fetchSignInMethodsForEmail(auth, email)

      if (users.length === 0) {
        try {
          setSubmitScueess(true)
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          )

          setOnSubmit(false)
          await updateProfile(result.user, {
            displayName: login.username,
          })

          setLogin({ username: '', email: '', password: '' })
          router.push('/')
        } catch (error) {
          console.log(error)
        }
      } else {
        setSubmitScueess(false)
        setOnSubmit(false)
        toast({
          position: 'top',
          title: 'User already exist. Please sign in with your account.',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
        setLogin({ username: '', email: '', password: '' })
      }
    }
  }

  useEffect(() => {
    setSubmitScueess(false)
  }, [])

  return (
    <>
      <SignupForm handleSubmit={handleSubmit} />
    </>
  )
}

export default withoutAuth(SignupPage)
