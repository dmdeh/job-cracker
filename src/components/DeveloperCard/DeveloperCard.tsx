import { DeveloperDetail } from '@/types/developerType';
import Link from 'next/link';
import styles from './DeveloperCard.module.css';

interface DeveloperCardProps {
  developer: DeveloperDetail;
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
        <div className={styles.tag_container}>
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
