import { useState, useEffect } from "react";
import { fetchRandomQuestion } from "../services/question";

export function useQuestion(keywords: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const generateQuestion = async (index: number) => {
    if (index >= keywords.length) {
      setIsFinished(true);
      return;
    }

    setIsLoading(true);
    setError("");

    const response = await fetchRandomQuestion(keywords[index]);

    if (!response.success) {
      setError(response.error || "Failed to generate question");
    } else {
      setQuestion(response.question || "");
    }

    setIsLoading(false);
  };

  const getNextQuestion = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= keywords.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex(nextIndex);
      generateQuestion(nextIndex);
    }
  };

  useEffect(() => {
    if (!isFinished) {
      generateQuestion(currentIndex);
    }
  }, [currentIndex, isFinished]);

  return { isLoading, error, question, getNextQuestion, isFinished };
}
