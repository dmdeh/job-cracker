import { useEffect, useState } from 'react';
import { fetchQuestion } from '../services/fetchQuestion';

export function useQuestion(keywords: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState({});

  const hasMoreQuestions = currentIndex < keywords.length;

  const generateQuestion = async (answer?: string) => {
    if (!hasMoreQuestions) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetchQuestion(keywords[currentIndex], answer);

      if (!response.success) {
        setError(response.error ?? 'Failed to generate question');
        return;
      }

      setQuestion(response.question);
      if (response.feedback) {
        console.log(feedback);
        setFeedback(response.feedback);
      }

      if (answer && !response.next) {
        setCurrentIndex((prev) => prev + 1);
      }
    } catch (err) {
      setError('Failed to generate question');
    } finally {
      setIsLoading(false);
    }
  };

  const getTailQuestion = (answer: string) => {
    generateQuestion(answer);
  };

  const getNextQuestion = () => {
    if (hasMoreQuestions) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, [currentIndex]);

  return {
    isLoading,
    error,
    question,
    feedback,
    getTailQuestion,
    getNextQuestion,
    hasMoreQuestions,
    currentIndex,
  };
}
