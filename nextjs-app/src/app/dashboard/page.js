'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { BackgroundProvider } from '@/context/BackgroundContext'
import Desktop from '@/components/Desktop/Desktop'
import styles from './page.module.css'

export default function Dashboard() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
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
