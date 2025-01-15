import layoutStyles from '@/styles/layout.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Page = ({ children }: Props) => {
  return <div className={layoutStyles.page}>{children}</div>;
};

Page.Top = ({ children }: Props) => (
  <div className={layoutStyles.header}>{children}</div>
);

Page.Main = ({ children }: Props) => (
  <main className={layoutStyles.main}>{children}</main>
);

Page.Bottom = ({ children }: Props) => (
  <div className={layoutStyles.bottom}>{children}</div>
);
