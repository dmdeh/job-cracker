"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./contents.module.css";
import { getTopic } from "@/app/utils/checkTopic";
import { TOPIC_MAP } from "@/app/constants/topics";
import { useState } from "react";
import { SelectionCard } from "@/app/components/SelectionCard/SelectionCard";
import clsx from "clsx";
import Button from "@/app/components/common/Button/Button";

export default function Contents() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const topic = getTopic(searchParams.get("topic"));
  const selectedTopics: { [key: string]: string[] } = topic
    ? TOPIC_MAP[topic]
    : {};

  const contents = searchParams.get("selected")?.split(",") || [];
  const topicContents = contents.map((key) => selectedTopics[key]).flat();

  const isAllSelected = selected.length === topicContents.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
      return;
    } else {
      setSelected(topicContents);
    }
  };

  const toggleSelectTopic = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleConfirm = () => {
    if (!selected.length) return;
    router.push("/question");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>주제를 선택해주세요.</h1>
        <p>주제를 선택하시면 맞춤형 면접을 진행할 수 있습니다.</p>
      </div>
      <div className={styles.grid}>
        <SelectionCard
          title="전체 선택"
          isSelected={isAllSelected}
          onClick={toggleSelectAll}
          className={cardClass(isAllSelected)}
        />
        {topicContents.map((item) => (
          <SelectionCard
            key={item}
            title={item}
            isSelected={selected.includes(item)}
            onClick={() => toggleSelectTopic(item)}
            className={cardClass(selected.includes(item))}
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
