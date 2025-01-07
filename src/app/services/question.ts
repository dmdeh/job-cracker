interface QuestionResponse {
  success: boolean;
  question?: string;
  error?: string;
}

export async function fetchRandomQuestion(
  keyword: string
): Promise<QuestionResponse> {
  try {
    const response = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: keyword,
      }),
    });

    return await response.json();
  } catch (error: any) {
    console.error("Question fetch error:", error);
    return {
      success: false,
      error: error.message || "Failed to load question",
    };
  }
}
