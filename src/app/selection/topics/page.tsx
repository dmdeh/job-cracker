"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import {
  TOPICS_Frontend,
  TOPICS_Backend,
  TOPICS_iOS,
} from "@/app/constants/topics";

export default function Topics() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic"); // Frontend, Backend, iOS

  let selectedTopics: Record<string, string[]> = {};

  switch (topic) {
    case "Frontend":
      selectedTopics = TOPICS_Frontend;
      break;
    case "Backend":
      selectedTopics = TOPICS_Backend;
      break;
    case "iOS":
      selectedTopics = TOPICS_iOS;
      break;
    default:
      selectedTopics = {};
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>어떤 주제로 {topic} 면접을 원하시나요?</h1>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>전체 선택</h3>
        </div>
        {Object.keys(selectedTopics).map((key) => (
          <div key={key} className={styles.card}>
            <h3>{key}</h3>
          </div>
        ))}
      </div>
      <div className={styles.button}>확인</div>
    </div>
  );
}
