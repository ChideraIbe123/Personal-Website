import { motion } from 'motion/react';
import PageTransition from '../components/ui/PageTransition';
import BookingCalendar from '../components/ui/BookingCalendar';
import ProfilePhotoSlider from '../components/ui/ProfilePhotoSlider';
import { socials } from '../data/socials';
import styles from './AboutPage.module.css';

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
};

const socialVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <section className={styles.page}>
        <div className={styles.layout}>
          {/* Left: photo, name, tagline, socials */}
          <motion.div
            className={styles.leftCol}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <ProfilePhotoSlider size={190} />
            </motion.div>

            <motion.div variants={itemVariants} className={styles.nameBlock}>
              <h2 className={styles.profileName}>Chidera Ibe</h2>
              <motion.div
                className={styles.nameUnderline}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.6, ease }}
              />
            </motion.div>

            <motion.div
              className={styles.socialList}
              variants={containerVariants}
            >
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialRow}
                  variants={socialVariants}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  <span className={styles.socialIconWrap}>
                    <SocialIcon icon={s.icon} />
                  </span>
                  <span className={styles.socialName}>{s.name}</span>
                  <span className={styles.socialHandle}>
                    {s.icon === 'github' && 'ChideraIbe123'}
                    {s.icon === 'linkedin' && 'Chidera Ibe'}
                    {s.icon === 'x' && '@ChideraIbe11'}
                    {s.icon === 'mail' && 'Say Hello'}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: calendar */}
          <motion.div
            className={styles.calendarSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
          >
            <h3 className={styles.sectionTitle}>Schedule a Call</h3>
            <BookingCalendar />
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
