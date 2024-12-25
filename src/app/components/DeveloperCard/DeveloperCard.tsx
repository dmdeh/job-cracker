import styles from "./DeveloperCard.module.css";

interface DeveloperCardProps {
  title: string;
  description: string;
  topics: string[];
}

export function DeveloperCard({
  title,
  description,
  topics,
}: DeveloperCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.tagContainer}>
        {topics.map((topic) => (
          <span key={topic} className={styles.tag}>
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
