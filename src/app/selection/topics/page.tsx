"use client";

import { useRouter } from "next/navigation";
import styles from "./topics.module.css";
import Button from "@/app/components/common/Button/Button";
import clsx from "clsx";
import { SelectionCard } from "@/app/components/SelectionCard/SelectionCard";
import { theme } from "@/app/constants/theme";
import useToggleSelection from "@/app/hooks/useToggleSelection";

export default function Topics() {
  const router = useRouter();
  const {
    developer,
    allTopics,
    selected,
    allSelected,
    notSelected,
    toggleSelectAll,
    toggleSelectItem,
  } = useToggleSelection("topics");

  const handleConfirm = () => {
    if (!selected.length) return;
    router.push(
      `/selection/contents?developer=${developer}&topics=${selected.join(",")}`
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>어떤 주제로 {developer} 면접을 원하시나요?</h1>
      </div>
      <div className={styles.grid}>
        <SelectionCard
          title="전체 선택"
          isSelected={allSelected}
          onClick={() => toggleSelectAll(allTopics)}
          className={cardClass(allSelected)}
        />
        {allTopics.map((topic) => {
          const isSelected = selected.includes(topic);

          return (
            <SelectionCard
              key={topic}
              title={topic}
              isSelected={isSelected}
              onClick={() => toggleSelectItem(topic)}
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
