import { GitHubCalendar } from 'react-github-calendar';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';
import styles from './ProjectsPage.module.css';

export default function ProjectsPage() {
  return (
    <PageTransition>
      <section className={styles.page}>
        <SectionHeading title="Projects" />

        <div className={styles.calendarSection}>
          <h3 className={styles.calendarTitle}>Contributions</h3>
          <div className={styles.calendarWrapper}>
            <GitHubCalendar
              username="ChideraIbe123"
              colorScheme="dark"
              year={2025}
              blockSize={14}
              blockMargin={4}
              fontSize={13}
            />
          </div>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
