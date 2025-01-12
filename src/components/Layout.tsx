import styles from '@/styles/layout.module.css';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface LayoutProps {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function Layout({
  header,
  children,
  footer,
  className,
}: LayoutProps) {
  return (
    <div className={styles.page}>
      {header && <header className={styles.header}>{header}</header>}
      <main className={clsx(styles.list, className)}>{children}</main>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
}
