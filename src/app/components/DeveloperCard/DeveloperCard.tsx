import styles from "./DeveloperCard.module.css";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleCardClick = (title: string) => {
    const topic = title.split(" ")[0];
    router.push(`/selection/topics?topic=${topic}`);
  };

  return (
    <div className={styles.card} onClick={() => handleCardClick(title)}>
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
