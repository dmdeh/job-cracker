'use client';

import { SelectionCard } from '@/components/SelectionCard/SelectionCard';
import Button from '@/components/common/Button/Button';
import { theme } from '@/constants/theme';
import useToggleSelection from '@/hooks/useToggleSelection';
import layoutStyles from '@/styles/layout.module.css';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import styles from './topics.module.css';

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
  } = useToggleSelection('topics');

  const handleConfirm = () => {
    if (!selected.length) return;
    router.push(
      `/selection/contents?developer=${developer}&topics=${selected.join(',')}`
    );
  };

  return (
    <div className={layoutStyles.page}>
      <header className={layoutStyles.header}>
        <h1>어떤 주제로 {developer} 면접을 원하시나요?</h1>
      </header>
      <main className={clsx(layoutStyles.list, styles.list)}>
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
