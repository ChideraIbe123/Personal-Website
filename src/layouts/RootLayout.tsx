import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import styles from './RootLayout.module.css';

const LiquidCanvas = lazy(() => import('../components/three/LiquidCanvas'));

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={styles.layout}>
      <Suspense fallback={null}>
        <LiquidCanvas />
      </Suspense>
      <Navbar />
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}
