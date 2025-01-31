'use client';

import { SelectionCard } from '@/components/SelectionCard/SelectionCard';
import Button from '@/components/common/Button/Button';
import SpinCracker from '@/components/common/Loading/SpinCracker';
import { Page } from '@/components/common/Page/Page';
import { theme } from '@/constants/theme';
import useToggleSelection from '@/hooks/useToggleSelection';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import styles from './topics.module.css';

export default function Topics() {
  return (
    <Suspense fallback={<SpinCracker />}>
      <TopicsInner />
    </Suspense>
  );
}

function TopicsInner() {
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
    <Page>
      <Page.Top>
        <h1>어떤 주제를 원하시나요?</h1>
        <p>원하는 {developer} 분야를 선택할 수 있어요.</p>
      </Page.Top>
      <Page.Main>
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
      </Page.Main>
      <Page.Bottom>
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
      </Page.Bottom>
    </Page>
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
