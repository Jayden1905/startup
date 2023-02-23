'use client'

import { auth } from '@/utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home() {
  const [user] = useAuthState(auth)
  return (
    <>
      {user ? (
        <div>
          <h1>{auth.currentUser?.displayName}</h1>
          <img
            src={user.photoURL!}
            alt='use photo'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <div>
          <h1>Hello join</h1>
        </div>
      )}
    </>
  )
}
