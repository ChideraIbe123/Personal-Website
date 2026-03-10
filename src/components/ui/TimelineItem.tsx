import { motion } from 'motion/react';
import type { Experience } from '../../types';
import styles from './TimelineItem.module.css';

interface TimelineItemProps {
  item: Experience;
  index: number;
}

export default function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <motion.div
      className={styles.item}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className={styles.row}>
        {item.logo && (
          <img
            src={item.logo}
            alt={`${item.company} logo`}
            className={styles.logo}
          />
        )}
        <div className={styles.info}>
          <div className={styles.topLine}>
            <span className={styles.company}>{item.company}</span>
            <span className={styles.dates}>
              {item.startDate} — {item.endDate}
            </span>
          </div>
          <div className={styles.role}>{item.role}{item.location ? ` · ${item.location}` : ''}</div>
          {item.type === 'education' && item.highlights && item.highlights.length > 0 && (
            <div className={styles.coursework}>
              <span className={styles.courseworkLabel}>Relevant Coursework</span>
              <ul className={styles.bullets}>
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}
          {item.type !== 'education' && item.highlights && item.highlights.length > 0 && (
            <ul className={styles.bullets}>
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
