import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ marginBottom: 'var(--space-xl)' }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          letterSpacing: '-1px',
          marginBottom: 'var(--space-sm)',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.1rem',
            maxWidth: '600px',
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
