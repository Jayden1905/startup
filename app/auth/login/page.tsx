'use client'
import withoutAuth from '@/components/auth/withoutAuth'
import LoginForm from '@/components/LoginForm/LoginForm'
import { auth } from '@/utils/firebase'
import { onSubmitAtom, onSubmitSuccessAtom } from '@/utils/store'
import { useToast } from '@chakra-ui/react'
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'

const LoginPage = () => {
  const router = useRouter()

  const toast = useToast()

  const [, setOnSubmit] = useAtom(onSubmitAtom)
  const [, setSubmitsuccess] = useAtom(onSubmitSuccessAtom)

  const fetchSignInMethods = useMemo(() => fetchSignInMethodsForEmail, [])

  const handleSubmit = useCallback(
    async (email: string, password: string) => {
      setOnSubmit(true)

      const users = await fetchSignInMethods(auth, email)
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
          setSubmitsuccess(true)
          await signInWithEmailAndPassword(auth, email, password)
          router.push('/')
        } catch (error: any) {
          setSubmitsuccess(false)
          if (error.code === 'auth/wrong-password') {
            toast({
              position: 'top',
              title: 'Wrong password. Please try again.',
              status: 'error',
              isClosable: true,
              duration: 3000,
            })
          }
        }
      }
      setOnSubmit(false)
    },
    [auth, router]
  )

  useEffect(() => {
    setSubmitsuccess(false)
  }, [])

  return (
    <>
      <LoginForm submitForm={handleSubmit} />
    </>
  )
}

export default withoutAuth(LoginPage)
