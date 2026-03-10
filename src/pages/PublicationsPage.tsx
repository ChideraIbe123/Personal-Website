import { motion } from 'motion/react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import { publications } from '../data/publications';
import styles from './PublicationsPage.module.css';

export default function PublicationsPage() {
  return (
    <PageTransition>
      <section className={styles.page}>
        <SectionHeading title="Publications" />
        <div className={styles.list}>
          {publications.map((pub, i) => (
            <motion.article
              key={pub.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.cardInner}>
                {pub.thumbnail && (
                  <a href={pub.pdfUrl || (pub.arxivId ? `https://arxiv.org/abs/${pub.arxivId}` : '#')} target="_blank" rel="noopener noreferrer" className={styles.thumbnailLink}>
                    <img src={pub.thumbnail} alt={pub.title} className={styles.thumbnail} />
                  </a>
                )}
                <div className={styles.cardText}>
                  <h3 className={styles.title}>{pub.title}</h3>
                  <p className={styles.authors}>{pub.authors.join(', ')}</p>
                  <p className={styles.venue}>
                    {pub.venue} &middot; {pub.year}
                  </p>
                  <p className={styles.abstract}>{pub.abstract}</p>
                  <div className={styles.links}>
                    {pub.arxivId && (
                      <a
                        href={`https://arxiv.org/abs/${pub.arxivId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        arXiv &rarr;
                      </a>
                    )}
                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        PDF &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
