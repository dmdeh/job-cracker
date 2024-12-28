"use client";

import { useRouter } from "next/navigation";
import styles from "./contents.module.css";
import { TOPIC_MAP, TopicKey } from "@/app/constants/topics";
import { SelectionCard } from "@/app/components/SelectionCard/SelectionCard";
import clsx from "clsx";
import Button from "@/app/components/common/Button/Button";
import { theme } from "@/app/constants/theme";
import useToggleSelection from "@/app/hooks/useToggleSelection";

export default function Contents() {
  const router = useRouter();
  const {
    topicContents,
    selected,
    allSelected,
    notSelected,
    toggleSelectAll,
    toggleSelectTopic,
  } = useToggleSelection("contents");

  const handleConfirm = () => {
    if (!selected.length) return;
    router.push("/question");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>주제를 선택해주세요! {selected.length} / {topicContents.length}</h1>
        <p>당신을 위한 맞춤형 면접이 진행됩니다.</p>
      </div>
      <div className={styles.grid}>
        <SelectionCard
          title="전체 선택"
          isSelected={allSelected}
          onClick={() => toggleSelectAll(topicContents)}
          className={cardClass(allSelected)}
        />
        {topicContents.map((item) => {
          const isSelected = selected.includes(item);

          return (
            <SelectionCard
              key={item}
              title={item}
              isSelected={isSelected}
              onClick={() => toggleSelectTopic(item)}
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

export function getTopicContents(
  topics: (typeof TOPIC_MAP)[TopicKey],
  selectedContents: string[]
) {
  return Object.entries(topics)
    .filter(([key]) => selectedContents.includes(key))
    .reduce<string[]>((acc, [_, value]) => {
      return [...acc, ...value];
    }, []);
}
