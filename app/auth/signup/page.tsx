'use client'
import withoutAuth from '@/components/auth/withoutAuth'
import SignupForm from '@/components/LoginForm/SignupForm'
import { auth } from '@/utils/firebase'
import { loginAtom, onSubmitAtom, onSubmitSuccessAtom } from '@/utils/store'
import { useToast } from '@chakra-ui/react'
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from 'firebase/auth'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const SignupPage = () => {
  const [login, setLogin] = useAtom(loginAtom)
  const [displayName, setDisplayName] = useState('')

  const router = useRouter()

  const toast = useToast()

  const [emailValidation, setEmailValidation] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState(false)
  const [displayNameValidation, setDisplayNameValidation] = useState(false)

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
      login.password === '' ||
      displayName === ''
    ) {
      setEmailValidation(true)
      setPasswordValidation(true)
      setDisplayNameValidation(true)
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
            displayName: displayName,
          })

          setLogin({ email: '', password: '' })
          setDisplayName('')
          router.replace('/')
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
        setLogin({ email: '', password: '' })
        setDisplayName('')
      }
    }
  }

  useEffect(() => {
    setSubmitScueess(false)
  }, [])

  return (
    <>
      <SignupForm
        pageDescription={pageDescription}
        title="Create new account"
        forwardTo="Sing in"
        forwardToPath="/auth/login"
        emailValidation={emailValidation}
        setEmailValidation={setEmailValidation}
        passwordValidation={passwordValidation}
        setPasswordValidation={setPasswordValidation}
        handleSubmit={handleSubmit}
        displayName={displayName}
        setDisplayName={setDisplayName}
        displayNameValidation={displayNameValidation}
        setDisplayNameValidation={setDisplayNameValidation}
      />
    </>
  )
}

export default withoutAuth(SignupPage)
