"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./topics.module.css";
import { TOPIC_MAP, TopicKey } from "@/app/constants/topics";
import Button from "@/app/common/Button/Button";

export default function Topics() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  function isTopic(value: string | null): value is TopicKey {
    return value !== null && Object.keys(TOPIC_MAP).includes(value);
  }

  function getTopic(value: string | null): TopicKey | null {
    if (isTopic(value)) {
      return value;
    }
    return null;
  }

  const topic = getTopic(searchParams.get("topic"));
  const selectedTopics = topic ? TOPIC_MAP[topic] : {};
  const allTopics = Object.keys(selectedTopics);
  const isAllSelected = selected.length === allTopics.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    }
    setSelected(allTopics);
  };

  const toggleSelectTopic = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((selectedItem) => selectedItem !== item));
      return;
    }
    setSelected([...selected, item]);
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
        {allTopics.map((topic) => (
          <div
            key={topic}
            className={`${styles.card} ${
              selected.includes(topic) && styles.selected
            }`}
            onClick={() => toggleSelectTopic(topic)}
          >
            <h3>{topic}</h3>
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
