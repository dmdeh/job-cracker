"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./topics.module.css";
import { TOPIC_MAP, TopicKey } from "@/app/constants/topics";
import Button from "@/app/components/common/Button/Button";
import clsx from "clsx";

export default function Topics() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const topic = getTopic(searchParams.get("topic"));
  const selectedTopics = topic ? TOPIC_MAP[topic] : {};
  const allTopics = Object.keys(selectedTopics);
  const isAllSelected = selected.length === allTopics.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
      return;
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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>어떤 주제로 {topic} 면접을 원하시나요?</h1>
      </div>
      <div className={styles.grid}>
        <div className={cardClass(isAllSelected)} onClick={toggleSelectAll}>
          <h3>전체 선택</h3>
        </div>
        {allTopics.map((topic) => (
          <div
            key={topic}
            className={cardClass(selected.includes(topic))}
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
        className={buttonClass(selected.length === 0)}
        onClick={handleConfirm}
        disabled={selected.length === 0}
      >
        확인
      </Button>
    </div>
  );
}

function isTopic(value: string | null): value is TopicKey {
  return value !== null && Object.keys(TOPIC_MAP).includes(value);
}

function getTopic(value: string | null): TopicKey | null {
  if (isTopic(value)) {
    return value;
  }
  return null;
}

function cardClass(selected: boolean) {
  return clsx(styles.card, {
    [styles.selected]: selected,
  });
}

function buttonClass(disabled: boolean) {
  return clsx(styles.button, {
    [styles.buttonDisabled]: disabled,
  });
}
