import { DeveloperCard } from '@/components/DeveloperCard/DeveloperCard';
import { Page } from '@/components/common/Page/Page';
import developers from '@/constants/developer';

export default function Developer() {
  return (
    <Page>
      <Page.Top>
        <h1>당신은 어떤 개발자인가요?</h1>
        <p>관심 있는 개발 분야를 선택해주세요.</p>
      </Page.Top>
      <Page.Main>
        {Object.entries(developers).map(
          ([key, { type, description, topics }]) => (
            <DeveloperCard
              key={key}
              developer={{ type, description, topics: Object.keys(topics) }}
            />
          )
        )}
      </Page.Main>
    </Page>
  );
}
