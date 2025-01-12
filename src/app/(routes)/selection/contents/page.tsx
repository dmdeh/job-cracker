'use client';

import { SelectionCard } from '@/components/SelectionCard/SelectionCard';
import Button from '@/components/common/Button/Button';
import { theme } from '@/constants/theme';
import useToggleSelection from '@/hooks/useToggleSelection';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import styles from './contents.module.css';

interface HeaderProps {
  selected: string[];
  contents: string[];
}

interface FooterProps {
  notSelected: boolean;
  onConfirm: () => void;
}

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
  } = useToggleSelection('contents');

  const handleConfirm = () => {
    if (!selected.length) return;

    const contents = allSelected ? 'all' : selected.join(',');
    router.push(`/question?topics=${topics}&contents=${contents}`);
  };

  return (
    <>
      <Contents.Header selected={selected} contents={topicContents} />
      <div className={styles.list}>
        <SelectionCard
          title="전체 선택"
          isSelected={allSelected}
          onClick={() => toggleSelectAll(topicContents)}
          className={cardClass(allSelected)}
        />
        {topicContents.map((item) => (
          <SelectionCard
            key={item}
            title={item}
            isSelected={selected.includes(item)}
            onClick={() => toggleSelectItem(item)}
            className={cardClass(selected.includes(item))}
          />
        ))}
      </div>
      <Contents.Footer notSelected={notSelected} onConfirm={handleConfirm} />
    </>
  );
}

Contents.Header = ({ selected, contents }: HeaderProps) => (
  <>
    <h1>
      주제를 선택해주세요! {selected.length} / {contents.length}
    </h1>
    <p>당신을 위한 맞춤형 면접이 진행됩니다.</p>
  </>
);
Contents.Footer = ({ notSelected, onConfirm }: FooterProps) => (
  <Button
    backgroundColor={theme.colors.backgroundLight}
    width={100}
    height={50}
    className={buttonClass(notSelected)}
    onClick={onConfirm}
    disabled={notSelected}
  >
    확인
  </Button>
);

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
