import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import styles from './HeroPage.module.css';

const links = [
  { path: '/projects', label: 'Projects' },
  { path: '/publications', label: 'Publications' },
  { path: '/experience', label: 'Experience' },
  { path: '/about', label: 'Contact' },
];

export default function HeroPage() {
  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Chidera Ibe
      </motion.h1>
      <nav className={styles.nav}>
        {links.map((l, i) => (
          <motion.div
            key={l.path}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
          >
            <Link to={l.path} className={styles.navLink}>
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={styles.navLinkInner}
              >
                {l.label}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </nav>
    </section>
  );
}
