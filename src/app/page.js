'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import styles from './page.module.css'

export default function Landing() {
  const { isAuthenticated, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: '📚',
      title: 'Comprehensive Notes',
      description: 'Access complete study materials for all semesters of Computer Engineering at Pokhara University.'
    },
    {
      icon: '🎯',
      title: 'Organized by Subject',
      description: 'Find exactly what you need with our intuitive folder structure organized by semester and subject.'
    },
    {
      icon: '📱',
      title: 'Access Anywhere',
      description: 'Study on any device - desktop, tablet, or mobile. Your notes are always within reach.'
    },
    {
      icon: '✏️',
      title: 'Personal Notes',
      description: 'Create and save your own notes while studying. Keep track of important concepts.'
    }
  ]

  const stats = [
    { value: '8', label: 'Semesters Covered' },
    { value: '50+', label: 'Subjects Available' },
    { value: '500+', label: 'Study Materials' },
    { value: '24 / 7', label: 'Access Available' }
  ]

  const testimonials = [
    {
      quote: "This platform has been a lifesaver during my exam preparations. Everything is so well organized!",
      author: "Aarav Sharma",
      role: "4th Semester, Computer Engineering"
    },
    {
      quote: "Finally, a place where I can find all PU Computer Engineering notes. The interface is beautiful and easy to use.",
      author: "Priya Thapa",
      role: "6th Semester, Computer Engineering"
    },
    {
      quote: "The personal notes feature helps me jot down important points while studying. Highly recommended!",
      author: "Rohan KC",
      role: "2nd Semester, Computer Engineering"
    }
  ]

  if (loading) {
    return null
  }

  return (
    <div className={styles.landing}>
      {/* Navigation */}
      <nav className={styles.landingNav}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navLogo}>
            <Image src="/black.svg" alt="StudyMate Logo" width={32} height={32} />
            <span className={styles.logoText}>StudyMate</span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#testimonials">Reviews</a>
            <Link href="/login" className={styles.navLogin}>Login</Link>
            <Link href="/dashboard" className={styles.navCta}>Open Dashboard</Link>
          </div>
          <button className={styles.mobileMenuBtn} aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className={styles.mobileNavOverlay} onClick={() => setMobileMenuOpen(false)}>
            <div className={styles.mobileNav} onClick={e => e.stopPropagation()}>
              <button className={styles.mobileNavClose} onClick={() => setMobileMenuOpen(false)}>&times;</button>
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
              <Link href="/login" className={styles.navLogin} onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link href="/dashboard" className={styles.navCta} onClick={() => setMobileMenuOpen(false)}>Open Dashboard</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroBadge}>
            <span>🎓</span> Pokhara University • Computer Engineering
          </div>
          <h1 className={styles.heroTitle}>
            Your Complete Study
            <br />
            <span className={styles.heroHighlight}>Resource Hub</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Access comprehensive notes, study materials, and resources for all 8 semesters 
            of Computer Engineering. Organized, accessible, and always free.
          </p>
          <div className={styles.heroCta}>
            <Link href="/dashboard" className={styles.btnPrimary}>
              Start Learning
              <span className={styles.btnArrow}>→</span>
            </Link>
            <a href="#features" className={styles.btnSecondary}>
              Learn More
            </a>
          </div>
          <div className={styles.heroVisual}>
            <div className={`${styles.visualCard} ${styles.card1}`}>
              <span className={styles.cardIcon}>📁</span>
              <span className={styles.cardText}>Semester 1-8</span>
            </div>
            <div className={`${styles.visualCard} ${styles.card2}`}>
              <span className={styles.cardIcon}>📝</span>
              <span className={styles.cardText}>Notes & PDFs</span>
            </div>
            <div className={`${styles.visualCard} ${styles.card3}`}>
              <span className={styles.cardIcon}>💡</span>
              <span className={styles.cardText}>Quick Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.featuresContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Features</span>
            <h2 className={styles.sectionTitle}>Everything you need to excel</h2>
            <p className={styles.sectionSubtitle}>
              We&apos;ve built the most comprehensive resource platform for PU Computer Engineering students.
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutContent}>
            <span className={styles.sectionBadge}>About</span>
            <h2 className={styles.sectionTitle}>Built by students, for students</h2>
            <p className={styles.aboutText}>
              We understand the challenges of finding quality study materials. That&apos;s why we created 
              this platform - a centralized hub where PU Computer Engineering students can access 
              all the notes and resources they need.
            </p>
            <p className={styles.aboutText}>
              Our materials are carefully organized by semester and subject, making it easy to find 
              exactly what you&apos;re looking for. Whether you&apos;re preparing for exams or catching up on 
              lectures, we&apos;ve got you covered.
            </p>
            <div className={styles.aboutFeatures}>
              <div className={styles.aboutFeature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Verified study materials</span>
              </div>
              <div className={styles.aboutFeature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Regular updates</span>
              </div>
              <div className={styles.aboutFeature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Community driven</span>
              </div>
            </div>
          </div>
          <div className={styles.aboutVisual}>
            <div className={styles.visualBox}>
              <div className={styles.visualHeader}>
                <span className={`${styles.dot} ${styles.red}`}></span>
                <span className={`${styles.dot} ${styles.yellow}`}></span>
                <span className={`${styles.dot} ${styles.green}`}></span>
              </div>
              <div className={styles.visualContentBox}>
                <div className={styles.visualFolder}>
                  <span>📁</span> Semester 5
                </div>
                <div className={styles.visualSubfolder}>
                  <span>📄</span> Computer Networks.pdf
                </div>
                <div className={styles.visualSubfolder}>
                  <span>📄</span> Database Systems.pdf
                </div>
                <div className={styles.visualSubfolder}>
                  <span>📄</span> Operating Systems.pdf
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={styles.testimonials}>
        <div className={styles.testimonialsContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Testimonials</span>
            <h2 className={styles.sectionTitle}>Trusted by students</h2>
            <p className={styles.sectionSubtitle}>
              See what fellow Computer Engineering students have to say.
            </p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <p className={styles.testimonialQuote}>&quot;{testimonial.quote}&quot;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{testimonial.author}</span>
                    <span className={styles.authorRole}>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to start learning?</h2>
          <p className={styles.ctaSubtitle}>
            Access all study materials for free. No registration required.
          </p>
          <Link href="/dashboard" className={`${styles.btnPrimary} ${styles.btnLarge} ${styles.ctaBtn}`}>
            Open Dashboard
            <span className={styles.btnArrow}>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.navLogo}>
                <Image src="/white.svg" alt="StudyMate Logo" width={32} height={32} />
                <span className={styles.logoTextWhite}>StudyMate</span>
              </Link>
              <p className={styles.footerTagline}>
                Your complete study resource for Pokhara University Computer Engineering.
              </p>
              <div className={styles.footerSocial}>
                <a href="#" className={styles.socialLink} aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Email">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className={styles.footerLinksGrid}>
              <div className={styles.footerColumn}>
                <h4>Quick Links</h4>
                <Link href="/dashboard">Dashboard</Link>
                <a href="#features">Features</a>
                <a href="#about">About</a>
                <a href="#testimonials">Reviews</a>
              </div>
              <div className={styles.footerColumn}>
                <h4>Semesters</h4>
                <Link href="/dashboard">Semester 1-2</Link>
                <Link href="/dashboard">Semester 3-4</Link>
                <Link href="/dashboard">Semester 5-6</Link>
                <Link href="/dashboard">Semester 7-8</Link>
              </div>
              <div className={styles.footerColumn}>
                <h4>Account</h4>
                <Link href="/login">Login</Link>
                <Link href="/login">Continue with Google</Link>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 StudyMate. Built with ❤️ for students.</p>
            <div className={styles.footerBottomLinks}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
