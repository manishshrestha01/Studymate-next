'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useUserProfile } from '@/hooks/useUserProfile'
import { BackgroundProvider } from '@/context/BackgroundContext'
import Desktop from '@/components/Desktop/Desktop'
import styles from './page.module.css'

export default function Dashboard() {
  const { isAuthenticated, loading } = useAuth()
  const { isSetupComplete, loading: profileLoading, profileInitialized } = useUserProfile()
  const router = useRouter()

  useEffect(() => {
    // Wait for both auth and profile to load
    if (loading || profileLoading || !profileInitialized) return

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // If authenticated but profile not complete, redirect to user-info
    if (isAuthenticated && !isSetupComplete) {
      console.log('Profile not complete, redirecting to user-info')
      router.push('/user-info')
    }
  }, [isAuthenticated, loading, isSetupComplete, profileLoading, profileInitialized, router])

  // Show loading while checking auth and profile
  if (loading || profileLoading || !profileInitialized) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated or profile not complete
  if (!isAuthenticated || !isSetupComplete) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    )
  }

  return (
    <BackgroundProvider>
      <Desktop />
    </BackgroundProvider>
  )
}
