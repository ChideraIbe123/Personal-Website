import { useState } from 'react';
import styles from './ProfilePhotoSlider.module.css';

interface ProfilePhotoSliderProps {
  size?: number;
}

export default function ProfilePhotoSlider({ size = 170 }: ProfilePhotoSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className={styles.wrapper} style={{ '--photo-size': `${size}px`, '--pos': `${position}%` } as React.CSSProperties}>
      <div className={styles.ringOuter}>
        <div className={styles.ringGlow} />
        <div className={styles.photoContainer}>
          <img
            src="/images/studio_gibli_headshot.png"
            alt="Chidera Ibe — Ghibli"
            className={styles.photo}
            draggable={false}
          />
          <img
            src="/images/profile.jpg"
            alt="Chidera Ibe"
            className={`${styles.photo} ${styles.photoTop}`}
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            draggable={false}
          />
        </div>
      </div>

      <div className={styles.sliderWrap}>
        <span className={styles.sliderLabel}>Ghibli</span>
        <div className={styles.sliderTrack}>
          <div className={styles.trackFill} />
          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className={styles.slider}
            aria-label="Photo comparison slider"
          />
        </div>
        <span className={styles.sliderLabel}>Real</span>
      </div>
    </div>
  );
}
