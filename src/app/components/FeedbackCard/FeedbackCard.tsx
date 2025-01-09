import SpinCracker from "../common/Loading/SpinCracker";
import styles from "./FeedbackCard.module.css";

export interface Feedback {
  score: string;
  reason: string;
  bestAnswer: string;
}

interface FeedbackCardProps {
  feedback: Feedback;
  isLoading: boolean;
}

export default function FeedbackCard({
  feedback,
  isLoading,
}: FeedbackCardProps) {
  const { score, reason, bestAnswer } = feedback;

  return (
    <div className={styles.card}>
      {isLoading ? (
        <SpinCracker />
      ) : (
        <>
          <h2 className={styles.score}>{score}점</h2>
          <div className={styles.reasonWrapper}>
            <div className={styles.text}>{reason}</div>
          </div>
          <div className={styles.bestAnswerWrapper}>
            <div className={styles.text}>{bestAnswer}</div>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.blueButton}>질문 보기</button>
          </div>
        </>
      )}
    </div>
  );
}
