'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import styles from './page.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { signInWithEmail, signInWithGoogle, isAuthenticated, isSupabaseConfigured } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: '', text: '' })

    if (!isSupabaseConfigured) {
      // Demo mode - just redirect
      setTimeout(() => {
        setIsLoading(false)
        router.push('/dashboard')
      }, 1000)
      return
    }

    try {
      await signInWithEmail(email)
      setMessage({ 
        type: 'success', 
        text: 'Check your email for a magic link to sign in!' 
      })
      setEmail('')
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.message || 'Failed to send magic link. Please try again.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    if (!isSupabaseConfigured) {
      router.push('/dashboard')
      return
    }

    try {
      setMessage({ type: '', text: '' })
      await signInWithGoogle()
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.message || 'Failed to sign in with Google. Please try again.' 
      })
    }
  }

  return (
    <div className={styles.authPage}>
      {/* Navigation */}
      <nav className={styles.authNav}>
        <div className={styles.authNavContainer}>
          <Link href="/" className={styles.authNavLogo}>
            <Image src="/black.svg" alt="StudyMate Logo" width={32} height={32} />
            <span className={styles.authLogoText}>StudyMate</span>
          </Link>
          <div className={`${styles.authNavLinks} ${mobileMenuOpen ? styles.active : ''}`}>
            <a href="/#features">Features</a>
            <a href="/#about">About</a>
            <a href="/#testimonials">Reviews</a>
            <Link href="/login" className={styles.authNavLogin}>Login</Link>
            <Link href="/dashboard" className={styles.authNavCta}>Open Dashboard</Link>
          </div>
          <button 
            className={`${styles.authMobileMenuBtn} ${mobileMenuOpen ? styles.active : ''}`} 
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Login Content */}
      <div className={styles.authContent}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Login / Sign Up</h1>

          {!isSupabaseConfigured && (
            <div className={`${styles.authMessage} ${styles.authMessageInfo}`}>
              Demo mode: Supabase not configured. You can still explore the dashboard.
            </div>
          )}

          {message.text && (
            <div className={`${styles.authMessage} ${styles[`authMessage${message.type.charAt(0).toUpperCase() + message.type.slice(1)}`]}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <label htmlFor="email" className={styles.authLabel}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.authInput}
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.authBtnPrimary} disabled={isLoading}>
              {isLoading ? 'Please wait...' : 'Continue with Email'}
            </button>
          </form>

          <div className={styles.authDivider}>
            <span>OR</span>
          </div>

          <button className={styles.authBtnGoogle} onClick={handleGoogleLogin}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
