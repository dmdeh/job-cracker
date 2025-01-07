import { useState, useEffect } from "react";
import { fetchRandomQuestion } from "../services/question";

export function useQuestion(keywords: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");

  const generateQuestion = async () => {
    setIsLoading(true);
    setError("");

    const response = await fetchRandomQuestion(keywords);

    if (!response.success) {
      setError(response.error || "Failed to generate question");
    } else {
      setQuestion(response.question || "");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return { isLoading, error, question, generateQuestion };
}
