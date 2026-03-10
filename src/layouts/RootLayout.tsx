import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import ParticleField from '../components/three/ParticleField';
import styles from './RootLayout.module.css';

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={styles.layout}>
      {/* Orb background on every page */}
      <div className={styles.orbBg}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          style={{ background: '#000000' }}
        >
          <color attach="background" args={['#000000']} />
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </div>

      <Navbar />
      <main className={`${styles.main}${isHome ? '' : ` ${styles.mainOverlay}`}`}>
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}
