'use client'
import { auth } from '@/utils/firebase'
import 'firebase/auth'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loader from '../Loader'

type Props = {
  Component?: NextPage
}

const withoutAuth = (WrappedComponent: NextPage) => {
  const Wrapper = ({ Component, ...props }: Props) => {
    const router = useRouter()

    const [authStatus, setAuthStatus] = useState<
      'loading' | 'authenticated' | 'unauthenticated'
    >('loading')

    const [user] = useAuthState(auth)

    useEffect(() => {
      if (user) {
        setAuthStatus('authenticated')
        router.push('/')
      } else {
        setAuthStatus('unauthenticated')
      }
    }, [])

    if (authStatus === 'loading') {
      return <Loader />
    }

    if (authStatus === 'unauthenticated') {
      return <WrappedComponent {...props} />
    }

    return null
  }

  return Wrapper
}

export default withoutAuth
