import styles from "./QuestionCard.module.css";

interface QuestionCardProps {
  topic: string;
  question: string;
  isAnswerView?: boolean;
}

export default function QuestionCard({
  topic,
  question,
  isAnswerView = true,
}: QuestionCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.topic}>{topic}</h2>
      <div className={styles.questionWrapper}>
        <div className={styles.question}>Q. {question}</div>
      </div>
      <button
        className={`${styles.button} ${
          isAnswerView ? styles.blueButton : styles.orangeButton
        }`}
      >
        {isAnswerView ? "답변 보기" : "다른 주제"}
      </button>
    </div>
  );
}
