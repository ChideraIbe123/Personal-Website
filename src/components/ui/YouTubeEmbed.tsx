import { useRef, useState, useEffect } from 'react';
import styles from './YouTubeEmbed.module.css';

interface YouTubeEmbedProps {
  videoId: string;
}

export default function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setHasBeenVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleImgError = () => {
    setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
  };

  // Once it's been visible, keep the iframe mounted (just pause via URL)
  // This prevents the flash of re-loading the iframe on re-scroll
  const showIframe = hasBeenVisible;

  return (
    <div ref={ref} className={styles.wrapper}>
      {showIframe ? (
        <iframe
          className={styles.iframe}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${visible ? 1 : 0}&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&enablejsapi=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Project demo video"
        />
      ) : (
        <>
          <img
            src={imgSrc}
            alt="Video thumbnail"
            className={styles.thumbnail}
            loading="lazy"
            onError={handleImgError}
          />
          <div className={styles.playBtn} />
        </>
      )}
    </div>
  );
}
