"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./contents.module.css";
import { getTopic } from "@/app/utils/checkTopic";
import { TOPIC_MAP, ContentsKey } from "@/app/constants/topics";
import { useState } from "react";
import { SelectionCard } from "@/app/components/SelectionCard/SelectionCard";
import clsx from "clsx";
import Button from "@/app/components/common/Button/Button";
import {
  toggleSelectAll,
  toggleSelectTopic,
} from "@/app/utils/toggleSelection";

export default function Contents() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const topic = getTopic(searchParams.get("topic"));
  const selectedTopics = TOPIC_MAP[topic];

  const isContents = (value: string): value is ContentsKey =>
    value in selectedTopics;

  const contents = searchParams.get("selected")?.split(",") || [];
  const topicContents = contents
    .filter(isContents)
    .map((key) => selectedTopics[key])
    .flat();

  const isAllSelected = selected.length === topicContents.length;

  const handleConfirm = () => {
    if (!selected.length) return;
    router.push("/question");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>
          주제를 선택해주세요! {selected.length} / {topicContents.length}
        </h1>
        <p>당신을 위한 맞춤형 면접이 진행됩니다.</p>
      </div>
      <div className={styles.grid}>
        <SelectionCard
          title="전체 선택"
          isSelected={isAllSelected}
          onClick={() =>
            toggleSelectAll(isAllSelected, setSelected, topicContents)
          }
          className={cardClass(isAllSelected)}
        />
        {topicContents.map((item) => {
          const isSelected = selected.includes(item);

          return (
            <SelectionCard
              key={item}
              title={item}
              isSelected={isSelected}
              onClick={() => toggleSelectTopic(item, selected, setSelected)}
              className={cardClass(isSelected)}
            />
          );
        })}
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
