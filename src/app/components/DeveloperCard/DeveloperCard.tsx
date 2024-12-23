import styles from "./DeveloperCard.module.css";

interface DeveloperCardProps {
  title: string;
  description: string;
  technologies: string[];
}

export function DeveloperCard({
  title,
  description,
  technologies,
}: DeveloperCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.tagContainer}>
        {technologies.map((tech) => (
          <span key={tech} className={styles.tag}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
