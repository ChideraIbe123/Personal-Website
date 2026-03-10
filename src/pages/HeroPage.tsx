import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import WorldScene from '../components/three/WorldScene';
import ContentPanel from '../components/ui/ContentPanel';
import styles from './HeroPage.module.css';

export default function HeroPage() {
  const [entered, setEntered] = useState(false);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const teleportRef = useRef<string | null>(null);

  return (
    <section className={styles.hero}>
      <AnimatePresence mode="wait">
        {!entered ? (
          /* ── Landing overlay on top of orb background ── */
          <motion.div
            key="landing"
            className={styles.landing}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className={styles.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Chidera Ibe
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              CS @ UIUC &middot; Prev ML Infra Meta
            </motion.p>
            <motion.button
              className={styles.enterBtn}
              onClick={() => setEntered(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Enter World
            </motion.button>
          </motion.div>
        ) : (
          /* ── 3D World ── */
          <motion.div
            key="world"
            className={styles.worldView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <WorldScene onZoneChange={setActiveZone} teleportRef={teleportRef} />
            <ContentPanel zone={activeZone} />

            <motion.button
              className={styles.backBtn}
              onClick={() => { setEntered(false); setActiveZone(null); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              &larr; Back
            </motion.button>

            {activeZone && (
              <motion.div
                className={styles.zoneIndicator}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {activeZone.charAt(0).toUpperCase() + activeZone.slice(1)}
              </motion.div>
            )}

            <motion.div
              className={styles.hint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className={styles.hintKeys}>
                <span className={styles.key}>W</span>
              </div>
              <div className={styles.hintKeys}>
                <span className={styles.key}>A</span>
                <span className={styles.key}>S</span>
                <span className={styles.key}>D</span>
              </div>
              <span className={styles.hintText}>move to explore</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
