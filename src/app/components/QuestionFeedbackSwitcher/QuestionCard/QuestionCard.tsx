import clsx from "clsx";
import SpinCracker from "../../common/Loading/SpinCracker";
import styles from "./QuestionCard.module.css";

interface QuestionCardProps {
  topic: string;
  question: string;
  isLoading: boolean;
  onNextTopic: () => void;
  onViewFeedback: () => void;
  viewFeedbackDisabled: boolean;
}

export default function QuestionCard({
  topic,
  question,
  onNextTopic,
  isLoading,
  onViewFeedback,
  viewFeedbackDisabled,
}: QuestionCardProps) {
  const handleNextTopic = () => onNextTopic();

  return (
    <div className={styles.card}>
      {isLoading ? (
        <SpinCracker />
      ) : (
        <>
          <h2 className={styles.topic}>{topic}</h2>
          <div className={styles.questionWrapper}>
            <div className={styles.question}>Q. {question}</div>
          </div>
          <div className={styles.buttonWrapper}>
            <button
              className={clsx(styles.button, styles.blueButton)}
              onClick={onViewFeedback}
              disabled={viewFeedbackDisabled}
            >
              답변 보기
            </button>
            <button
              className={clsx(styles.button, styles.orangeButton)}
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
