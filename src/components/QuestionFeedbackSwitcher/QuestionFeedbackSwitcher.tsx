import { Feedback } from '@/types/type';
import { useEffect, useState } from 'react';
import FeedbackCard from './FeedbackCard/FeedbackCard';
import QuestionCard from './QuestionCard/QuestionCard';

interface QuestionFeedbackSwitcherProps {
  topic: string;
  question: string;
  feedback: Feedback;
  isLoading: boolean;
  onNextTopic: () => void;
}

export default function QuestionFeedbackSwitcher({
  topic,
  question,
  feedback,
  isLoading,
  onNextTopic,
}: QuestionFeedbackSwitcherProps) {
  const isEmptyFeedback = Object.values(feedback).every((f) => f == null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isEmptyFeedback) {
      setVisible(true);
    }
  }, [isEmptyFeedback]);

  return (
    <div>
      {visible ? (
        <FeedbackCard
          feedback={feedback}
          onViewQuestion={() => setVisible(false)}
          isLoading={isLoading}
        />
      ) : (
        <QuestionCard
          topic={topic}
          question={question}
          onViewFeedback={() => setVisible(true)}
          onNextTopic={onNextTopic}
          isLoading={isLoading}
          disabled={isEmptyFeedback} // 비활성화
        />
      )}
    </div>
  );
}
