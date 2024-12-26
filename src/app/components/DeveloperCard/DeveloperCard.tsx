import styles from "./DeveloperCard.module.css";
import Link from "next/link";

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
  const [topic] = title.split(" ");

  return (
    <Link href={`/selection/topics?topic=${topic}`} className={styles.card}>
      <div>
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
    </Link>
  );
}
