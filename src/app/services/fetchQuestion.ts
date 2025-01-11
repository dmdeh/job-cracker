import { Feedback } from '../components/QuestionFeedbackSwitcher/FeedbackCard/FeedbackCard';

interface SuccessResponse {
  success: true;
  question: string;
  hasTailQuestion: boolean;
  feedback: Feedback;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type QuestionResponse = SuccessResponse | ErrorResponse;

export async function fetchQuestion(
  keyword: string,
  answer: string = ''
): Promise<QuestionResponse> {
  try {
    const response = await fetch('/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword, answer }),
    });

    const json = await response.json();

    if (!isValidResponse(json)) {
      throw new Error('Failed to load question');
    }

    return json;
  } catch (error) {
    console.error('Question fetch error:', error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: 'Failed to load question',
      };
    }
  }
}

function isValidResponse(responseInJSON: any) {
  if (responseInJSON == null || typeof responseInJSON !== 'object') {
    return false;
  }
  if (
    responseInJSON.success === true &&
    typeof responseInJSON.question === 'string'
  ) {
    return true;
  }
  if (
    responseInJSON.success === false &&
    typeof responseInJSON.error === 'string'
  ) {
    return true;
  }
  return false;
}
