"use client";

import { useSearchParams } from "next/navigation";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import styles from "./question.module.css";
import useToggleSelection from "../hooks/useToggleSelection";
import { useQuestion } from "../hooks/useQuestion";
import shuffleArray from "../utils/shuffleArray";

export default function Question() {
  const searchParams = useSearchParams();

  const contents = searchParams.get("contents");
  const { topicContents } = useToggleSelection("contents");
  const questionList =
    contents === "all" ? topicContents : contents?.split(",");
  const shuffleQuestion = shuffleArray(questionList || []);

  const { isLoading, question, getNextQuestion, isFinished } =
    useQuestion(shuffleQuestion);

  const getQuestionMessage = () => {
    if (isLoading) {
      return "질문을 생성하고 있습니다...";
    } else if (isFinished) {
      return "질문이 끝났습니다. 수고하셨습니다.";
    } else {
      return question || "질문을 불러오지 못했습니다.";
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>개발자 기술 면접</h1>
        <p>면접관의 질문에 답변해주세요</p>
      </div>
      <div className={styles.grid}>
        <QuestionCard
          topic="React"
          question={getQuestionMessage()}
          onNextTopic={getNextQuestion}
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
