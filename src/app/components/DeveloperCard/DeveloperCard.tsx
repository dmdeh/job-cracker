import { Developer } from '@/app/constants/developer';
import Link from 'next/link';
import styles from './DeveloperCard.module.css';

interface DeveloperCardProps {
  developer: Developer;
}

export function DeveloperCard({
  developer: { type, description, topics },
}: DeveloperCardProps) {
  return (
    <Link href={`/selection/topics?developer=${type}`} className={styles.card}>
      <div>
        <div className={styles.header}>
          <h2 className={styles.title}>{type}</h2>
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
