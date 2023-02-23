'use client'
import { auth } from '@/utils/firebase'
import withAuth from '../auth/withAuth'

const UserDisplay = () => {
  return (
    <>
      <div>
        <h1>{auth.currentUser?.email}</h1>
        <h1>{auth.currentUser?.displayName}</h1>
        <img src={auth.currentUser?.photoURL!} referrerPolicy="no-referrer" />
      </div>
    </>
  )
}

export default withAuth(UserDisplay)
