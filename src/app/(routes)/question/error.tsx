'use client';

import { Page } from '@/components/common/Page/Page';
import styles from '@/styles/not-found.module.css';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Page>
      <div className={styles.card}>
        <div className={styles.content}>
          <h2 className={styles.title}>문제가 생겼어요!</h2>
          <p className={styles.description}>다시 시도해주세요. 😢</p>
          <button className={styles.button} onClick={() => reset()}>
            다시 시도하기
          </button>
        </div>
      </div>
    </Page>
  );
}
