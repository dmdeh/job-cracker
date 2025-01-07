interface QuestionResponse {
  success: boolean;
  question?: string;
  error?: string;
}

export async function fetchQuestion(
  keyword: string,
  answer?: string
): Promise<QuestionResponse> {
  try {
    const response = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: keyword,
        answer: answer || "",
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
