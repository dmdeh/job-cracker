'use client';

import Layout from '@/components/Layout';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import QuestionFeedbackSwitcher from '../../../components/QuestionFeedbackSwitcher/QuestionFeedbackSwitcher';
import { useQuestion } from '../../../hooks/useQuestion';
import useToggleSelection from '../../../hooks/useToggleSelection';
import shuffleArray from '../../../utils/shuffleArray';
import styles from './question.module.css';

export default function Question() {
  const searchParams = useSearchParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const contents = searchParams.get('contents');
  const { topicContents } = useToggleSelection('contents');
  const questionList =
    contents === 'all' ? topicContents : contents?.split(',');

  const shuffleQuestion = shuffleArray(questionList || []);

  const {
    isLoading,
    error,
    question,
    feedback,
    getTailQuestion,
    getNextQuestion,
    hasMoreQuestions,
    currentIndex,
  } = useQuestion(shuffleQuestion);

  if (error) {
    throw new Error(error);
  }

  const getQuestionMessage = () => {
    if (!hasMoreQuestions) return '질문이 끝났습니다. 수고하셨습니다.';
    return question ?? '질문을 불러오지 못했습니다.';
  };

  const handleAnswerSubmit = () => {
    if (!textareaRef.current) {
      return;
    }

    const answer = textareaRef.current.value;

    getTailQuestion(answer);
    textareaRef.current.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleAnswerSubmit();
    }
  };

  const header = (
    <>
      <h1>개발자 기술 면접</h1>
      <p>면접관의 질문에 답변해주세요</p>
    </>
  );

  const footer = (
    <div className={styles.answer}>
      <textarea
        id="answer"
        placeholder="답변을 입력해주세요..."
        className={styles.input}
        ref={textareaRef}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className={styles.button}
        onClick={handleAnswerSubmit}
      >
        ⬆︎
      </button>
    </div>
  );

  return (
    <Layout header={header} footer={footer}>
      <QuestionFeedbackSwitcher
        topic={shuffleQuestion[currentIndex] || '면접 종료'}
        question={getQuestionMessage()}
        onNextTopic={getNextQuestion}
        feedback={feedback}
        isLoading={isLoading}
      />
    </Layout>
  );
}