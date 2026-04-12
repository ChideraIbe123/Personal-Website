import { useMemo } from 'react';
import { motion } from 'motion/react';
import type { Project } from '../../types';
import YouTubeEmbed from './YouTubeEmbed';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function getGitHubOgImage(githubUrl: string): string | null {
  const match = githubUrl.match(/github\.com\/([^/]+\/[^/]+)/);
  if (!match) return null;
  return `https://opengraph.githubassets.com/main/${match[1]}`;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ogImage = useMemo(() => {
    if (project.youtubeId) return null;
    if (project.previewImage) return project.previewImage;
    if (project.githubUrl) return getGitHubOgImage(project.githubUrl);
    return null;
  }, [project.youtubeId, project.previewImage, project.githubUrl]);

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {project.youtubeId && <YouTubeEmbed videoId={project.youtubeId} />}
      {ogImage && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.previewLink}
        >
          <img
            src={ogImage}
            alt={`${project.title} repository`}
            className={styles.preview}
          />
        </a>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.links}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
            >
              GitHub &rarr;
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
            >
              Live Demo &rarr;
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
