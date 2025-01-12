import { DeveloperCard } from '@/components/DeveloperCard/DeveloperCard';
import Layout from '@/components/Layout';
import developers from '@/constants/developer';

export default function Developer() {
  const header = (
    <>
      <h1>당신은 어떤 개발자인가요?</h1>
      <p>관심 있는 개발 분야를 선택해주세요</p>
    </>
  );

  return (
    <Layout header={header}>
      {Object.entries(developers).map(([key, developer]) => (
        <DeveloperCard key={key} developer={developer} />
      ))}
    </Layout>
  );
}
