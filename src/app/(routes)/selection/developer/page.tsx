import { DeveloperCard } from '@/components/DeveloperCard/DeveloperCard';
import developers from '@/constants/developer';
import layoutStyles from '@/styles/layout.module.css';

export default function Developer() {
  return (
    <div className={layoutStyles.page}>
      <header className={layoutStyles.header}>
        <h1>당신은 어떤 개발자인가요?</h1>
        <p>관심 있는 개발 분야를 선택해주세요</p>
      </header>
      <main className={layoutStyles.list}>
        {Object.entries(developers).map(
          ([key, { type, description, topics }]) => (
            <DeveloperCard
              key={key}
              developer={{ type, description, topics: Object.keys(topics) }}
            />
          )
        )}
      </main>
    </div>
  );
}
