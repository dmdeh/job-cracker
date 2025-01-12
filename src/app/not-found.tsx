import layoutStyles from '@/app/styles/layout.module.css';
import styles from '@/app/styles/not-found.module.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={layoutStyles.page}>
      <div className={styles.card}>
        <div className={styles.content}>
          <h1 className={styles.title}>Not Found</h1>
          <p className={styles.description}>페이지를 찾을 수 없습니다. 🤔</p>
          <Link href="/" className={styles.button}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
