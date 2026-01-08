'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function UserInfoPage() {
  const { profile, updateProfile, loading } = useUserProfile();
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    semester: '',
    faculty: 'Computer Engineering',
    university: 'Pokhara University',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        semester: profile.semester || '',
        faculty: profile.faculty || 'Computer Engineering',
        university: profile.university || 'Pokhara University',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.semester) {
      setError('Please fill all required fields.');
      return;
    }
    
    try {
      await updateProfile({ ...formData, setupComplete: true });
      console.log('Profile updated successfully, navigating to dashboard...');
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error('Profile update error:', err);
    }
  };

  return (
    <div className={styles.authPage}>
      {/* Navigation */}
      <nav className={styles.authNav}>
        <div className={styles.authNavContainer}>
          <Link href="/" className={styles.authNavLogo}>
            <img src="/black.svg" alt="StudyMate Logo" style={{ height: 32 }} />
            <span className={styles.authLogoText}>StudyMate</span>
          </Link>
        </div>
      </nav>
      
      <div className={styles.authContent}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Complete Your Profile</h1>
          {error && <div className={styles.userInfoError}>{error}</div>}
          <form className={styles.authForm} onSubmit={handleSubmit}>
            <label htmlFor="full_name" className={styles.authLabel}>Full Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              className={styles.authInput}
              placeholder="Enter your name"
              value={formData.full_name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
            
            <label htmlFor="semester" className={styles.authLabel}>Current Semester</label>
            <select
              id="semester"
              name="semester"
              className={styles.authInput}
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="">Select Semester</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
              <option value="7th Semester">7th Semester</option>
              <option value="8th Semester">8th Semester</option>
            </select>
            
            <label htmlFor="faculty" className={styles.authLabel}>Faculty</label>
            <input
              type="text"
              id="faculty"
              name="faculty"
              className={styles.authInput}
              value={formData.faculty}
              disabled
              style={{ cursor: 'not-allowed' }}
            />
            
            <label htmlFor="university" className={styles.authLabel}>University</label>
            <input
              type="text"
              id="university"
              name="university"
              className={styles.authInput}
              value={formData.university}
              disabled
              style={{ cursor: 'not-allowed' }}
            />
            
            <button 
              type="submit" 
              className={styles.authBtnPrimary} 
              disabled={loading} 
              style={{ marginTop: 18 }}
            >
              {loading ? 'Saving...' : 'Save & Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
