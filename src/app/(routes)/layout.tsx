import styles from '@/styles/layout.module.css';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.page}>
      <main className={styles.list}>{children}</main>
    </div>
  );
}
