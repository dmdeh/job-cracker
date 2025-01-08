import { useState, useEffect } from "react";
import { fetchQuestion } from "../services/fetchQuestion";

export function useQuestion(keywords: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMoreQuestions = currentIndex < keywords.length;

  const generateQuestion = async (answer?: string) => {
    setIsLoading(true);
    setError("");

    const response = await fetchQuestion(keywords[currentIndex], answer);

    if (!response.success) {
      setError(response.error || "Failed to generate question");
    } else {
      setQuestion(response.question || "");
    }

    setIsLoading(false);
  };

  const getTailQuestion = (answer?: string) => {
    if (!hasMoreQuestions) return;
    generateQuestion(answer);
  };

  const getNextQuestion = () => {
    if (hasMoreQuestions) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (hasMoreQuestions) {
      generateQuestion();
    }
  }, [currentIndex]);

  return {
    isLoading,
    error,
    question,
    getTailQuestion,
    getNextQuestion,
    hasMoreQuestions,
    currentIndex,
  };
}
