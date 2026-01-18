// Node Modules
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const AuthSyncPage = () => {
  const navigate = useNavigate()
  const { userId, isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      if (localStorage.getItem('clerkUserId')) {
        localStorage.removeItem('clerkUserId')
      }

      navigate('/')
      return
    }

    if (isSignedIn) {
      localStorage.setItem('clerkUserId', userId)

      navigate('/app/today')
    }
  }, [userId, isSignedIn, isLoaded, navigate])

  return <></>
}
