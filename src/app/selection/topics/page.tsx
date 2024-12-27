"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./topics.module.css";
import { TOPIC_MAP } from "@/app/constants/topics";
import Button from "@/app/components/common/Button/Button";
import clsx from "clsx";
import { SelectionCard } from "@/app/components/SelectionCard/SelectionCard";
import { getTopic } from "@/app/utils/checkTopic";

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
    router.push(
      `/selection/topics/contents?topic=${topic}&selected=${selected.join(",")}`
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>어떤 주제로 {topic} 면접을 원하시나요?</h1>
      </div>
      <div className={styles.grid}>
        <SelectionCard
          title="전체 선택"
          isSelected={isAllSelected}
          onClick={toggleSelectAll}
          className={cardClass(isAllSelected)}
        />
        {allTopics.map((topic) => (
          <SelectionCard
            key={topic}
            title={topic}
            isSelected={selected.includes(topic)}
            onClick={() => toggleSelectTopic(topic)}
            className={cardClass(selected.includes(topic))}
          />
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
