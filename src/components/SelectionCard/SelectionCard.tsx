import clsx from 'clsx';
import styles from './SelectionCard.module.css';

interface Props {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  className: string;
}

export function SelectionCard(props: Props) {
  const { title, onClick, className } = props;
  return (
    <div className={clsx(styles.card, className)} onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
}
