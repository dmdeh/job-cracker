"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./contents.module.css";
import { getTopic } from "@/app/utils/checkTopic";
import { TOPIC_MAP, TopicKey } from "@/app/constants/topics";
import { useState } from "react";
import { SelectionCard } from "@/app/components/SelectionCard/SelectionCard";
import clsx from "clsx";
import Button from "@/app/components/common/Button/Button";
import {
  toggleSelectAll,
  toggleSelectTopic,
} from "@/app/utils/toggleSelection";
import { theme } from "@/app/constants/theme";

export default function Contents() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const topic = getTopic(searchParams.get("topic")) ?? "Frontend";
  const selectedTopics = TOPIC_MAP[topic];

  const contents = searchParams.get("selected")?.split(",") || [];
  const topicContents = getTopicContents(selectedTopics, contents);

  const allSelected = selected.length === topicContents.length;
  const notSelected = selected.length === 0;

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
          isSelected={allSelected}
          onClick={() =>
            toggleSelectAll(allSelected, setSelected, topicContents)
          }
          className={cardClass(allSelected)}
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
        backgroundColor={theme.colors.background}
        width={100}
        height={50}
        className={buttonClass(notSelected)}
        onClick={handleConfirm}
        disabled={notSelected}
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

function getTopicContents(topics: (typeof TOPIC_MAP)[TopicKey], selectedContents: string[]) {
  return Object.entries(topics)
    .filter(([key]) => selectedContents.includes(key))
    .reduce<string[]>((acc, [_, value]) => {
      return [...acc, ...value];
    }, []);
}