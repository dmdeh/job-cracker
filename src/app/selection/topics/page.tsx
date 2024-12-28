"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./topics.module.css";
import { TOPIC_MAP } from "@/app/constants/topics";
import Button from "@/app/components/common/Button/Button";
import clsx from "clsx";
import { SelectionCard } from "@/app/components/SelectionCard/SelectionCard";
import { getTopic } from "@/app/utils/checkTopic";
import {
  toggleSelectAll,
  toggleSelectTopic,
} from "@/app/utils/toggleSelection";
import { theme } from "@/app/constants/theme";

export default function Topics() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const topic = getTopic(searchParams.get("topic"));
  const selectedTopics = topic ? TOPIC_MAP[topic] : {};
  const allTopics = Object.keys(selectedTopics);
  const isAllSelected = selected.length === allTopics.length;

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
          onClick={() => toggleSelectAll(isAllSelected, setSelected, allTopics)}
          className={cardClass(isAllSelected)}
        />
        {allTopics.map((topic) => (
          <SelectionCard
            key={topic}
            title={topic}
            isSelected={selected.includes(topic)}
            onClick={() => toggleSelectTopic(topic, selected, setSelected)}
            className={cardClass(selected.includes(topic))}
          />
        ))}
      </div>
      <Button
        backgroundColor={theme.colors.background}
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
