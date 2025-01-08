import developers from "@/app/constants/developer";
import layoutStyles from "@/app/styles/layout.module.css";
import { DeveloperCard } from "@/app/components/DeveloperCard/DeveloperCard";

export default function Developer() {
  return (
    <div className={layoutStyles.page}>
      <header className={layoutStyles.header}>
        <h1>당신은 어떤 개발자인가요?</h1>
        <p>관심 있는 개발 분야를 선택해주세요</p>
      </header>
      <main className={layoutStyles.list}>
        {developers.map((dev) => (
          <DeveloperCard key={dev.title} {...dev} />
        ))}
      </main>
    </div>
  );
}
