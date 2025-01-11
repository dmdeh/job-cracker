"use client";

import { useSearchParams } from "next/navigation";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import styles from "./question.module.css";
import layoutStyles from "@/app/styles/layout.module.css";
import useToggleSelection from "../hooks/useToggleSelection";
import { useQuestion } from "../hooks/useQuestion";
import shuffleArray from "../utils/shuffleArray";
import { useMemo, useRef } from "react";

export default function Question() {
  const searchParams = useSearchParams();
  const answer = useRef("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const contents = searchParams.get("contents");
  const { topicContents } = useToggleSelection("contents");
  const questionList =
    contents === "all" ? topicContents : contents?.split(",");

  const shuffleQuestion = useMemo(() => shuffleArray(questionList || []), []);

  const {
    isLoading,
    question,
    getTailQuestion,
    getNextQuestion,
    hasMoreQuestions,
    currentIndex,
  } = useQuestion(shuffleQuestion);

  const getQuestionMessage = () => {
    if (!hasMoreQuestions) return "질문이 끝났습니다. 수고하셨습니다.";
    return question ?? "질문을 불러오지 못했습니다.";
  };

  const handleAnswerSubmit = () => {
    const currentAnswer = answer.current.trim();
    if (!currentAnswer) return;

    getTailQuestion(currentAnswer);
    answer.current = "";
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnswerSubmit();
    }
  };

  const handleAnswerUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    answer.current = e.target.value;
  };

  return (
    <div className={layoutStyles.page}>
      <header className={layoutStyles.header}>
        <h1>개발자 기술 면접</h1>
        <p>면접관의 질문에 답변해주세요</p>
      </header>
      <main className={styles.question}>
        <QuestionCard
          topic={shuffleQuestion[currentIndex] || "면접 종료"}
          question={getQuestionMessage()}
          onNextTopic={getNextQuestion}
          isLoading={isLoading}
        />
      </main>
      <footer className={styles.footer}>
        <div className={styles.inputWrapper}>
          <textarea
            id="answer"
            placeholder="답변을 입력해주세요..."
            className={styles.input}
            ref={textareaRef}
            onChange={handleAnswerUpdate}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.button} onClick={handleAnswerSubmit}>
            ⬆︎
          </button>
        </div>
      </footer>
    </div>
  );
}
