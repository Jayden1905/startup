'use client'
import withoutAuth from '@/components/auth/withoutAuth'
import SignupForm from '@/components/LoginForm/SignupForm'
import { auth } from '@/utils/firebase'
import { onSubmitAtom, onSubmitSuccessAtom } from '@/utils/store'
import { useToast } from '@chakra-ui/react'
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from 'firebase/auth'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'

const SignupPage = () => {
  const router = useRouter()

  const toast = useToast()

  const [_onSubmit, setOnSubmit] = useAtom(onSubmitAtom)
  const [_onSubmitSuccess, setSubmitScueess] = useAtom(onSubmitSuccessAtom)

  const fetchSignInMethods = useMemo(() => fetchSignInMethodsForEmail, [])

  const handleSubmit = useCallback(
    async (username: string, email: string, password: string) => {
      setOnSubmit(true)

      const users = await fetchSignInMethods(auth, email)

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
            displayName: username,
          })

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
      }
    },
    [auth, router]
  )

  useEffect(() => {
    setSubmitScueess(false)
  }, [])

  return (
    <>
      <SignupForm submitForm={handleSubmit} />
    </>
  )
}

export default withoutAuth(SignupPage)
