'use client';

import Layout from '@/components/Layout';
import { SelectionCard } from '@/components/SelectionCard/SelectionCard';
import Button from '@/components/common/Button/Button';
import { theme } from '@/constants/theme';
import useToggleSelection from '@/hooks/useToggleSelection';
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

  const header = <h1>어떤 주제로 {developer} 면접을 원하시나요?</h1>;

  const footer = (
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
  );

  return (
    <Layout header={header} footer={footer} className={styles.list}>
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
    </Layout>
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