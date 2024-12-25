"use client";

import developers from "@/app/constants/developer";
import styles from "./developer.module.css";
import { DeveloperCard } from "@/app/components/DeveloperCard/DeveloperCard";
import { useRouter } from "next/navigation";

export default function Developer() {
  const router = useRouter();

  const handleCardClick = (title: string) => {
    router.push(`/selection/topics?topic=${title}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>당신은 어떤 개발자인가요?</h1>
        <p>관심 있는 개발 분야를 선택해주세요</p>
      </div>
      <div className={styles.grid}>
        {developers.map((dev) => (
          <div key={dev.title} onClick={() => handleCardClick(dev.title)}>
            <DeveloperCard {...dev} />
          </div>
        ))}
      </div>
    </div>
  );
}
