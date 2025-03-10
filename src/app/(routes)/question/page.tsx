'use client';

import SpinCracker from '@/components/common/Loading/SpinCracker';
import { Page } from '@/components/common/Page/Page';
import { useSearchParams } from 'next/navigation';
import { Suspense, useRef, useState } from 'react';
import QuestionFeedbackSwitcher from '../../../components/QuestionFeedbackSwitcher/QuestionFeedbackSwitcher';
import { useQuestion } from '../../../hooks/useQuestion';
import useToggleSelection from '../../../hooks/useToggleSelection';
import shuffleArray from '../../../utils/shuffleArray';
import styles from './question.module.css';

export default function Question() {
  return (
    <Suspense fallback={<SpinCracker />}>
      <QuestionInner />
    </Suspense>
  );
}

function QuestionInner() {
  const searchParams = useSearchParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [visible, setVisible] = useState(false);

  const contents = searchParams.get('contents');
  const { topicContents } = useToggleSelection('contents');
  const questionList =
    contents === 'all' ? topicContents : contents?.split(',');

  const shuffledQuestions = useRef(shuffleArray(questionList || []));

  const {
    isLoading,
    error,
    question,
    feedback,
    getTailQuestion,
    getNextQuestion,
    hasMoreQuestions,
    currentIndex,
  } = useQuestion(shuffledQuestions.current);

  const topic = shuffledQuestions.current[currentIndex];

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
    if (answer.trim() === '') {
      return;
    }

    getTailQuestion(answer);
    textareaRef.current.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleAnswerSubmit();
    }
  };

  return (
    <Page>
      <Page.Top>
        <h1>개발자 기술 면접</h1>
        <p>면접관의 질문에 답변해주세요</p>
      </Page.Top>
      <Page.Main className={styles.question}>
        <QuestionFeedbackSwitcher
          topic={topic || '면접 종료'}
          question={getQuestionMessage()}
          onNextTopic={getNextQuestion}
          feedback={feedback}
          isLoading={isLoading}
          visible={visible}
          setVisible={setVisible}
        />
      </Page.Main>
      <Page.Bottom className={styles.section}>
        {!visible && (
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
        )}
      </Page.Bottom>
    </Page>
  );
}
