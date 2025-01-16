import { SYSTEM_PROMPTS } from '@/constants/prompts';
import { openai } from '@/services/openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { keyword, answer } = await request.json();

    if (typeof keyword !== 'string' || typeof answer !== 'string') {
      throw new Error('invalid input type');
    }

    const userPrompt = getUserPrompt(keyword, answer);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
    });

    const response = JSON.parse(completion.choices[0]?.message.content ?? '{}');

    return NextResponse.json({
      success: true,
      question: response.question,
      feedback: response.feedback,
      next: response.next,
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }
}

function getUserPrompt(keyword: string, answer: string) {
  if (!answer) {
    return `면접을 시작합니다. ${keyword}에 관련된 기술 면접 질문을 하나 생성해주세요. `;
  }

  return `
  답변: ${answer}
  답변에 대한 꼬리 질문을 하나 생성해주세요. 
  답변이 이상하다면 ${keyword} 주제에 대한 다른 질문을 해주세요.

  - 답변을 평가하여 100점 만점으로 점수를 매겨주세요.
  - 매긴 점수의 이유를 설명해주세요.
  - 질문에 대한 100점 답변을 제공해주세요.

  응답은 반드시 다음 JSON 형식으로 해주세요:
  {
    "question": string,
    "next": boolean,
    "feedback": {
      "score": string,
      "content": string,
      "bestAnswer": string
    }
  }`;
}
