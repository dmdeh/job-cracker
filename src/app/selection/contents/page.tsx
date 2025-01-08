"use client";

import { useRouter } from "next/navigation";
import styles from "./contents.module.css";
import layoutStyles from "@/app/styles/layout.module.css";
import { SelectionCard } from "@/app/components/SelectionCard/SelectionCard";
import clsx from "clsx";
import Button from "@/app/components/common/Button/Button";
import { theme } from "@/app/constants/theme";
import useToggleSelection from "@/app/hooks/useToggleSelection";

export default function Contents() {
  const router = useRouter();
  const {
    topics,
    topicContents,
    selected,
    allSelected,
    notSelected,
    toggleSelectAll,
    toggleSelectItem,
  } = useToggleSelection("contents");

  const handleConfirm = () => {
    if (!selected.length) return;

    const contents = allSelected ? "all" : selected.join(",");
    router.push(`/question?topics=${topics}&contents=${contents}`);
  };

  return (
    <div className={layoutStyles.page}>
      <header className={layoutStyles.header}>
        <h1>
          주제를 선택해주세요! {selected.length} / {topicContents.length}
        </h1>
        <p>당신을 위한 맞춤형 면접이 진행됩니다.</p>
      </header>
      <main className={clsx(layoutStyles.list, styles.list)}>
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
              onClick={() => toggleSelectItem(item)}
              className={cardClass(isSelected)}
            />
          );
        })}
      </main>
      <footer className={layoutStyles.footer}>
        <Button
          backgroundColor={theme.colors.backgroundLight}
          width={100}
          height={50}
          className={buttonClass(notSelected)}
          onClick={handleConfirm}
          disabled={notSelected}
        >
          확인
        </Button>
      </footer>
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
