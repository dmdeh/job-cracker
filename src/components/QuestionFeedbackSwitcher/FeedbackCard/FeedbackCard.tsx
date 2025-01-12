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
          <div className={wrapperClass('best_answer')}>{bestAnswer}</div>
          <div className={styles.button_wrapper}>
            <button className={styles.blue_button} onClick={onViewQuestion}>
              질문 보기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function wrapperClass(type: 'content' | 'best_answer') {
  return clsx(styles.box, {
    [styles.content]: type === 'content',
    [styles['best_answer']]: type === 'best_answer',
  });
}
