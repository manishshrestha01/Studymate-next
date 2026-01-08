import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundContainer}>
        {/* 404 Error Code */}
        <div className={styles.notFoundCode}>404</div>

        {/* Error Text */}
        <h1 className={styles.notFoundTitle}>Page Not Found</h1>
        <p className={styles.notFoundDescription}>
          Uh oh, we can&apos;t seem to find the page you&apos;re looking for. Try going back to the previous page or to our Home page for more information.
        </p>

        {/* Back to Home Button */}
        <Link href="/" className={styles.notFoundButton}>
          <span>BACK TO HOME</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  )
}
