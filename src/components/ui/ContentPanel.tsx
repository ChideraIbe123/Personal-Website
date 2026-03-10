import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { projects } from '../../data/projects';
import { publications } from '../../data/publications';
import { workExperience, education } from '../../data/experience';
import { socials } from '../../data/socials';
import ProfilePhotoSlider from './ProfilePhotoSlider';
import styles from './ContentPanel.module.css';

interface ContentPanelProps {
  zone: string | null;
}

function ProjectsContent() {
  return (
    <>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarLabel}>Contributions</div>
        <GitHubCalendar
          username="ChideraIbe123"
          colorScheme="dark"
          year={2025}
          blockSize={9}
          blockMargin={3}
          fontSize={11}
        />
      </div>
      {projects.map((p) => (
        <div key={p.id} className={styles.projectCard}>
          <div className={styles.projectTitle}>{p.title}</div>
          <p className={styles.projectDesc}>{p.description}</p>
          <div className={styles.tags}>
            {p.tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              GitHub &rarr;
            </a>
          )}
        </div>
      ))}
    </>
  );
}

function ExperienceContent() {
  return (
    <>
      <h2 className={styles.title}>Experience</h2>
      <div className={styles.sectionLabel}>Work</div>
      {workExperience.map((e) => (
        <div key={e.id} className={styles.expItem}>
          <div className={styles.expRow}>
            {e.logo && <img src={e.logo} alt={`${e.company} logo`} className={styles.companyLogo} />}
            <div className={styles.expInfo}>
              <div className={styles.expTopLine}>
                <span className={styles.company}>{e.company}</span>
                <span className={styles.dates}>{e.startDate} — {e.endDate}</span>
              </div>
              <div className={styles.role}>{e.role}{e.location ? ` · ${e.location}` : ''}</div>
              {e.highlights && e.highlights.length > 0 && (
                <ul className={styles.expBullets}>
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className={styles.sectionLabel}>Education</div>
      {education.map((e) => (
        <div key={e.id} className={styles.expItem}>
          <div className={styles.expRow}>
            {e.logo && <img src={e.logo} alt={`${e.company} logo`} className={styles.companyLogo} />}
            <div className={styles.expInfo}>
              <div className={styles.expTopLine}>
                <span className={styles.company}>{e.company}</span>
                <span className={styles.dates}>{e.startDate} — {e.endDate}</span>
              </div>
              <div className={styles.role}>{e.role}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function PublicationsContent() {
  return (
    <>
      <h2 className={styles.title}>Publications</h2>
      {publications.map((p) => (
        <div key={p.id} className={styles.pubCard}>
          <div className={styles.pubCardInner}>
            {p.thumbnail && (
              <a href={p.pdfUrl || (p.arxivId ? `https://arxiv.org/abs/${p.arxivId}` : '#')} target="_blank" rel="noopener noreferrer" className={styles.pubThumbnailLink}>
                <img src={p.thumbnail} alt={p.title} className={styles.pubThumbnail} />
              </a>
            )}
            <div className={styles.pubCardText}>
              <div className={styles.pubTitle}>{p.title}</div>
              <div className={styles.pubAuthors}>{p.authors.join(', ')}</div>
              <div className={styles.dates}>{p.venue} · {p.year}</div>
            </div>
          </div>
          <p className={styles.pubAbstract}>{p.abstract}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {p.arxivId && (
              <a href={`https://arxiv.org/abs/${p.arxivId}`} target="_blank" rel="noopener noreferrer" className={styles.link}>
                arXiv &rarr;
              </a>
            )}
            {p.pdfUrl && (
              <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                PDF &rarr;
              </a>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
}

function AboutContent() {
  return (
    <>
      <h2 className={styles.title}>Contact</h2>
      <div className={styles.contactCard}>
        <ProfilePhotoSlider size={96} />
        <div className={styles.profileName}>Chidera Ibe</div>
        <div className={styles.profileTagline}>CS @ UIUC · ML &amp; Systems</div>
      </div>
      <div className={styles.socialGrid}>
        {socials.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
            <SocialIcon icon={s.icon} />
            <span>{s.name}</span>
          </a>
        ))}
      </div>
      <div className={styles.sectionLabel}>Schedule</div>
      <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className={styles.bookBtn}>
        Book a Call &rarr;
      </a>
    </>
  );
}

const zoneContent: Record<string, () => React.JSX.Element> = {
  projects: ProjectsContent,
  experience: ExperienceContent,
  publications: PublicationsContent,
  about: AboutContent,
};

export default function ContentPanel({ zone }: ContentPanelProps) {
  const Content = zone ? zoneContent[zone] : null;

  return (
    <div
      data-ui
      className={`${styles.panel} ${zone ? styles.panelOpen : ''}`}
    >
      {Content && <Content />}
    </div>
  );
}
