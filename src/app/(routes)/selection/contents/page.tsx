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
import styles from './contents.module.css';

export default function Contents() {
  const router = useRouter();
  const {
    developer,
    topics,
    topicContents,
    selected,
    allSelected,
    notSelected,
    toggleSelectAll,
    toggleSelectItem,
  } = useToggleSelection('contents');

  const handleConfirm = () => {
    if (!selected.length) return;

    const contents = allSelected ? 'all' : selected.join(',');
    router.push(
      `/question?developer=${developer}&topics=${topics}&contents=${contents}`
    );
  };

  return (
    <Suspense fallback={<SpinCracker />}>
      <Page>
        <Page.Top>
          <div className={styles.title}>
            <h1>주제를 선택해주세요!</h1>
            <h2>
              {selected.length} / {topicContents.length}
            </h2>
          </div>
          <p>당신을 위한 맞춤형 면접이 진행됩니다.</p>
        </Page.Top>
        <Page.Main className={styles.list}>
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
    </Suspense>
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
