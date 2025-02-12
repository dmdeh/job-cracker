import clsx from 'clsx';
import SpinCracker from '../../common/Loading/SpinCracker';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  topic: string;
  question: string;
  isLoading: boolean;
  onNextTopic: () => void;
  onViewFeedback: () => void;
  disabled: boolean;
}

export default function QuestionCard({
  topic,
  question,
  onNextTopic,
  isLoading,
  onViewFeedback,
  disabled,
}: QuestionCardProps) {
  const handleNextTopic = () => onNextTopic();

  return (
    <div className={styles.card}>
      {isLoading ? (
        <SpinCracker />
      ) : (
        <>
          <h2 className={styles.topic}>{topic}</h2>
          <div className={styles.question_wrapper}>
            <div className={styles.question}>Q. {question}</div>
          </div>
          <div className={styles.button_wrapper}>
            <button
              className={clsx(styles.button, styles.blue_button)}
              onClick={onViewFeedback}
              disabled={disabled}
            >
              답변 보기
            </button>
            <button
              className={clsx(styles.button, styles.pink_button)}
              onClick={handleNextTopic}
            >
              다른 주제
            </button>
          </div>
        </>
      )}
    </div>
  );
}
