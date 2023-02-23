'use client'
import { auth } from '@/utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import withAuth from '../auth/withAuth'

const UserDisplay = () => {
  const [user] = useAuthState(auth)

  return (
    <>
      <div>
        <h1>{auth.currentUser?.email}</h1>
        <h1>{auth.currentUser?.displayName}</h1>
        <img src={user?.photoURL!} referrerPolicy="no-referrer" />
      </div>
    </>
  )
}

export default withAuth(UserDisplay)
