import { useEffect, useState } from "react";
import FeedbackCard, { Feedback } from "./FeedbackCard/FeedbackCard";
import QuestionCard from "./QuestionCard/QuestionCard";

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
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const { score, reason, bestAnswer } = feedback;
  const isFeedbackAvailable = score || reason || bestAnswer;

  useEffect(() => {
    if (isFeedbackAvailable) {
      setIsFeedbackVisible(true);
    }
  }, [isFeedbackAvailable]);

  return (
    <div>
      {isFeedbackVisible ? (
        <FeedbackCard
          feedback={feedback}
          onViewQuestion={() => setIsFeedbackVisible(false)}
          isLoading={isLoading}
        />
      ) : (
        <QuestionCard
          topic={topic}
          question={question}
          onViewFeedback={() => setIsFeedbackVisible(true)}
          onNextTopic={onNextTopic}
          isLoading={isLoading}
          viewFeedbackDisabled={!isFeedbackAvailable} // 비활성화
        />
      )}
    </div>
  );
}
