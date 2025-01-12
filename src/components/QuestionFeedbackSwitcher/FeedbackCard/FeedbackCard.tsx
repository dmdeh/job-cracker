import { Feedback } from '@/types/type';
import clsx from 'clsx';
import SpinCracker from '../../common/Loading/SpinCracker';
import styles from './FeedbackCard.module.css';

interface FeedbackCardProps {
  feedback: Feedback;
  isLoading: boolean;
  onViewQuestion: () => void;
}

export default function FeedbackCard({
  feedback,
  isLoading,
  onViewQuestion,
}: FeedbackCardProps) {
  const { score, content, bestAnswer } = feedback;

  return (
    <div className={styles.card}>
      {isLoading ? (
        <SpinCracker />
      ) : (
        <>
          <h2 className={styles.score}>{score ?? 0}점</h2>
          <div className={wrapperClass('content')}>{content}</div>
          <div className={wrapperClass('best-answer')}>{bestAnswer}</div>
          <div className={styles.buttonWrapper}>
            <button className={styles.blueButton} onClick={onViewQuestion}>
              질문 보기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function wrapperClass(type: 'content' | 'best-answer') {
  return clsx(styles.box, {
    [styles.content]: type === 'content',
    [styles['best-answer']]: type === 'best-answer',
  });
}
