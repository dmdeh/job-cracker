import QuestionCard from "../components/QuestionCard/QuestionCard";
import styles from "./question.module.css";

export default function Question() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>개발자 기술 면접</h1>
        <p>면접관의 질문에 답변해주세요</p>
      </div>
      <div className={styles.grid}>
        <QuestionCard topic="React" question="상태관리에 대해 설명해주세요" />
        <QuestionCard
          topic="React"
          question="상태관리에 대해 설명해주세요"
          isAnswerView={false}
        />
      </div>
      <div className={styles.inputWrapper}>
        <textarea
          id="answer"
          placeholder="답변을 입력해주세요..."
          className={styles.input}
        />
        <button className={styles.button}>⬆︎</button>
      </div>
    </div>
  );
}