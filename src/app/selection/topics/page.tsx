"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./topics.module.css";
import { TOPIC_MAP, TopicKey } from "@/app/constants/topics";
import Button from "@/app/common/Button/Button";

export default function Topics() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topic = searchParams.get("topic") as TopicKey;
  const [selected, setSelected] = useState<string[]>([]);

  const selectedTopics = topic ? TOPIC_MAP[topic] : {};
  const allTopics = Object.keys(selectedTopics);
  const isAllSelected = selected.length === allTopics.length;

  const toggleSelectAll = () => setSelected(isAllSelected ? [] : allTopics);

  const toggleSelectTopic = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((selectedItem) => selectedItem !== item)
        : [...prev, item]
    );
  };

  const handleConfirm = () => {
    if (!selected.length) return;
    router.push(`/selection/topics/contents?selected=${selected.join(",")}`);
  };
  const buttonClasses = `${styles.button} ${
    selected.length === 0 ? styles.buttonDisabled : ""
  }`;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>어떤 주제로 {topic} 면접을 원하시나요?</h1>
      </div>
      <div className={styles.grid}>
        <div
          className={`${styles.card} ${isAllSelected && styles.selected}`}
          onClick={toggleSelectAll}
        >
          <h3>전체 선택</h3>
        </div>
        {allTopics.map((key) => (
          <div
            key={key}
            className={`${styles.card} ${
              selected.includes(key) && styles.selected
            }`}
            onClick={() => toggleSelectTopic(key)}
          >
            <h3>{key}</h3>
          </div>
        ))}
      </div>
      <Button
        backgroundColor="var(--color-background-light)"
        width={100}
        height={50}
        className={buttonClasses}
        onClick={handleConfirm}
        disabled={selected.length === 0}
      >
        확인
      </Button>
    </div>
  );
}
