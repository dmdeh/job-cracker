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

  const handleViewFeedback = () => setIsFeedbackVisible(true);
  const handleViewQuestion = () => setIsFeedbackVisible(false);

  useEffect(() => {
    if (score || reason || bestAnswer) {
      setIsFeedbackVisible(true);
    }
  }, [feedback]);

  const viewFeedbackDisabled = !score || !reason || !bestAnswer;

  return (
    <div>
      {isFeedbackVisible ? (
        <FeedbackCard
          feedback={feedback}
          onViewQuestion={handleViewQuestion}
          isLoading={isLoading}
        />
      ) : (
        <QuestionCard
          topic={topic}
          question={question}
          onViewFeedback={handleViewFeedback}
          onNextTopic={onNextTopic}
          isLoading={isLoading}
          viewFeedbackDisabled={viewFeedbackDisabled} // 비활성화
        />
      )}
    </div>
  );
}
