import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import TimelineItem from '../components/ui/TimelineItem';
import { workExperience, education, awards } from '../data/experience';
import styles from './ExperiencePage.module.css';

export default function ExperiencePage() {
  const edu = education[0];

  return (
    <PageTransition>
      <section className={styles.page}>
        <SectionHeading title="Experience" />
        <div className={styles.columns}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Work</h2>
            {workExperience.map((exp, i) => (
              <TimelineItem key={exp.id} item={exp} index={i} />
            ))}
            <div className={styles.skillsSection}>
              <h3 className={styles.skillsLabel}>Skills</h3>
              <div className={styles.skillsGrid}>
                <div className={styles.skillGroup}>
                  <span className={styles.skillGroupLabel}>Languages</span>
                  <div className={styles.skillsList}>
                    {['Python', 'Java', 'C', 'C++', 'CUDA', 'JavaScript', 'SQL', 'Swift'].map((s) => (
                      <span key={s} className={styles.skill}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.skillGroup}>
                  <span className={styles.skillGroupLabel}>Infrastructure</span>
                  <div className={styles.skillsList}>
                    {['AWS', 'GCP', 'Azure', 'Postgres'].map((s) => (
                      <span key={s} className={styles.skill}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              <div className={styles.eduCard}>
                {edu.logo && (
                  <img src={edu.logo} alt={`${edu.company} logo`} className={styles.eduLogo} />
                )}
                <div className={styles.eduName}>{edu.company}</div>
                <div className={styles.eduRole}>{edu.role}</div>
                <div className={styles.eduDates}>
                  {edu.startDate} — {edu.endDate} · {edu.location}
                </div>
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className={styles.eduCoursework}>
                    <div className={styles.eduCourseworkLabel}>Relevant Coursework</div>
                    <div className={styles.eduCourseList}>
                      {edu.highlights.map((h) => (
                        <span key={h} className={styles.eduCourse}>{h}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Awards</h2>
              <div className={styles.awardsList}>
                {awards.map((award) => (
                  <div key={award.id} className={styles.awardItem}>
                    <div className={styles.awardTitle}>{award.title}</div>
                    <div className={styles.awardMeta}>
                      {award.issuer} · {award.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
