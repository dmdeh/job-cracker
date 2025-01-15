import clsx from 'clsx';
import { ReactNode } from 'react';
import layoutStyles from './Page.module.css';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Page = ({ children }: Props) => {
  return <div className={layoutStyles.page}>{children}</div>;
};

Page.Top = ({ children }: Props) => (
  <div className={layoutStyles.top}>{children}</div>
);

Page.Main = ({ children, className }: Props) => (
  <main className={clsx(layoutStyles.main, className)}>{children}</main>
);

Page.Bottom = ({ children, className }: Props) => (
  <div className={clsx(layoutStyles.bottom, className)}>{children}</div>
);
